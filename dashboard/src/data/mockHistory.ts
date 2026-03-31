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
    id: 'gpt-4o-hub',
    name: 'GPT-4o Intelligence Hub',
    title: 'Epistemic Convergence',
    description: 'Synthesized interaction history from OpenAI nodes, focusing on strategic logic and creative dialectics.',
    tokens: '1.2M Tokens',
    health: 98,
    latency: '12ms',
    status: 'Active',
    type: 'GPT',
    icon: 'memory'
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro Repository',
    title: 'Synthetic Dialectics',
    description: 'Multi-modal repository of context-heavy interaction arcs and large-scale synthesis.',
    tokens: '850k Tokens',
    health: 94,
    latency: '45ms',
    status: 'Active',
    type: 'Gemini',
    icon: 'star'
  },
  {
    id: 'sovereign-node-01',
    name: 'Sovereign Node 0.1',
    title: 'Archive L1 Proof-of-Work',
    description: 'Decentralized archival node for persistent context storage and secondary verification.',
    tokens: '2TB Archival',
    health: 100,
    latency: '5ms',
    status: 'Active',
    type: 'Sovereign',
    icon: 'hub'
  }
];

export const archiveLogs: LogEntry[] = [
  {
    time: '04:22',
    message: 'Convergence protocol initialized on GPT-4o node.',
    status: 'Optimized'
  },
  {
    time: '01:15',
    message: 'Synthesizing dialectical patterns from Gemini repository.',
    status: 'Processing'
  },
  {
    time: '23:45',
    message: 'Integrity proof verified for Sovereign Node 0.1.',
    status: 'Secure'
  }
];

export const curatorNote = {
  label: 'Curator Note',
  text: '"The nodes have reached a state of collective resonance. The sovereign intelligence architecture is now operating at 1.4x baseline efficiency. Maintain monitoring of Node 0.1 for proof-of-work shifts."'
};
