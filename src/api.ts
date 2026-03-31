import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { setupDB, saveSynapse, saveStrategicDecision, getProjectGrounding } from './db.js';
import { uploadToFilecoin } from "./storage/filecoin.js";

interface Synapse {
  intent: string;
  context_snippet: string;
}

interface StrategicRule {
  decision_name: string;
  rationale: string;
}

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- Sovereign Authentication Middleware ---
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const sovereignKey = process.env.NASTENKA_API_KEY;
  const providedKey = req.headers['x-nastenka-key'];

  if (!sovereignKey) {
    // If no key is set in .env, we DENY access to ensure sovereignty
    console.error('❌ SECURITY ALERT: No NASTENKA_API_KEY set in .env. Access denied by default.');
    return res.status(500).json({ error: 'Sovereign Hub Error: Security key not configured on server.' });
  }

  if (providedKey !== sovereignKey) {
    return res.status(401).json({ error: 'Unauthorized: Sovereign Key required.' });
  }
  next();
};

// Apply authentication to all non-public routes
app.use('/api', authenticate);
app.use('/sse', authenticate);
app.use('/messages', authenticate);

// Initialize the Database
setupDB();

// -----------------------------------------------------------------------------
// 🧠 MCP Server Initialization (The Neural Port)
// -----------------------------------------------------------------------------
const mcpServer = new McpServer({
  name: "Nastenka-AI",
  version: "1.0.0",
});

// TOOL: Witness Flow
mcpServer.tool(
  "witness_flow",
  "Record current intent & context.",
  {
    projectName: z.string().describe("Project name"),
    modelId: z.string().describe("LLM ID"),
    intent: z.string().describe("Current goal/intent"),
    context: z.string().describe("Critical context snippet"),
    syncToFilecoin: z.boolean().optional().describe("Sync to Filecoin?"),
  },
  async ({ projectName, modelId, intent, context, syncToFilecoin }) => {
    saveSynapse(projectName, modelId, intent, context);
    
    let filecoinCid = "LOCAL_ONLY";
    if (syncToFilecoin) {
      try {
        const cid = await uploadToFilecoin({ projectName, modelId, intent, context });
        filecoinCid = cid.toString();
      } catch (e) {
        console.error("Filecoin Upload Synapse Error:", e);
      }
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
mcpServer.tool(
  "mark_strategic_decision",
  "Lock a permanent project rule.",
  {
    projectName: z.string().describe("Project name"),
    decisionName: z.string().describe("Decision name (e.g. 'DB')"),
    rationale: z.string().describe("Rationale"),
  },
  async ({ projectName, decisionName, rationale }) => {
    saveStrategicDecision(projectName, decisionName, rationale);
    return {
      content: [{ type: "text", text: `Strategic decision '${decisionName}' has been locked by Nastenka for '${projectName}'.` }],
    };
  }
);

// TOOL: Resurrect Brain
mcpServer.tool(
  "resurrect_brain",
  "Retrieve project grounding.",
  {
    projectName: z.string().describe("Project to resurrect"),
  },
  async ({ projectName }) => {
    const data = getProjectGrounding(projectName) as { rules: StrategicRule[], latestSynapse: Synapse | undefined };
    
    if (!data.latestSynapse && data.rules.length === 0) {
      return {
        content: [{ type: "text", text: `Nastenka has no memory of a project named '${projectName}'.` }],
      };
    }

    const rulesStr = data.rules.map((r: StrategicRule) => `- ${r.decision_name}: ${r.rationale}`).join("\n");
    const synapseStr = data.latestSynapse 
      ? `\nLATEST INTENT: ${data.latestSynapse.intent}\nLATEST CONTEXT: ${data.latestSynapse.context_snippet}`
      : "";

    return {
      content: [{ type: "text", text: `NASTENKA RESURRECTION PAYLOAD for '${projectName}':\n\nSTRATEGIC RULES:\n${rulesStr}\n${synapseStr}` }],
    };
  }
);

// -----------------------------------------------------------------------------
// 🌐 SSE Transport Logic
// -----------------------------------------------------------------------------
let transport: SSEServerTransport;

app.get("/sse", async (req, res) => {
  console.log("Nastenka: Establishing Real-time SSE Handshake...");
  transport = new SSEServerTransport("/messages", res);
  await mcpServer.connect(transport);
});

app.post("/messages", async (req, res) => {
  console.log("Nastenka: Processing Neural Message...");
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).json({ error: "No active SSE transport found." });
  }
});

// -----------------------------------------------------------------------------
// 🏛️ Legacy REST API for Dashboard
// -----------------------------------------------------------------------------
app.get('/api/synapses/:project', (req, res) => {
  const projectName = req.params.project;
  const data = getProjectGrounding(projectName);
  res.json(data);
});

app.post('/api/synapses', (req, res) => {
  const { projectName, modelId, intent, context } = req.body;
  if (!projectName || !modelId || !intent || !context) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const result = saveSynapse(projectName, modelId, intent, context);
  res.json({ success: true, id: result.lastInsertRowid });
});

// 🚀 Start the Server
app.listen(port, () => {
  console.error(`Nastenka AI Unified Intelligence Hub running at: http://localhost:${port}`);
  console.error(`- REST API: /api/synapses/:project`);
  console.error(`- MCP SSE Root: /sse`);
});
