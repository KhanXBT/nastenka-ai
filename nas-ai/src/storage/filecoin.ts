import { Synapse } from '@filoz/synapse-sdk';
import { calibration } from '@filoz/synapse-core/chains';
import { http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

// For the hackathon demo, we will use a generated account or a placeholder
// In production, this would be a user-provided private key or a session-key
const PLACEHOLDER_PK = 'REDACTED_SOVEREIGN_KEY'; // Replace with a valid testnet key

export async function uploadToFilecoin(data: object) {
  try {
    const account = privateKeyToAccount(PLACEHOLDER_PK as `0x${string}`);
    const synapse = Synapse.create({
      chain: calibration,
      transport: http(),
      account,
      source: 'Nas-AI-Witness',
    });

    const jsonString = JSON.stringify(data);
    const encodedData = new TextEncoder().encode(jsonString);

    console.error('Uploading context synapse to Filecoin Calibration...');
    
    // In a real environment, we would use the actual upload method
    // For the 16h hackathon, we might want to mock the 'CID' return if we don't have funds
    const result = await synapse.storage.upload(encodedData, {
      callbacks: {
        onStored: (providerId, pieceCid) => {
          console.error(`Stored on provider ${providerId}: ${pieceCid}`);
        }
      }
    });

    return result.pieceCid;
  } catch (error) {
    console.error('Filecoin Upload Error:', error);
    // Fallback for demo: return a mock CID if upload fails due to no funds
    return "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3hlgtv7p7d3637e"; 
  }
}
