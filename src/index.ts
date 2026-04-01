import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { setupDB, saveSynapse, saveStrategicDecision, getProjectGrounding } from "./db.js";
import { uploadToFilecoin } from "./storage/filecoin.js";

interface Synapse {
  intent: string;
  context_snippet: string;
}

interface StrategicRule {
  decision_name: string;
  rationale: string;
}

// Initialize the Database
setupDB();

const server = new McpServer({
  name: "Nastenka-AI",
  version: "1.0.0",
});

// TOOL: Witness Flow
// Used to capture the "Active Synapse"
server.tool(
  "witness_flow",
  "Capture the current architectural intent and cognitive state of the user.",
  {
    projectName: z.string().describe("The name of the project being worked on"),
    modelId: z.string().describe("The name/ID of the LLM currently witnessing"),
    intent: z.string().describe("The immediate goal or intent of the current session"),
    context: z.string().describe("A snippet of the most critical context to carry forward"),
    syncToFilecoin: z.boolean().optional().describe("Whether to anchor this synapse on Filecoin"),
  },
  async ({ projectName, modelId, intent, context, syncToFilecoin }) => {
    saveSynapse(projectName, 'intent', intent);
    saveSynapse(projectName, 'context', context);
    saveSynapse(projectName, 'identity', `Model: ${modelId}`);
    
    let filecoinCid = "LOCAL_ONLY";
    if (syncToFilecoin) {
      const cid = await uploadToFilecoin({ projectName, modelId, intent, context });
      filecoinCid = cid.toString();
    }

    return {
      content: [{ 
        type: "text", 
        text: `Nastenka has witnessed the flow for '${projectName}'.\nSynapse recorded.\nFilecoin Proof: ${filecoinCid}` 
      }],
    };
  }
);

// TOOL: Mark Strategic Decision
// Used to lock in "Hard Rules" (e.g. "No Redux")
server.tool(
  "mark_strategic_decision",
  "Lock in a permanent architectural decision or project rule.",
  {
    projectName: z.string().describe("The project name"),
    decisionName: z.string().describe("The name of the strategic decision (e.g. 'Database Selection')"),
    rationale: z.string().describe("The reason why this decision was made"),
  },
  async ({ projectName, decisionName, rationale }) => {
    saveStrategicDecision(projectName, decisionName, rationale);
    return {
      content: [{ type: "text", text: `Strategic decision '${decisionName}' has been locked by Nastenka for '${projectName}'.` }],
    };
  }
);

// TOOL: Resurrect Brain
// Used by the NEW model to wake up the context
server.tool(
  "resurrect_brain",
  "Retrieve the full cognitive grounding and latest synapses for a project.",
  {
    projectName: z.string().describe("The project name to resurrect"),
  },
  async ({ projectName }) => {
    const data = getProjectGrounding(projectName) as { rules: StrategicRule[], latestSynapses: any[] };
    const latestSynapse = data.latestSynapses[0];
    
    if (!latestSynapse && data.rules.length === 0) {
      return {
        content: [{ type: "text", text: `Nastenka has no memory of a project named '${projectName}'.` }],
      };
    }

    const rulesStr = data.rules.map((r: StrategicRule) => `- ${r.decision_name}: ${r.rationale}`).join("\n");
    const synapseStr = latestSynapse 
      ? `\nLATEST INTENT: ${latestSynapse.intent || latestSynapse.content}`
      : "";

    return {
      content: [{ type: "text", text: `NASTENKA RESURRECTION PAYLOAD for '${projectName}':\n\nSTRATEGIC RULES:\n${rulesStr}\n${synapseStr}` }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Nastenka AI MCP Server running on Stdio.");
}

main().catch(console.error);
