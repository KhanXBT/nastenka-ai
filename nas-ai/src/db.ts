import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "nastenka_brain.db");
const db = new Database(dbPath);

export function setupDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS synapses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      model_id TEXT,
      project_name TEXT,
      intent TEXT,
      context_snippet TEXT,
      is_snapshot INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS strategic_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_name TEXT,
      decision_name TEXT,
      rationale TEXT,
      status TEXT DEFAULT 'LOCKED',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function saveSynapse(projectName: string, modelId: string, intent: string, context: string) {
  const stmt = db.prepare(
    "INSERT INTO synapses (project_name, model_id, intent, context_snippet) VALUES (?, ?, ?, ?)"
  );
  return stmt.run(projectName, modelId, intent, context);
}

export function saveStrategicDecision(projectName: string, decision: string, rationale: string) {
  const stmt = db.prepare(
    "INSERT INTO strategic_rules (project_name, decision_name, rationale) VALUES (?, ?, ?)"
  );
  return stmt.run(projectName, decision, rationale);
}

export function getProjectGrounding(projectName: string) {
  const rules = db.prepare("SELECT * FROM strategic_rules WHERE project_name = ?").all(projectName);
  const latestSynapse = db.prepare("SELECT * FROM synapses WHERE project_name = ? ORDER BY timestamp DESC LIMIT 1").get(projectName);
  
  return { rules, latestSynapse };
}

export default db;
