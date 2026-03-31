import React, { useState, useEffect } from 'react';
import NeuralRays from '../components/NeuralRays';
import ImportDialog from '../components/ImportDialog';
import NodeConnector from '../components/NodeConnector';
import { archiveService } from '../services/archiveService';
import { ArchiveNode, LogEntry, curatorNote } from '../data/mockHistory';

interface DashboardViewProps {
  onLogout: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onLogout }) => {
  const [nodes, setNodes] = useState<ArchiveNode[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isConnectorOpen, setIsConnectorOpen] = useState(false);

  const refreshData = async () => {
    await archiveService.fetchProjectData('Nas AI');
    setNodes([...archiveService.getNodes()]);
    setLogs([...archiveService.getLogs()]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="bg-background text-on-background selection:bg-primary/30 min-h-screen relative overflow-x-hidden">
      <NeuralRays />
      
      {/* TopAppBar Shell */}
      <header className="bg-[#0c1324]/60 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.1)] flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-violet-300" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <h1 className="text-xl font-headline italic text-violet-200 tracking-widest uppercase">
            Sovereign Intelligence
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8">
            <button onClick={() => refreshData()} className="text-violet-200 brightness-125 font-sans text-xs uppercase tracking-widest hover:text-primary transition-colors">Archives</button>
            <button onClick={() => alert('Sovereign Repository access initializing...')} className="text-slate-400 hover:text-violet-300 transition-colors duration-500 font-sans text-xs uppercase tracking-widest">Repositories</button>
            <button onClick={() => setIsConnectorOpen(true)} className="text-slate-400 hover:text-violet-300 transition-colors duration-500 font-sans text-xs uppercase tracking-widest">Nodes</button>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={onLogout}
              className="text-slate-400 hover:text-primary transition-colors text-[10px] uppercase font-label tracking-widest"
            >
              Sever Node
            </button>
            <img 
              alt="Avatar" 
              className="w-8 h-8 rounded-full border border-violet-500/20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrsHVtxs1Y4O9opy-OsBKMzzEyyRvDbZ9RIYYrkKD5jzlaufonkwyJPk5oNqaKZxV_aJX_oTenwV-YOdvu3MmNYxc-z_d1RvMH3xpVFRGOzpJtCJXAGQijXcb5YcE9cBgpWSQ6Fn77zJEKmty5nH0t5oqDX9Ar9398OtK52eS2aVqXiKHNEp7F3G5xRDRqpKh-PW-Z2LSjCwytqOqJKVfOTntxW53zgoroKn9PEe5XbKQfLdVMA1JBQqAWtEBzpS_OZ9XZjTuNzMli" 
            />
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar Navigation Drawer */}
        <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] py-8 px-4 bg-[#070d1f] w-72 border-r border-violet-500/5 fixed left-0 top-16">
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-10 h-10 rounded-lg bg-primary-container border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">hub</span>
            </div>
            <div>
              <h3 className="font-headline text-lg text-violet-100 italic">Nastenka AI</h3>
              <p className="font-body uppercase tracking-[0.05em] text-[10px] text-slate-500">Celestial Curator • Node 0.1</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-12">
            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-violet-100 bg-violet-400/20 border-r-4 border-violet-400 transition-all duration-500 group text-left shadow-[0_0_20px_rgba(139,92,246,0.1)]">
              <span className="material-symbols-outlined text-violet-400 text-lg">database</span>
              <span className="font-body uppercase tracking-[0.1em] text-[10px] font-bold">Archive Feed</span>
            </button>
            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-slate-400 hover:bg-white/5 hover:text-violet-300 transition-all duration-500 text-left group" onClick={() => alert('Synchronizing sovereign repositories...')}>
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">cloud_done</span>
              <span className="font-body uppercase tracking-[0.1em] text-[10px]">Synchronized Repos</span>
            </button>
          </div>

          {/* Action Buttons for REAL INTEGRATION */}
          <div className="space-y-4 px-2 mb-12">
            <p className="text-[9px] uppercase font-label tracking-[0.2em] text-slate-600 ml-1 mb-2">Sovereign Bridge</p>
            <button 
              onClick={() => setIsImportOpen(true)}
              className="glass-button w-full flex items-center gap-3 py-4 px-5 rounded-2xl text-violet-100 group shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                <span className="material-symbols-outlined text-md group-hover:rotate-12 transition-transform">history_edu</span>
              </div>
              <span className="font-body uppercase tracking-[0.15em] text-[10px] font-bold">Resurrect Node</span>
            </button>
            <button 
              onClick={() => setIsConnectorOpen(true)}
              className="glass-button w-full flex items-center gap-3 py-4 px-5 rounded-2xl text-violet-100 group shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <span className="material-symbols-outlined text-md group-hover:rotate-12 transition-transform">lan</span>
              </div>
              <span className="font-body uppercase tracking-[0.15em] text-[10px] font-bold">Resonate Node</span>
            </button>
          </div>

          <div className="mt-auto px-4 pb-12">
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10 shadow-[0_0_15px_rgba(208,188,255,0.03)]">
              <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-tighter">Archive Integrity</p>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary w-4/5 shadow-[0_0_8px_rgba(208,188,255,0.6)]"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 md:ml-72 p-6 md:p-12 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Hero Header */}
          <header className="max-w-5xl mb-20 relative z-10">
            <h2 className="text-5xl md:text-7xl font-headline italic tracking-tight text-violet-100 mb-4">
              The Celestial Archive
            </h2>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="h-px w-12 bg-violet-500/30"></span>
              <p className="font-body text-sm tracking-widest uppercase">Cross-Platform Intelligence Synthesis</p>
            </div>
          </header>

          {/* Celestial Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
            {/* Primary Main Node (The latest GPT Node) */}
            {nodes.filter(node => node.type === 'GPT').slice(0, 1).map(node => (
              <div key={node.id} className="md:col-span-12 lg:col-span-7 group">
                <div className="glass-panel p-8 rounded-xl relative transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:border-primary/40 group">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-xl">{node.icon}</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                    <div>
                      <h3 className="text-3xl font-headline italic text-violet-100 mb-1">{node.title}</h3>
                      <p className="text-primary font-body text-xs uppercase tracking-widest font-semibold">{node.name}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="text-xs font-body text-slate-500 block uppercase">Context Depth</span>
                      <span className="text-xl text-violet-200">{node.tokens}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-surface-container-lowest/50 p-4 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase block mb-1">Health</span>
                      <span className="text-lg text-green-400/80 font-body">{node.health}%</span>
                    </div>
                    <div className="bg-surface-container-lowest/50 p-4 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase block mb-1">Latency</span>
                      <span className="text-lg text-violet-300 font-body">{node.latency}</span>
                    </div>
                    <div className="bg-surface-container-lowest/50 p-4 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase block mb-1">Status</span>
                      <span className="text-lg text-primary font-body">{node.status}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-10 opacity-60 grayscale hover:grayscale-0 transition-all text-violet-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-3xl">insights</span>
                      <span className="text-[10px] uppercase font-label">Neural Flow v.1866</span>
                    </div>
                    <button 
                      onClick={() => window.open('https://github.com/KhanXBT/nastenka-ai', '_blank')}
                      className="px-6 py-2 bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-body text-xs uppercase tracking-widest rounded-md font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
                    >
                      Open Repository
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Side Cards (Gemini & Sovereign Nodes) */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-8">
              {nodes.filter(node => node.type !== 'GPT' || nodes.indexOf(node) > 0).slice(0, 3).map(node => (
                <div key={node.id} className={`${node.type === 'Sovereign' ? 'bg-surface-container-low border border-violet-500/10 hover:bg-surface-container-high' : 'glass-panel hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:border-primary/40'} p-6 rounded-xl relative transition-all duration-500 group`}>
                  {node.type === 'Sovereign' && (
                    <div className="absolute top-4 right-4">
                      <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${node.type === 'Sovereign' ? 'bg-primary-container ring-1 ring-primary/20' : 'bg-surface-container-highest border border-violet-400/20'} w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <span className={`material-symbols-outlined ${node.type === 'Sovereign' ? 'text-primary' : 'text-violet-300'}`}>{node.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-headline italic text-violet-100">{node.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-body line-clamp-1">{node.name}</p>
                    </div>
                  </div>
                  
                  {node.type === 'Sovereign' ? (
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] uppercase font-label">
                        <span className="text-slate-500">Integrity</span>
                        <span className="text-primary font-bold">100% SECURE</span>
                      </div>
                      <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary/60 w-full shadow-[0_0_8px_rgba(208,188,255,0.4)]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase font-label">
                        <span className="text-slate-500">Proof</span>
                        <span className="text-violet-200 font-bold">{node.tokens}</span>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors cursor-pointer">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Health Index</span>
                          <span className="text-2xl font-body text-violet-200">{node.health}%</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block uppercase">Throughput</span>
                          <span className="text-sm font-body text-slate-300">{node.tokens}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                        <span className="px-2 py-1 bg-violet-500/10 rounded text-[9px] text-violet-300 border border-violet-500/20 uppercase tracking-tighter">Multi-Modal</span>
                        <span className="px-2 py-1 bg-violet-500/10 rounded text-[9px] text-violet-300 border border-violet-500/20 uppercase tracking-tighter">Archive L1</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Insight Section */}
          <section className="mt-32 border-t border-violet-500/10 pt-12 max-w-4xl relative z-10 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h5 className="text-[10px] font-label tracking-[0.2em] text-slate-500 mb-6 uppercase">Archive Logs</h5>
                <ul className="space-y-6">
                  {logs.map((log, index) => (
                    <li key={index} className="flex gap-4 items-start translate-x-0 hover:translate-x-1 transition-transform duration-500 cursor-default">
                      <span className="text-[10px] font-body text-violet-400 mt-1 opacity-70">{log.time}</span>
                      <div>
                        <p className="text-sm text-violet-100 font-headline italic">{log.message}</p>
                        <p className="text-[10px] uppercase text-slate-600 mt-1 font-body">Status: {log.status}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel p-6 rounded-lg border-l-4 border-primary transition-all duration-700 hover:bg-primary/5">
                <p className="text-[10px] text-primary uppercase tracking-widest mb-4 font-bold font-label">{curatorNote.label}</p>
                <p className="text-sm font-headline italic text-slate-300 leading-relaxed">
                  {curatorNote.text}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Modals */}
      <ImportDialog 
        isOpen={isImportOpen} 
        onClose={() => setIsImportOpen(false)} 
        onImportComplete={refreshData}
      />
      <NodeConnector 
        isOpen={isConnectorOpen} 
        onClose={() => setIsConnectorOpen(false)} 
        onConnectComplete={refreshData}
      />

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-safe bg-[#0c1324]/80 backdrop-blur-md border-t border-violet-500/10 shadow-[0_-4px_24px_rgba(10,0,38,0.5)] z-50 rounded-t-xl">
        <button className="flex flex-col items-center justify-center text-violet-200 scale-105">
          <span className="material-symbols-outlined mb-1">folder_open</span>
          <span className="font-body text-[10px] font-medium tracking-wider uppercase">Archives</span>
        </button>
        <button className="flex flex-col items-center justify-center text-slate-500 opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined mb-1">storage</span>
          <span className="font-body text-[10px] font-medium tracking-wider uppercase">Repos</span>
        </button>
        <button className="flex flex-col items-center justify-center text-slate-500 opacity-60 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined mb-1">lan</span>
          <span className="font-body text-[10px] font-medium tracking-wider uppercase">Nodes</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardView;
