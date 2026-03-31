# Nastenka AI ✨
### The Sovereign Intelligence Architecture

Nastenka is a persistent, cross-platform cognitive layer designed to bridge interaction contexts across any LLM (Claude, ChatGPT, Gemini, Qwen). By anchoring your context in a local-first SQLite brain, Nastenka ensures your intelligence remains sovereign, private, and portable.

---

## 🛡️ Core Values
- **Local Sovereignty**: Zero cloud dependency. Your brain runs locally.
- **Context Resurrection**: Carry your architectural intent across different AI sessions.
- **Unified Handshake**: Built on the Model Context Protocol (MCP) for platform-agnostic resonance.
- **Token Efficiency**: Minimalist tool definitions optimized for high-density models like **Qwen**.

---

## 🚀 Quick Start (Resonance Mode)

### 1. Seed the Environment
Rename `.env.example` to `.env` and configure your keys.
```bash
cp .env.example .env
```

### 2. Establish the Hub
Start the unified Intelligence Hub (SSE Server).
```bash
npm install
npm run start:api
```
The Hub resonates at `http://localhost:3001/sse` by default.

### 3. Connect to a Platform

#### **OpenCode + Qwen (Recommended)**
OpenCode is optimized for Qwen resonance and token-saving. In your OpenCode terminal/TUI:
```bash
/connect sse http://YOUR_HUB_URL/sse
```

#### **Claude Desktop // Cursor**
Add a new **SSE** server in your configuration settings:
- **Type**: `SSE`
- **URL**: `http://YOUR_HUB_URL/sse`

---

## 🧠 Documentation

### Witnessing Flow
Once connected, simply tell your AI: 
> *"Witness the current flow for project [NAME]"*

Nastenka will capture your immediate intent and anchor it in your local brain.

### Resurrecting Context
When starting a new session on a different platform, say:
> *"Resurrect the brain for project [NAME]"*

---

## 🏛️ License
Distributable under the **MIT License**. Build with sovereign intent.
