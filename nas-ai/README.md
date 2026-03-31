# Nastenka AI: The Sovereign Intelligence Brain

> "Your context is your power—reclaim it."

Nastenka AI is a persistent, cross-platform cognitive layer designed for the **PL_Genesis Hackathon**. It bridges the interaction gaps between Claude, ChatGPT, and Gemini, storing your intellectual property in a sovereign, local-first SQLite brain.

## 🌌 Celestial Architecture

- **The Brain (Unified Hub)**: A Node.js backend (Express + MCP) that manages your cognitive synapses, strategic rules, and Filecoin storage proofs.
- **The Witness Dashboard**: A high-fidelity, atmospheric React frontend (Vite) for visualizing your context journey.
- **Model Context Protocol (MCP)**: A universal bridge enabling real-time "witnessing" across any AI platform (Cursor, Claude, etc.).

## 🚀 Deployment & Resonance

### 1. The Witness Dashboard (Frontend)
The dashboard is Vercel-ready. 
1.  **Vercel**: Import this repository.
2.  **config**: Ensure the dashboard directory is used as the root.
3.  **URL**: [https://nastenka-ai.vercel.app](https://nastenka-ai.vercel.app) (sample)

### 2. The Intelligence Hub (Brain)
For flawless connectivity across platforms, deploy the Brain to a persistent host (like Cloud Run, Fly.io, or Render).
- **Endpoint**: `/sse` (MCP Neural Port)
- **REST**: `/api/synapses/:project` (Grounding Feed)

## 🧬 How to Setup MCP

1.  **Start your Hub**: `npm run start:api`
2.  **Connect Cursor**: 
    - Settings → MCP → Add SSE Server.
    - URL: `http://localhost:3001/sse`
3.  **Witness Flow**: Tell your AI to *"Witness the current flow for project Nas AI"*.

---
Built with 🤍 for **PL_Genesis 2026**.
~ The Celestial Curator
