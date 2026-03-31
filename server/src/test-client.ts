import { archiveManager } from "./db/archiveManager.js";

async function testWitness() {
  console.log("--- Testing Nastenka Sovereign Witness ---");
  
  const id = archiveManager.storeSynapse(
    "antigravity-test-v1",
    "NAS-AI-VERIFY",
    "Self-Verification of Sovereign Brain",
    "The Resurrection Bridge is now active and capable of cross-platform context storage."
  );

  console.log(`Synapse ID ${id} stored successfully.`);
  
  const results = archiveManager.searchSynapses("Resurrection");
  console.log(`Search Results Found: ${results.length}`);
  console.log(`Latest Snippet: ${results[0].context_snippet}`);
}

testWitness().catch(console.error);
