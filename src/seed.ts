import { getDB } from "./db.js";

export function seedDream() {
  const db = getDB();
  console.log("🚀 Agentic Alpha: Initializing Command Synapses...");

  // 1. Create Hackathon Projects
  const projects = [
    { id: 'alpha-demo', name: 'Project: Agentic Alpha', desc: 'A high-velocity intelligence map for the modern builder.' },
    { id: 'pl-genesis-hub', name: 'PL_Genesis Command Hub', desc: 'Hackathon submission for terminal velocity AI orchestration.' }
  ];

  for (const p of projects) {
    db.prepare(`INSERT OR IGNORE INTO projects (id, name, description) VALUES (?, ?, ?)`).run(p.id, p.name, p.desc);
  }

  // 2. Seed Cognitive Synapses (The "Memory")
  const synapses = [
    { project: 'pl-genesis-hub', type: 'architecture', content: 'Universal Bridge: Adopted Model Context Protocol (MCP) to shatter model silos.' },
    { project: 'pl-genesis-hub', type: 'decision', content: 'Persistence Tier: Moved from ephemeral tokens to sovereign SQLite /tmp/ memory.' },
    { project: 'pl-genesis-hub', type: 'intent', content: 'Mission: To maintain terminal velocity across separate AI sessions.' },
    { project: 'pl-genesis-hub', type: 'identity', content: 'Founder Mode: Implementing "The Command" as a high-performance orchestration layer.' },
    { project: 'alpha-demo', type: 'architecture', content: '"Signal-First Rule": Minimalist, high-performance design system.' },
    { project: 'alpha-demo', type: 'context', content: 'Agentic Sync Protocol: Re-injecting project strategic rules into new LLM prompts.' },
    { project: 'alpha-demo', type: 'status', content: 'Vercel Deployment: Hub stabilized with the "Sovereign Handshake" fix.' },
    { project: 'alpha-demo', type: 'storage', content: 'Filecoin Proof: Synapse Cid verified on-chain at block 894,321.' },
    { project: 'pl-genesis-hub', type: 'strategic', content: 'Absolute Context: Ensuring managed firm data never loses its grounding.' }
  ];

  const insertSynapse = db.prepare(`INSERT INTO synapses (project, type, content) VALUES (?, ?, ?)`);
  
  // Seed synapses if empty
  const sCount = db.prepare('SELECT COUNT(*) as count FROM synapses').get() as any;
  if (sCount.count < 10) {
    for (const s of synapses) {
      insertSynapse.run(s.project, s.type, s.content);
    }
    console.log("✨ Synapses seeded.");
  }

  // 3. Seed Strategic Decisions (The "Rules")
  const decisions = [
    { project: 'pl-genesis-hub', name: 'Sovereign-Only', rationale: 'All cognitive data must remain in the user\'s local sandbox.' },
    { project: 'pl-genesis-hub', name: 'MCP-Primary', rationale: 'Standardized handshake for all external model connections.' },
    { project: 'white-nights-demo', name: 'Atelier-Design', rationale: 'High-fidelity,Editorial, and Soulful. No generic Tailwind patterns.' }
  ];

  db.prepare(`
    CREATE TABLE IF NOT EXISTS strategic_decisions (
      projectName TEXT,
      decision_name TEXT,
      rationale TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  const insertDecision = db.prepare(`INSERT INTO strategic_decisions (projectName, decision_name, rationale) VALUES (?, ?, ?)`);
  
  const dCount = db.prepare('SELECT COUNT(*) as count FROM strategic_decisions').get() as any;
  if (dCount.count === 0) {
    for (const d of decisions) {
      insertDecision.run(d.project, d.name, d.rationale);
    }
    console.log("🔒 Strategic decisions locked.");
  }

  console.log("🚀 DEMO READY: Agentic Alpha is now primed for command.");
}

if (process.argv[1] === import.meta.url) {
  seedDream();
}
