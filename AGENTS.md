# Nastenka AI: Sovereign Intelligence Hub 🌑✨

This repository is a sovereign cognitive layering system designed to preserve context across AI models and platforms. It implements the **Model Context Protocol (MCP)** via a unified Hub (Backend) and Witness Dashboard (Frontend).

## 🌒 Core Architecture

### 1. The Hub (Source: `src/`)
- **`api.ts`**: The main Express server handling REST and MCP SSE Handshaking.
- **`db.ts`**: Unified SQLite memory layer. Automatically detects Vercel environments and switches to `/tmp/nastenka_brain.db` for cloud portability.
- **`index.ts`**: Stdio-based MCP server for local development.
- **`seed.ts`**: Neural seeding logic used to initialize the cognitive map on first deployment.

### 2. The Witness (Source: `dashboard/`)
- **React/Vite/Tailwind**: A high-fidelity, "White Nights" inspired dashboard.
- **`DashboardView.tsx`**: visualizes synapses and strategic decisions.
- **`LoginView.tsx`**: The "Threshold of Witness" entry point.
- **`WaitlistModal.tsx`**: Protocol access capture for new seekers.

### 3. Deployment (`vercel.json`)
- Unified mono-root deployment.
- Root `/api` and `/sse` routed to `src/api.ts`.
- Root `/*` routed to the built `dashboard/dist`.

## 🌓 Active Status
- **URL**: [https://nastenka-ai.vercel.app/](https://nastenka-ai.vercel.app/)
- **Custom Domain**: `nastenka-ai.site` (A Record: `76.76.21.21`).
- **Waitlist**: Fully operational.
- **Memory**: Persistent in `/tmp/` (Local-first, ephemeral cloud).

## 🌘 Mission for the New Subagent
- **Persistence**: Consider migrating from `/tmp/` SQLite to a persistent cloud PostgreSQL (Supabase/Vercel Postgres) for the final hackathon demo.
- **Filecoin**: Integrate the storage backend in `src/storage/filecoin.ts` to anchor cognitive synapses on-chain.
- **Aesthetics**: Maintain the "Soulful Minimalism" and "No Line" rule of the White Nights design system.
