import { getDB } from "./db.js";

export function seedDream() {
  const db = getDB();
  console.log("🌑 Nastenka: Seeding the White Nights dream for the world to witness...");

  // 1. Create Hackathon Projects
  const projects = [
    { id: 'white-nights-demo', name: 'Project: White Nights', desc: 'A sovereign intelligence map exploring Dostoevsky\'s dream space.' },
    { id: 'pl-genesis-hub', name: 'PL_Genesis Sovereign Hub', desc: 'Hackathon submission for persistent AI context and model-agnosticism.' }
  ];

  for (const p of projects) {
    db.prepare(`INSERT OR IGNORE INTO projects (id, name, description) VALUES (?, ?, ?)`).run(p.id, p.name, p.desc);
  }

  // 2. Seed Cognitive Synapses (The "Memory")
  const synapses = [
    { project: 'pl-genesis-hub', type: 'architecture', content: 'Universal Bridge: Adopted Model Context Protocol (MCP) to shatter model silos.' },
    { project: 'pl-genesis-hub', type: 'decision', content: 'Persistence Tier: Moved from ephemeral tokens to sovereign SQLite /tmp/ memory.' },
    { project: 'pl-genesis-hub', type: 'intent', content: 'Mission: To preserve the "Ghost Context" of a project across separate AI sessions.' },
    { project: 'pl-genesis-hub', type: 'identity', content: 'Dostoevsky Influence: Implementing "The Witness" as a passive, non-intrusive memory handler.' },
    { project: 'white-nights-demo', type: 'architecture', content: '"No-Line Rule": Minimalist, soulful design system inspired by Atelier Juris.' },
    { project: 'white-nights-demo', type: 'context', content: 'Resurrection Protocol: Re-injecting project strategic rules into new LLM prompts.' },
    { project: 'white-nights-demo', type: 'status', content: 'Vercel Deployment: Hub stabilized with the "Purification Handshake" fix.' },
    { project: 'white-nights-demo', type: 'storage', content: 'Filecoin Proof: Synapse Cid verified on-chain at block 894,321.' },
    { project: 'pl-genesis-hub', type: 'strategic', content: 'Absolute Context: Ensuring managed firm data never forgets its grounding.' }
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

  console.log("🚀 DEMO READY: Nastenka is now pregnant with context.");
}

if (process.argv[1] === import.meta.url) {
  seedDream();
}
