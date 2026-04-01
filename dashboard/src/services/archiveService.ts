import axios from 'axios';
import { ArchiveNode, LogEntry, archiveNodes as defaultNodes } from '../data/mockHistory';

const API_BASE = '/api';

class ArchiveService {
  private nodes: ArchiveNode[] = [];
  private logs: LogEntry[] = [];
  private apiKey: string | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const savedNodes = localStorage.getItem('nas_ai_nodes');
    const savedLogs = localStorage.getItem('nas_ai_logs');
    this.apiKey = localStorage.getItem('nas_ai_key');
    if (savedNodes) this.nodes = JSON.parse(savedNodes);
    if (savedLogs) this.logs = JSON.parse(savedLogs);
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('nas_ai_key', key);
  }

  getApiKey() {
    return this.apiKey;
  }

  private saveToStorage() {
    localStorage.setItem('nas_ai_nodes', JSON.stringify(this.nodes));
    localStorage.setItem('nas_ai_logs', JSON.stringify(this.logs));
  }

  async fetchProjectData(projectName: string = 'Nas AI'): Promise<void> {
    try {
      const response = await axios.get(`${API_BASE}/synapses/${projectName}`, {
        headers: {
          'X-NASTENKA-KEY': this.apiKey || ''
        }
      });
      const { rules, latestSynapse } = response.data;

      // Map DB rules and synapse to UI nodes if they don't exist yet
      if (latestSynapse) {
        const synapseNode: ArchiveNode = {
          id: `synapse-${latestSynapse.id}`,
          name: `Witnessed Context: ${latestSynapse.model_id}`,
          title: latestSynapse.intent,
          description: latestSynapse.context_snippet,
          tokens: 'Real-time',
          health: 100,
          latency: 'Local',
          status: 'Active',
          type: 'GPT',
          icon: 'psychology'
        };
        
        // Add if not already present
        if (!this.nodes.find(n => n.id === synapseNode.id)) {
          this.nodes.unshift(synapseNode);
        }
      }

      rules.forEach((rule: any) => {
        const ruleNode: ArchiveNode = {
          id: `rule-${rule.id}`,
          name: `Strategic Decision: ${rule.decision_name}`,
          title: rule.decision_name,
          description: rule.rationale,
          tokens: 'LOCKED',
          health: 100,
          latency: 'Immutable',
          status: 'Active',
          type: 'Sovereign',
          icon: 'gavel'
        };
        if (!this.nodes.find(n => n.id === ruleNode.id)) {
          this.nodes.push(ruleNode);
        }
      });

      this.addLog(`Celestial Convergence: Synchronized with '${projectName}' brain.`);
      this.saveToStorage();
    } catch (error) {
      console.error('Failed to fetch from Nastenka Brain:', error);
      if (this.nodes.length === 0) {
        this.nodes = [...defaultNodes];
      }
    }
  }

  async importChatGPT(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data)) {
            // Save to backend
            await axios.post(`${API_BASE}/synapses`, {
              projectName: 'Nas AI',
              modelId: 'Imported-ChatGPT',
              intent: `Resurrection of ${file.name}`,
              context: `Imported ${data.length} conversations for sovereign archive.`
            }, {
              headers: {
                'X-NASTENKA-KEY': this.apiKey || ''
              }
            });

            await this.fetchProjectData('Nas AI');
            resolve();
          } else {
            reject(new Error('Invalid ChatGPT Archive format.'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('File reading failed.'));
      reader.readAsText(file);
    });
  }

  async connectMCP(url: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNode: ArchiveNode = {
          id: `mcp-node-${Date.now()}`,
          name: `Sovereign Node: ${new URL(url).hostname}`,
          title: 'Remote Resonator',
          description: `Live digital witness connected at ${url}. Streaming cognitive flows.`,
          tokens: 'Live Stream',
          health: 100,
          latency: '24ms',
          status: 'Active',
          type: 'Sovereign',
          icon: 'sensors'
        };
        this.nodes.push(newNode);
        this.addLog(`Sovereign link established: ${url}`);
        this.saveToStorage();
        resolve();
      }, 1500);
    });
  }

  addLog(message: string) {
    this.logs.unshift({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message,
      status: 'Live'
    });
    if (this.logs.length > 10) this.logs.pop();
    this.saveToStorage();
  }

  getNodes() { return this.nodes; }
  getLogs() { return this.logs; }
}

export const archiveService = new ArchiveService();
