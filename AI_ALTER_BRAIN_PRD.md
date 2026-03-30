# NASTENKA AI — PRODUCT REQUIREMENTS DOCUMENT (PRD) v1.0

## 1. The Story: "The Day the Context Died"

**Act I: The Flow**
Alex is a senior developer building a complex legal-tech platform (Legant.ai). For three hours, they’ve been in a "Zen state" with Claude 3.5 Sonnet inside the Cursor IDE. They’ve architected a custom vector-sync engine, discussed the trade-offs of using `pnpm` vs. `npm`, and locked in a specific naming convention for the backend services. The AI understands Alex's "Invisible Intent"—it knows that Alex prefers functional programming and hates unnecessary boilerplate.

**Act II: The Wall**
Suddenly, a red notification: *"Token quota exhausted"* or *"Context window limit reached."* The AI starts "forgetting" the early architectural decisions. It suggests using a library Alex already rejected an hour ago. The "Flow" is broken. Alex needs a second opinion from Gemini 1.5 Pro because of its massive context window, but they dread the transition.

**Act III: The Fragmentation**
Alex opens Gemini in a browser tab. They spend 20 minutes copy-pasting the last 10 messages, explaining the tech stack again, and re-stating the "No Redux" rule. But Gemini didn't see the *reasoning* Alex and Claude shared. Gemini suggests a "standard" approach that conflicts with the custom engine Alex just built. Alex is now fighting the AI instead of building with it.

**Act IV: The Hallucination**
Because Gemini doesn't have **Nastenka AI**, it fills in the gaps with hallucinations. It assumes Alex is using a standard `Vite` setup when Alex is actually using a custom `Turbo` build. It generates 200 lines of useless code. Alex closes the lid, frustrated. 30 minutes of cognitive energy wasted.

**The Solution: Nastenka AI**
Alex opens Gemini and says: *"You’re aware of my GPT/Claude convo about the Legal Engine, right? Carry forward."* 
Gemini pings the **Nastenka AI MCP Server**. It receives the **Cognitive Ledger**. It says: *"Yes, I see we locked in the Turbo build and rejected Redux. I've analyzed your progress on the vector-sync engine. Let's finish the replication logic."* 

**The Context is saved. The Thinking continues. Alex is back in the Flow.**

---

## 2. Core Vision & Principles

*   **User-Owned Cognition:** The user owns the "Thinking Layer," not the AI platform.
*   **Agnostic Portability:** Context must move between models (Claude, Gemini, Grok, GPT) and platforms (Mac, Windows, Linux, Android, iOS) seamlessly.
*   **Zero-Loss Flow:** Switching models should feel like a hardware upgrade, not a project restart.
*   **Invisible-First:** The brain works in the background until called upon.

---

## 3. Cognitive Architecture: The Hybrid Ledger

To ensure 100% accuracy, **Nastenka AI** handles two distinct types of memory:

### 3.1 The Versioned State-Tree (Short-Term/Working Memory)
*   **Mechanism:** A Git-like tree of "Active Snapshots."
*   **Function:** Tracks the sequence of the current task. Each "Step" is a node.
*   **Rollback:** Allows users to "Undo" a model's mistake by rolling the Brain back to a pre-error state.

### 3.2 The Knowledge Graph (Long-Term/Strategic Memory)
*   **Mechanism:** A graph of entities and rules.
*   **Nodes:** `Technology`, `Decision`, `Preference`, `Constraint`, `Milestone`.
*   **Edges:** `REJECTS`, `DEPENDS_ON`, `PREFERS`, `ESTABLISHED_BY`.
*   **Function:** Ensures that "Hard Rules" (e.g., *"No Redux"*) are never forgotten, regardless of how deep the conversation goes.

---

## 4. Technical Stack (The Build-Ready Spec)

### 4.1 Core Infrastructure
*   **Shell:** **Tauri 2.0 (Rust)** for multi-device support (Desktop & Mobile).
*   **Database:** **SurrealDB (Embedded)** using the `surrealkv` engine for high-performance graph/document storage.
*   **Interface:** **Model Context Protocol (MCP)** SDK (TypeScript/Rust).

### 4.2 The "Everywhere" Sync (SS-Hybrid)
*   **Protocol:** **libp2p** for direct device-to-device "Neural Sync."
*   **Layer:** **Automerge (Rust) / Sync (Tailscale)** for conflict-free merging of brain data.
*   **Relay:** A private, encrypted Mirror-Relay (VPS/Node) for "asynchronous" sync when primary devices are offline.
*   **Security:** **Curve25519** End-to-End Encryption (E2EE). User holds the private key; the Brain is unreadable by anyone else.

---

## 5. The "Brain API" (Core MCP Tools)

Any AI connected to **Nastenka AI** must use these three tools:

### `sync_current_intent(target_goal, context_summary)`
*   **Logic:** Signals the Brain to "snapshot" the current conversational state and extract the user's immediate goal.
*   **Response:** `commit_id` of the new state.

### `get_architectural_grounding(project_id)`
*   **Logic:** Returns the "Hard Constraints" and "Strategic Decisions" for the project.
*   **Injection:** This is the tool Gemini calls when the user says "Carry forward."

### `mark_structural_decision(decision_name, rationale, status)`
*   **Logic:** Permanent storage of a "Why." 
*   **Enforcement:** If a future session proposes a conflict, the MCP server issues a `ConflictWarning` with the rationale.

---

## 6. Implementation Workflow: The "Conversational Switch"

1.  **Extraction:** A background "Ghost Agent" (using a local **Phi-3** or **Llama-3** via Llama.cpp) periodically parses chat logs to update the `Knowledge Graph`.
2.  **Detection:** The MCP Server monitors UI interaction or keyword triggers (e.g., *"You're aware of..."*).
3.  **Rehydration:** The Server fetches the `latest stable snapshot` + `Current Intent` + `Grounding Rules`.
4.  **Injection:** The context is injected into the AI's system prompt (for IDEs) or provided as a "User Pre-Brief" (for browser-based chats).

---

## 7. Success Metrics & Roadmap

*   **Low Latency:** Brain Rehydration must take **<800ms**.
*   **Zero Accuracy Loss:** Decisions marked as `LOCKED` must never be contradicted by the AI.
*   **Omni-Presence:** App available on Windows, MacOS, Linux, iOS, and Android within the first 3 phases.

---
**PRD Locked for Build.**
