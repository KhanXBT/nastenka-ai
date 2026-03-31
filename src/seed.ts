import { setupDB, saveSynapse, saveStrategicDecision } from './db.js';

async function seed() {
  console.log('Seeding Nastenka AI "Witness" Brain...');
  setupDB();

  const projectName = 'Nas AI';
  
  // Save Synapses
  saveSynapse(
    projectName, 
    'Antigravity-G3', 
    'Scaffolding the Neural Interconnect', 
    'Successfully implemented the MCP server, SQLite database, and Filecoin Synapse SDK integration for context sovereignty.'
  );

  // Save Strategic Decisions
  saveStrategicDecision(
    projectName, 
    'Sovereign Storage', 
    'Decided on a dual-layer approach: Local-first for privacy and Filecoin-second for immutable resilience.'
  );

  saveStrategicDecision(
    projectName, 
    'MCP Neural Port', 
    'Adopted the Model Context Protocol as the universal bridge to ensure context survives across Gemini, Claude, and ChatGPT.'
  );

  saveStrategicDecision(
    projectName, 
    'White Nights Aesthetic', 
    'Adopted a soulful, minimalist design inspired by Dostoevsky to emphasize the "Anastasis" (Resurrection) of human thought.'
  );

  console.log('Nastenka has witnessed the seed. Brain is primed.');
}

seed().catch(console.error);
