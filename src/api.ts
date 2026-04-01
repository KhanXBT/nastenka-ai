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

// Export the app for Vercel's serverless handler
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
    console.log("🌑 Nastenka: Waking up neural memory...");
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
        subject: '🌑 NEURAL RECEPTION: New Seeker',
        html: `<p>New identity proxy: <strong>${email}</strong></p>`,
      });
      console.log(`🌑 NEURAL RECEPTION: Recorded ${email}`);
    } catch (error) {
      console.error('❌ Email failed:', error);
    }
  }
  res.json({ message: "Resonance Captured: Seek the White Nights." });
});

// --- Sovereign Routes ---
app.use('/api', authenticate);
app.use('/sse', authenticate);
app.use('/messages', authenticate);

// -----------------------------------------------------------------------------
// 🧠 MCP Server Factory (Isolated per Connection)
// -----------------------------------------------------------------------------
function createNastenkaServer() {
  const server = new McpServer({
    name: "Nastenka-AI",
    version: "1.0.0",
  });

  server.tool(
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
          text: `Nastenka has witnessed the flow for '${projectName}'.\nFilecoin Proof: ${filecoinCid}` 
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
    "resurrect_brain",
    "Retrieve project grounding.",
    {
      projectName: z.string().describe("Project to resurrect"),
    },
    async ({ projectName }) => {
      const data = getProjectGrounding(projectName) as { rules: StrategicRule[], latestSynapses: any[] };
      const latestSynapse = data.latestSynapses[0];
      
      if (!latestSynapse && data.rules.length === 0) {
        return { content: [{ type: "text", text: `Nastenka has no memory of '${projectName}'.` }] };
      }

      const rulesStr = data.rules.map((r: StrategicRule) => `- ${r.decision_name}: ${r.rationale}`).join("\n");
      const synapseStr = latestSynapse ? `\nLATEST INTENT: ${latestSynapse.intent || latestSynapse.content}` : "";

      return {
        content: [{ type: "text", text: `NASTENKA RESURRECTION PAYLOAD for '${projectName}':\n\nSTRATEGIC RULES:\n${rulesStr}\n${synapseStr}` }],
      };
    }
  );

  return server;
}

// -----------------------------------------------------------------------------
// 🌐 Session-Aware SSE Transport Logic
// -----------------------------------------------------------------------------
const sessions = new Map<string, SSEServerTransport>();

app.get("/sse", async (req, res) => {
  console.log("Nastenka: Establishing New Real-time Session...");
  
  const server = createNastenkaServer();
  const transport = new SSEServerTransport("/messages", res);
  
  // Connect and store by session ID to prevent collisions
  await server.connect(transport);
  
  const sessionId = transport.sessionId;
  sessions.set(sessionId, transport);
  
  console.log(`🌑 NEURAL CONNECTIVITY: New session started: ${sessionId}`);

  res.on('close', () => {
    console.log(`🌑 NEURAL CONNECTIVITY: Session closing: ${sessionId}`);
    sessions.delete(sessionId);
    // Note: We could call server.close() if needed, but cleanup is usually handled by transport close
  });
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = sessions.get(sessionId);

  if (!transport) {
    console.error(`❌ NEURAL ERROR: Session not found: ${sessionId}`);
    return res.status(404).json({ error: "Session expired or not found." });
  }

  await transport.handlePostMessage(req, res);
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
