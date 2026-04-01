import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "nastenka_brain.db");
const db = new Database(dbPath);

export function setupDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS synapses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project TEXT,
      type TEXT, -- 'intent', 'architecture', 'decision', 'identity'
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(project) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS strategic_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project TEXT,
      decision TEXT,
      rationale TEXT,
      status TEXT DEFAULT 'LOCKED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(project) REFERENCES projects(id)
    );
  `);
}

export function saveSynapse(project: string, type: string, content: string) {
  const stmt = db.prepare(
    "INSERT INTO synapses (project, type, content) VALUES (?, ?, ?)"
  );
  return stmt.run(project, type, content);
}

export function saveStrategicDecision(project: string, decision: string, rationale: string) {
  const stmt = db.prepare(
    "INSERT INTO strategic_rules (project, decision, rationale) VALUES (?, ?, ?)"
  );
  return stmt.run(project, decision, rationale);
}

export function getProjectGrounding(project: string) {
  const rules = db.prepare("SELECT * FROM strategic_rules WHERE project = ?").all(project);
  const latestSynapses = db.prepare("SELECT * FROM synapses WHERE project = ? ORDER BY created_at DESC").all(project);
  
  return { rules, latestSynapses };
}

export default db;
