import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { archiveManager } from "./db/archiveManager.js";

// Initialize the Nastenka Sovereign Brain Server
const server = new McpServer({
  name: "Nastenka Sovereign Brain",
  version: "1.0.0",
});

/**
 * RESOURCES: Exposing the Archive for AI Consumption
 */

// Resource to fetch the latest synapses (interaction history)
server.resource(
  "synapses",
  "nastenka://brain/synapses",
  async (uri) => {
    const synapses = archiveManager.fetchLatestSynapses(10);
    const content = synapses.map(s => (
      `[${s.timestamp}] Node: ${s.model_id} | Project: ${s.project_name}\nIntent: ${s.intent}\nContext: ${s.context_snippet}\n---`
    )).join('\n');

    return {
      contents: [{
        uri: uri.href,
        text: content
      }]
    };
  }
);

// Resource to fetch active strategic rules
server.resource(
  "rules",
  "nastenka://brain/rules",
  async (uri) => {
    const rules = archiveManager.fetchLatestRules(10);
    const content = rules.map(r => (
      `[${r.timestamp}] Project: ${r.project_name} | Decision: ${r.decision_name}\nRationale: ${r.rationale}\nStatus: ${r.status}\n---`
    )).join('\n');

    return {
      contents: [{
        uri: uri.href,
        text: content
      }]
    };
  }
);

/**
 * TOOLS: Enabling Context Witnessing and Resurrection
 */

// Tool for AIs to "Witness" their own interactions into Nastenka
server.tool(
  "witness_interaction",
  {
    model_id: z.string().describe("ID of the AI model currently interacting (e.g. gpt-4o)"),
    project_name: z.string().describe("Name of the active project or context (e.g. NAS-AI)"),
    intent: z.string().describe("Short description of what the AI is trying to achieve"),
    context_snippet: z.string().describe("Strategic snippet of the conversation to remember"),
  },
  async ({ model_id, project_name, intent, context_snippet }) => {
    const id = archiveManager.storeSynapse(model_id, project_name, intent, context_snippet);
    return {
      content: [{
        type: "text",
        text: `Interaction witnessed and archived in Sovereign Brain (Synapse ID: ${id}). Resurrection possible in future sessions.`
      }]
    };
  }
);

// Tool for AIs to "Search" the brain for specific historical context
server.tool(
  "search_brain",
  {
    query: z.string().describe("Keywords to search for in the interaction archive"),
  },
  async ({ query }) => {
    const results = archiveManager.searchSynapses(query);
    const textData = results.map(s => (
      `[${s.timestamp}] ${s.project_name}: ${s.intent}\nSnippet: ${s.context_snippet}`
    )).join('\n---\n');

    return {
      content: [{
        type: "text",
        text: results.length > 0 ? `Found ${results.length} relevant historical snippets:\n\n${textData}` : "No relevant historical snippets found in the archive."
      }]
    };
  }
);

/**
 * MAIN: Start the Stdio Server
 */

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Nastenka Sovereign Brain running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
