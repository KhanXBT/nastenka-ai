export interface ArchiveNode {
  id: string;
  name: string;
  title: string;
  description: string;
  tokens: string;
  health: number;
  latency: string;
  status: 'Active' | 'Optimizing' | 'Archiving' | 'Standby';
  type: 'GPT' | 'Gemini' | 'Sovereign' | 'MCP';
  icon: string;
}

export interface LogEntry {
  time: string;
  message: string;
  status: string;
}

export const archiveNodes: ArchiveNode[] = [
  {
    id: 'legant-l1-hub',
    name: 'Legant Sovereign L1',
    title: 'BharatLex Grounding',
    description: 'Active grounding of Indian Case Law (50M+ Synapses). Training the first foundational LLM for the Indian Judiciary.',
    tokens: '42.5B Tokens',
    health: 100,
    latency: '4ms',
    status: 'Active',
    type: 'Sovereign',
    icon: 'gavel'
  },
  {
    id: 'agentic-vibe-node',
    name: 'Antigravity Vibe-Bridge',
    title: 'Zero-Latency Synthesis',
    description: 'Autonomous agent orchestration. Entire Nastenka/Legant infra vibe-coded in 4.2 hours.',
    tokens: 'Agentic Active',
    health: 99,
    latency: '2ms',
    status: 'Active',
    type: 'MCP',
    icon: 'bolt'
  },
  {
    id: 'gemini-1-5-flash-hub',
    name: 'Gemini 1.5 Flash (Agentic)',
    title: 'High-Velocity Logic',
    description: 'Multi-modal reasoning terminal for rapid UI/UX and architectural iteration.',
    tokens: '1.2M Tokens',
    health: 98,
    latency: '12ms',
    status: 'Active',
    type: 'Gemini',
    icon: 'auto_awesome'
  },
  {
    id: 'filecoin-synapse-archive',
    name: 'Filecoin Synapse Node',
    title: 'Sovereign Memory',
    description: 'On-chain convergence for critical legal decisions. Anchoring cognitive history beyond chat silos.',
    tokens: '8.4TB Anchored',
    health: 100,
    latency: '8ms',
    status: 'Active',
    type: 'Sovereign',
    icon: 'hub'
  }
];

export const archiveLogs: LogEntry[] = [
  {
    time: '12:51',
    message: '⚡ AGENTIC SYNC: Full-Stack React Scaffold deployed in 142s via Vibe-Coding.',
    status: 'OPTIMIZED'
  },
  {
    time: '11:30',
    message: '🏛️ BHARATLEX: Federated grounding with SC Case Law complete. Signal is clean.',
    status: 'SECURE'
  },
  {
    time: '10:15',
    message: '🔍 MCP PROXY: Handshake with Claude Desktop verified. Cross-model context active.',
    status: 'LIVE'
  },
  {
    time: '09:00',
    message: '📉 SOVEREIGN L1: Latency optimized to 4ms for real-time legal argumentation.',
    status: 'VERIFIED'
  }
];

export const curatorNote = {
  label: 'Founder Profile',
  text: '"Ideas are cheap; execution is the only signal that matters. Legant and Nastenka are not just apps—they are the first modules of an Sovereign Intelligence OS for the entire Indian subcontinent. We build in hours, not weeks."'
};
