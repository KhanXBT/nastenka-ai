import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Resend } from 'resend';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { seedDream } from './seed.js';
import { 
  setupDB, 
  saveSynapse, 
  saveStrategicDecision, 
  getProjectGrounding,
  saveWaitlistEmail,
  getWaitlist
} from "./db.js";
import { uploadToFilecoin } from "./storage/filecoin.js";
import * as fs from 'fs';

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

// --- Lazy Resend Initialization ---
let resendInstance: Resend | null = null;
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("⚠️  NOTIFICATION WARNING: No RESEND_API_KEY found. Email resonance skipped.");
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(key);
  }
  return resendInstance;
}

export default app;

app.use(cors());
app.use(express.json());

// --- Sovereign Authentication Middleware ---
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const sovereignKey = process.env.NASTENKA_API_KEY;
  const providedHeaderKey = req.headers['x-nastenka-key'];
  const providedQueryKey = req.query.key as string;

  if (!sovereignKey) {
    console.error('❌ SECURITY ALERT: No NASTENKA_API_KEY set. Access denied.');
    return res.status(500).json({ error: 'Sovereign Hub Error: Security key missing.' });
  }

  if (providedHeaderKey !== sovereignKey && providedQueryKey !== sovereignKey) {
    return res.status(401).json({ error: 'Unauthorized: Sovereign Key required.' });
  }
  next();
};

// --- Memory Initialization ---
let isMemoryInitialized = false;
const initializeMemory = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isMemoryInitialized) {
    console.log("🚀 Nastenka AI: Initializing Command Memory...");
    try {
      setupDB();
      seedDream();
      isMemoryInitialized = true;
    } catch (error) {
      console.error("❌ MEMORY ERROR:", error);
    }
  }
  next();
};

app.use(initializeMemory);

// --- Public Routes ---
app.post("/api/waitlist", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email missing." });
  saveWaitlistEmail(email);
  
  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send({
        from: 'Nastenka AI <onboarding@resend.dev>',
        to: 'nastenka.ai.contact@gmail.com',
        subject: '🚀 AGENTIC SIGNAL: New Alpha Candidate',
        html: `<p>New identity proxy: <strong>${email}</strong></p>`,
      });
      console.log(`🚀 AGENTIC SIGNAL: Recorded ${email}`);
    } catch (error) {
      console.error('❌ Email failed:', error);
    }
  }
  res.json({ message: "Signal Captured: Mission Initialized." });
});

// --- Sovereign Routes ---
app.use('/api', authenticate);
app.use('/sse', authenticate);
// /messages auth is handled inline below (key comes from URL embedded by SSE transport)

// -----------------------------------------------------------------------------
// 🧠 MCP Server Factory (Isolated per Connection)
// -----------------------------------------------------------------------------
function createAlphaServer() {
  const server = new McpServer({
    name: "Nastenka-AI",
    version: "1.0.0",
  });

  server.tool(
    "command_flow",
    "Record current intent & context.",
    {
      projectName: z.string().describe("Project name"),
      modelId: z.string().describe("LLM ID"),
      intent: z.string().describe("Current goal/intent"),
      context: z.string().describe("Critical context snippet"),
      syncToFilecoin: z.boolean().optional().describe("Sync to Filecoin?"),
    },
    async ({ projectName, modelId, intent, context, syncToFilecoin }) => {
      saveSynapse(projectName, 'intent', intent);
      saveSynapse(projectName, 'context', context);
      saveSynapse(projectName, 'identity', `Model: ${modelId}`);
      
      let filecoinCid = "LOCAL_ONLY";
      if (syncToFilecoin) {
        try {
          const cid = await uploadToFilecoin({ projectName, modelId, intent, context });
          filecoinCid = cid.toString();
        } catch (e) {
          console.error("Filecoin Synapse Error:", e);
        }
      }

      return {
        content: [{ 
          type: "text", 
          text: `Nastenka AI has synchronized the flow for '${projectName}'.\nFilecoin Proof: ${filecoinCid}` 
        }],
      };
    }
  );

  server.tool(
    "mark_strategic_decision",
    "Lock a permanent project rule.",
    {
      projectName: z.string().describe("Project name"),
      decisionName: z.string().describe("Decision name"),
      rationale: z.string().describe("Rationale"),
    },
    async ({ projectName, decisionName, rationale }) => {
      saveStrategicDecision(projectName, decisionName, rationale);
      return {
        content: [{ type: "text", text: `Strategic decision '${decisionName}' has been locked.` }],
      };
    }
  );

  server.tool(
    "ground_brain",
    "Retrieve project grounding.",
    {
      projectName: z.string().describe("Project to resurrect"),
    },
    async ({ projectName }) => {
      const data = getProjectGrounding(projectName) as { rules: StrategicRule[], latestSynapses: any[] };
      const latestSynapse = data.latestSynapses[0];
      
      if (!latestSynapse && data.rules.length === 0) {
        return { content: [{ type: "text", text: `Nastenka AI has no signal of '${projectName}'.` }] };
      }

      const rulesStr = data.rules.map((r: StrategicRule) => `- ${r.decision_name}: ${r.rationale}`).join("\n");
      const synapseStr = latestSynapse ? `\nLATEST INTENT: ${latestSynapse.intent || latestSynapse.content}` : "";

      return {
        content: [{ type: "text", text: `NASTENKA AI SYNC PAYLOAD for '${projectName}':\n\nSTRATEGIC RULES:\n${rulesStr}\n${synapseStr}` }],
      };
    }
  );

  return server;
}

// -----------------------------------------------------------------------------
// 🌐 Stateless-Safe SSE Transport Logic
// -----------------------------------------------------------------------------
// Vercel serverless is stateless. GET /sse and POST /messages may hit different
// invocations or containers. Strategy:
//   1. Fresh McpServer per SSE connection → eliminates "Already connected" 500
//   2. Sovereign key embedded in message port URL → fixes POST /messages 401
//   3. Session metadata persisted to /tmp/ → aids recovery on warm starts
//   4. Graceful 503 when session missing → client knows to reconnect

const sessions = new Map<string, SSEServerTransport>();
const SESSIONS_FILE = '/tmp/nastenka_sessions.json';

function persistSessionIds() {
  try {
    const ids = Array.from(sessions.keys());
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ ids, ts: Date.now() }));
  } catch {}
}

app.get("/sse", async (req, res) => {
  console.log("🚀 Nastenka AI: Establishing Command Handshake...");
  
  const sovereignKey = process.env.NASTENKA_API_KEY;
  
  // Fresh McpServer per connection — eliminates "Already connected to transport" 500
  const server = createAlphaServer();
  
  // Sovereign key embedded in message port URL so POST /messages auth succeeds
  const messageEndpoint = `/messages?key=${sovereignKey}`;
  const transport = new SSEServerTransport(messageEndpoint, res);
  const sessionId = transport.sessionId;
  
  sessions.set(sessionId, transport);
  persistSessionIds();
  
  console.log(`🚀 FOUNDER CONNECTIVITY: Session ${sessionId} established`);
  
  try {
    await server.connect(transport);
  } catch (err) {
    console.error("🚀 SSE Connection Error:", err);
    sessions.delete(sessionId);
    if (!res.writableEnded) res.status(500).end();
    return;
  }

  res.on('close', () => {
    console.log(`🚀 AGENTIC DISCONNECT: Session ${sessionId} closed`);
    sessions.delete(sessionId);
    persistSessionIds();
  });
});

app.post("/messages", async (req, res) => {
  // Inline auth: key comes from the message port URL set during SSE handshake
  const sovereignKey = process.env.NASTENKA_API_KEY;
  const providedKey = req.query.key as string;
  
  if (sovereignKey && providedKey !== sovereignKey) {
    return res.status(401).json({ error: 'Unauthorized: Sovereign Key required.' });
  }
  
  const sessionId = req.query.sessionId as string;
  const transport = sessionId ? sessions.get(sessionId) : null;

  if (transport) {
    try {
      await transport.handlePostMessage(req, res);
    } catch (err) {
      console.error("🌑 Message handling error:", err);
      if (!res.writableEnded) res.status(500).json({ error: 'Message processing failed' });
    }
    return;
  }

  // Session missing — expected on Vercel when POST routes to a different invocation.
  // Client should re-establish SSE connection first.
  console.warn(`🌑 NEURAL GAP: Session ${sessionId || 'unknown'} not found in this invocation`);
  res.status(503).json({ 
    error: "Session not active in this invocation. Re-connect via GET /sse first." 
  });
});

// -----------------------------------------------------------------------------
// 🏛️ Dashboard Support
// -----------------------------------------------------------------------------
app.get('/api/synapses/:project', (req, res) => {
  res.json(getProjectGrounding(req.params.project));
});

app.get("/api/admin/waitlist", (req, res) => {
  res.json({ seekers: getWaitlist() });
});

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.error(`Nastenka AI Hub active: http://localhost:${port}`);
  });
}
