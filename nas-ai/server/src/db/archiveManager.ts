import Database from 'better-sqlite3';
import path from 'path';

export interface Synapse {
  id: number;
  timestamp: string;
  model_id: string;
  project_name: string;
  intent: string;
  context_snippet: string;
  is_snapshot: number;
}

export interface StrategicRule {
  id: number;
  project_name: string;
  decision_name: string;
  rationale: string;
  status: string;
  timestamp: string;
}

class ArchiveManager {
  private db: Database.Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.initialize();
  }

  private initialize() {
    // Ensure the tables exist if the file is new (fallback)
    this.db.exec(`
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

  fetchLatestSynapses(limit: number = 10): Synapse[] {
    return this.db.prepare('SELECT * FROM synapses ORDER BY timestamp DESC LIMIT ?').all(limit) as Synapse[];
  }

  fetchLatestRules(limit: number = 5): StrategicRule[] {
    return this.db.prepare('SELECT * FROM strategic_rules ORDER BY timestamp DESC LIMIT ?').all(limit) as StrategicRule[];
  }

  storeSynapse(model_id: string, project_name: string, intent: string, context: string): number {
    const info = this.db.prepare(`
      INSERT INTO synapses (model_id, project_name, intent, context_snippet)
      VALUES (?, ?, ?, ?)
    `).run(model_id, project_name, intent, context);
    return info.lastInsertRowid as number;
  }

  storeRule(project_name: string, decision_name: string, rationale: string): number {
    const info = this.db.prepare(`
      INSERT INTO strategic_rules (project_name, decision_name, rationale)
      VALUES (?, ?, ?)
    `).run(project_name, decision_name, rationale);
    return info.lastInsertRowid as number;
  }

  searchSynapses(query: string): Synapse[] {
    return this.db.prepare(`
      SELECT * FROM synapses 
      WHERE intent LIKE ? OR context_snippet LIKE ? 
      ORDER BY timestamp DESC LIMIT 5
    `).all(`%${query}%`, `%${query}%`) as Synapse[];
  }
}

// Point to the database in the root project directory
const dbPath = path.resolve(__dirname, '../../../nastenka_brain.db');
export const archiveManager = new ArchiveManager(dbPath);
