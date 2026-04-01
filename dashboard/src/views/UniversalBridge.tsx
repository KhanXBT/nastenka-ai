import React, { useState, useEffect } from 'react';

interface ModelNode {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  history: { sender: string; text: string; time: string; isCode?: boolean }[];
  color: string;
}

const UniversalBridge: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [connectionOrder, setConnectionOrder] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [prompt, setPrompt] = useState('');
  
  const [models, setModels] = useState<ModelNode[]>([
    {
      id: 'gpt5',
      name: 'GPT 5.1',
      icon: 'assistant',
      connected: false,
      color: 'text-emerald-400',
      history: [
        { sender: 'AI', text: "Project Aeon-AI Architecture locked. Cognitive grounding is active.", time: "09:12 AM" },
        { sender: 'User', text: "Can we ensure the context survives the implementation phase?", time: "09:14 AM" },
        { sender: 'AI', text: "Yes. By using the 'Resurrection' tool, the Hub will re-inject the brain state into your session prompt.", time: "09:15 AM" }
      ]
    },
    {
      id: 'claude4',
      name: 'Claude 4.6',
      icon: 'psychology',
      connected: false,
      color: 'text-fuchsia-400',
      history: [
        { sender: 'AI', text: "I've analyzed the 'Aeon-AI' design requirements. Foundational themes are ready.", time: "09:05 AM" },
        { sender: 'User', text: "Maintain the 'White Nights' soul in the Aeon UI.", time: "09:07 AM" },
        { sender: 'AI', text: "Understood. Applying soulful minimalism to the Aeon development tool.", time: "09:08 AM" }
      ]
    },
    {
      id: 'gemini3',
      name: 'Gemini 3.1 Pro',
      icon: 'temp_preserve_sky',
      connected: false,
      color: 'text-blue-400',
      history: [
        { sender: 'AI', text: "Aeon-AI proof-of-reception is valid. UI Assets CID: Qm...8x7y", time: "08:50 AM" },
        { sender: 'User', text: "Sync the latest UI/UX decisions.", time: "08:52 AM" },
        { sender: 'AI', text: "Syncing 'Aeon-Glass' theme. Storage proof anchored on block 1,241,321.", time: "08:55 AM" }
      ]
    }
  ]);

  const toggleConnect = (id: string) => {
    setModels(prev => {
      const model = prev.find(m => m.id === id);
      const isConnecting = !model?.connected;
      
      if (isConnecting) {
        setConnectionOrder(prevOrder => [...prevOrder, id].slice(-3));
      } else {
        setConnectionOrder(prevOrder => prevOrder.filter(orderId => orderId !== id));
      }

      return prev.map(m => m.id === id ? { ...m, connected: isConnecting } : m);
    });
  };

  const handleExecute = () => {
    if (connectionOrder.length < 2 || isExecuting) return;
    
    setIsExecuting(true);
    setExecutionStep(1);
    
    // Step 1: GPT 5.1 Anchoring
    setTimeout(() => {
      setModels(prev => prev.map(m => m.id === 'gpt5' ? {
        ...m,
        history: [...m.history, { sender: 'AI', text: "🌑 NEURAL PULSE: Resurrecting Aeon-AI Context for current implementation session. Strategic grounding confirmed.", time: "NOW" }]
      } : m));
      setExecutionStep(2);
      
      // Step 2: Claude 4.6 Coding
      setTimeout(() => {
        const aeonCode = `export const AeonCore = () => {
  return (
    <div className="p-8 bg-[#0c0c0b] border border-[#d97757]/10 rounded-2xl">
      <h1 className="text-2xl font-headline italic text-[#faf9f6]">Aeon-AI Nucleus</h1>
      <div className="mt-4 flex gap-2">
        <div className="w-12 h-1 bg-[#d97757]" />
        <div className="w-4 h-1 bg-[#d97757]/20" />
      </div>
      <p className="mt-8 text-sm text-[#faf9f6]/40 leading-relaxed font-body">
        The Autonomous App Development Suite. Grounded in Sovereign Context.
      </p>
    </div>
  );
};`;
        
        setModels(prev => prev.map(m => m.id === 'claude4' ? {
          ...m,
          history: [...m.history, { sender: 'AI', text: "Bridging architectural layers from GPT. Generating AeonCore.tsx implementation...", time: "NOW" }, { sender: 'AI', text: aeonCode, time: "NOW", isCode: true }]
        } : m));
        setExecutionStep(3);
        
        // Step 3: Gemini 3.1 Pro Assets
        setTimeout(() => {
          setModels(prev => prev.map(m => m.id === 'gemini3' ? {
            ...m,
            history: [...m.history, { sender: 'AI', text: "🌑 FILECOIN ANCHOR: Aeon-AI UI/UX assets synchronized. Visual resonance matched with Claude's implementation.", time: "NOW" }]
          } : m));
          setExecutionStep(0);
          setIsExecuting(false);
          setPrompt('');
        }, 3000);
      }, 3500);
    }, 2000);
  };

  const connectedCount = models.filter(m => m.connected).length;
  const referenceModel = models.find(m => m.id === connectionOrder[0]);
  const targetModel = models.find(m => m.id === connectionOrder[1]);

  return (
    <div className="bg-[#0c0c0b] text-[#faf9f6] min-h-screen flex flex-col font-body overflow-hidden">
      {/* 🌑 Top Bar */}
      <header className="h-16 border-b border-[#faf9f6]/5 flex items-center justify-between px-8 bg-[#0c0c0b]/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-[#faf9f6]/40 hover:text-[#d97757] transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="font-headline italic text-xl tracking-tight leading-none">Sovereign Command Center</h1>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#d97757] mt-1">Project: Aeon-AI (Simulation Environment)</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex -space-x-2">
            {models.map(m => (
              <div key={m.id} className={`w-8 h-8 rounded-full border-2 border-[#0c0c0b] flex items-center justify-center bg-[#1c1c1a] overflow-hidden ${m.connected ? 'opacity-100 ring-2 ring-emerald-500/30' : 'opacity-20 grayscale'}`}>
                <span className={`material-symbols-outlined text-sm ${m.color}`}>{m.icon}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#faf9f6]/40">Active Sync: {connectedCount}/3 Model Bridge</span>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* 🌓 Model Sidebar */}
        <aside className="w-16 md:w-24 border-r border-[#faf9f6]/5 flex flex-col items-center py-8 gap-10 bg-[#0c0c0b] sticky left-0 group">
          {models.map(model => {
            const index = connectionOrder.indexOf(model.id);
            const label = index === 0 ? "REFERENCE" : (index === 1 ? "TARGET" : (index === 2 ? "MULTIMODAL" : ""));
            
            return (
              <div key={model.id} className="relative flex flex-col items-center gap-2 group/node">
                <button 
                  onClick={() => toggleConnect(model.id)}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden ${model.connected ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-[#1c1c1a] border border-[#faf9f6]/5'}`}
                >
                  <span className={`material-symbols-outlined text-2xl md:text-3xl ${model.connected ? 'text-emerald-400' : 'text-[#faf9f6]/20'}`}>
                    {model.connected ? 'link' : model.icon}
                  </span>
                  <div className={`absolute -right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-[#0c0c0b] transition-all duration-500 ${model.connected ? 'bg-emerald-500 text-white' : 'bg-[#2c2c2a] text-[#faf9f6]/40'}`}>
                    {model.connected ? (index + 1) : '+'}
                  </div>
                </button>
                <div className="flex flex-col items-center">
                  <span className={`hidden md:block text-[8px] uppercase tracking-[0.2em] font-medium transition-colors ${model.connected ? 'text-emerald-500' : 'text-[#faf9f6]/30'}`}>
                    {model.id}
                  </span>
                  {label && (
                    <span className="text-[6px] uppercase tracking-[0.1em] font-bold text-[#d97757] mt-1 text-center whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </aside>

        {/* 🌘 Main Chat Window */}
        <main className="flex-1 flex flex-col relative">
          {/* Bridge Status Bar */}
          {connectedCount >= 2 && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 py-3 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isExecuting ? 'animate-ping bg-[#d97757]' : 'bg-emerald-500'}`} />
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-emerald-400">
                  {isExecuting ? 'Neural Execution Pulse In Progress...' : 'Sovereign Context Bridge Ready'}
                </span>
              </div>
              <span className="text-[9px] text-[#faf9f6]/20 uppercase tracking-widest leading-none tracking-[0.3em]">
                {isExecuting ? `Task: Construct Aeon-AI Core engine` : `Linked: ${connectionOrder.join(' -> ')}`}
              </span>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-6 md:px-20 py-12 space-y-12">
            <div className="max-w-4xl mx-auto space-y-16">
              {connectedCount === 0 ? (
                <div className="flex flex-col items-center justify-center py-40 animate-in fade-in zoom-in-95 duration-1000">
                  <div className="w-20 h-20 rounded-full bg-[#1c1c1a] border border-[#faf9f6]/5 flex items-center justify-center mb-8 relative group">
                    <span className="material-symbols-outlined text-4xl text-[#faf9f6]/10 group-hover:text-[#d97757]/40 transition-colors duration-700">sensors_off</span>
                    <div className="absolute inset-0 rounded-full bg-[#d97757]/5 blur-xl group-hover:bg-[#d97757]/10 transition-all duration-700" />
                  </div>
                  <h2 className="font-headline italic text-2xl md:text-3xl text-[#faf9f6]/40 tracking-tight">Connect the Models from Sidebar</h2>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#faf9f6]/10 font-medium">Resurrection sequence: Reference → Target → Multimodal</p>
                  <div className="mt-12 flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#d97757]/20" />
                    <div className="w-1 h-1 rounded-full bg-[#d97757]/40" />
                    <div className="w-1 h-1 rounded-full bg-[#d97757]/20" />
                  </div>
                </div>
              ) : (
                models.filter(m => m.connected).sort((a,b) => connectionOrder.indexOf(a.id) - connectionOrder.indexOf(b.id)).map(model => (
                  <div key={model.id} className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                       <span className="h-[1px] w-8 bg-[#faf9f6]/10"></span>
                       <span className={`text-[9px] uppercase tracking-[0.25em] font-bold ${model.color}`}>{model.name} Current Thread</span>
                    </div>
                    {model.history.map((chat, idx) => (
                      <div key={idx} className={`flex gap-6 max-w-4xl ${chat.sender === 'User' ? 'ml-auto flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border bg-[#1c1c1a] border-[#faf9f6]/10 overflow-hidden`}>
                          <span className={`material-symbols-outlined text-sm ${chat.sender === 'User' ? 'text-[#d97757]' : model.color}`}>
                            {chat.sender === 'User' ? 'person' : model.icon}
                          </span>
                        </div>
                        <div className={`p-6 rounded-2xl text-xs leading-relaxed ${chat.sender === 'User' ? 'bg-[#1c1c1a] text-[#faf9f6] rounded-tr-none' : 'bg-[#1c1c1a]/50 text-[#faf9f6]/80 border border-[#faf9f6]/5 rounded-tl-none'} ${chat.isCode ? 'bg-black text-emerald-500 font-mono text-[10px] leading-6 border-emerald-500/20' : ''}`}>
                          {chat.isCode ? <pre className="whitespace-pre-wrap">{chat.text}</pre> : chat.text}
                          <div className="mt-2 text-[8px] text-[#faf9f6]/10 uppercase tracking-[0.25em]">{chat.time} via {model.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
              
              {isExecuting && (
                <div className="flex flex-col items-center gap-6 py-12">
                   <div className="w-16 h-1 bg-[#1c1c1a] relative overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-[#d97757] animate-loading-bar" />
                   </div>
                   <span className="text-[10px] uppercase tracking-[0.4em] text-[#d97757] animate-pulse">Witnessing Resonance step {executionStep}/3...</span>
                </div>
              )}
            </div>
          </div>

          {/* 🌑 Prompt Nexus (Input) */}
          <div className="h-40 flex items-center justify-center px-6 md:px-20 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b] to-transparent">
            <div className="w-full max-w-4xl relative group">
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={isExecuting ? "Witnessing neural execution..." : (connectedCount >= 2 ? "Ready to execute Aeon-AI task..." : "Connect 2+ models to execute...")}
                disabled={isExecuting || connectedCount < 1}
                className="w-full bg-[#1c1c1a]/80 border border-[#faf9f6]/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-[#d97757]/40 focus:ring-1 focus:ring-[#d97757]/40 transition-all duration-500 group-hover:bg-[#1c1c1a]"
              />
              <button 
                onClick={handleExecute}
                disabled={isExecuting || connectedCount < 2}
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isExecuting ? 'bg-[#d97757] animate-pulse shadow-[0_0_20px_rgba(217,119,87,0.4)]' : (connectedCount >= 2 ? 'bg-[#d97757] text-white shadow-lg' : 'bg-[#faf9f6]/5 text-[#faf9f6]/10')}`}
              >
                <span className="material-symbols-outlined text-lg">{isExecuting ? 'sync' : 'bolt'}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UniversalBridge;
