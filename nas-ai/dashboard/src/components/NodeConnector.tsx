import React, { useState } from 'react';
import { archiveService } from '../services/archiveService';

interface NodeConnectorProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectComplete: () => void;
}

const NodeConnector: React.FC<NodeConnectorProps> = ({ isOpen, onClose, onConnectComplete }) => {
  const [url, setUrl] = useState('http://localhost:3001/sse');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsConnecting(true);
    setError(null);

    try {
      await archiveService.connectMCP(url);
      onConnectComplete();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sovereign Node handshake failed.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md">
      <div className="bg-surface-container-low w-full max-w-md p-8 rounded-2xl relative shadow-[0_0_50px_rgba(208,188,255,0.05)] border border-violet-500/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-3xl">lan</span>
          </div>
          <h2 className="text-2xl font-headline italic text-violet-100">Sovereign Link</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-body">Connect to external MCP platform (SSE)</p>
        </div>

        <form onSubmit={handleConnect} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-label text-slate-500 ml-1">Node Endpoint URL</label>
            <input 
              type="url" 
              className="w-full bg-background border border-outline-variant/20 p-4 rounded-xl text-sm font-body text-violet-100 focus:border-primary outline-none transition-all"
              placeholder="http://localhost:3001/sse"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              disabled={isConnecting}
            />
          </div>

          <button 
            type="submit"
            disabled={isConnecting}
            className={`w-full py-4 rounded-xl bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-body text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all ${isConnecting ? 'animate-pulse' : ''}`}
          >
            {isConnecting ? 'Resonating Node...' : 'Establish Connection'}
          </button>
          
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-2">
          <div className="flex gap-2 items-center text-[9px] text-slate-600 font-label uppercase">
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>Protocol: MCP v1.0 Universal</span>
          </div>
          <div className="flex gap-2 items-center text-[9px] text-slate-600 font-label uppercase">
            <span className="material-symbols-outlined text-sm">security</span>
            <span>Handshake Encryption: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeConnector;
