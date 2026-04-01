import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'nastenka_brain.db');
const db = new Database(dbPath);

export function seedDream() {
  console.log("🌑 Nastenka: Seeding the White Nights dream for the world to witness...");

  // 1. Create a Demo Project
  db.prepare(`
    INSERT OR IGNORE INTO projects (id, name, description)
    VALUES (?, ?, ?)
  `).run(
    'white-nights-demo', 
    'Project: White Nights', 
    'A sovereign intelligence map exploring Dostoevsky\'s dream space and the Resurrection of Context.'
  );

  // 2. Seed Cognitive Synapses (Decisions/Architectures)
  const synapses = [
    {
      project: 'white-nights-demo',
      type: 'architecture',
      content: 'The "Ghost Context" Principle: Every AI platform is a silo. Nastenka acts as the bridge.'
    },
    {
      project: 'white-nights-demo',
      type: 'decision',
      content: 'Adopted Model Context Protocol (MCP) as the universal neural bridge for model-agnosticism.'
    },
    {
      project: 'white-nights-demo',
      type: 'intent',
      content: 'Mission: To ensure a user\'s cognitive architecture never resets when they hit a token limit.'
    },
    {
      project: 'white-nights-demo',
      type: 'identity',
      content: 'Behavioral Fingerprint: Soulful, analytical, and persistent. Inspired by Nastenka\'s witnessing role.'
    }
  ];

  const insertSynapse = db.prepare(`
    INSERT INTO synapses (project, type, content)
    VALUES (?, ?, ?)
  `);

  // Only seed if empty to avoid bloat
  const count = db.prepare('SELECT COUNT(*) as count FROM synapses WHERE project = ?').get('white-nights-demo') as any;
  
  if (count.count === 0) {
    for (const s of synapses) {
      insertSynapse.run(s.project, s.type, s.content);
    }
    console.log("✨ Seed successful. The dream is live.");
  } else {
    console.log("📡 Resonance already present. Skipping seed.");
  }
}

// Auto-run if executed directly
if (process.argv[1] === import.meta.url) {
  seedDream();
}
