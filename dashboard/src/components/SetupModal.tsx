import React from 'react';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SetupModal: React.FC<SetupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#faf9f5]/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl p-10 rounded-sm relative shadow-2xl border border-[#141413]/10">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#141413]/40 hover:text-[#141413] transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#d97757]" />
            <span className="text-[#d97757] text-[10px] uppercase tracking-[0.3em] font-medium">Protocol Integration</span>
          </div>
          <h2 className="text-4xl font-headline italic text-[#141413]">Global Resonance Setup</h2>
          <p className="text-xs text-[#141413]/40 mt-2 font-body max-w-md">Connect your personal Intelligence Hub to any platform-agnostic model, including Qwen on OpenCode.</p>
        </div>

        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#141413]/80 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#faf9f5] flex items-center justify-center text-[10px]">1</span>
              Deploy Your Hub
            </h3>
            <p className="text-sm text-[#141413]/60 leading-relaxed ml-7">
              Start your Nastenka Intelligence Hub. For global access, replace <span className="font-mono">localhost</span> with your server IP or domain.
              <code className="block bg-[#141413]/5 p-3 rounded-sm mt-3 text-[#141413] font-mono text-xs">npm run start:api</code>
            </p>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#141413]/80 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#faf9f5] flex items-center justify-center text-[10px]">2</span>
              Connect to Intelligence Platforms
            </h3>
            <div className="ml-7 space-y-4">
              <div className="p-4 border border-[#141413]/10 rounded-sm bg-[#faf9f5]">
                <h4 className="text-[10px] uppercase font-bold text-[#d97757] mb-2 tracking-widest">OpenCode + Qwen</h4>
                <p className="text-xs text-[#141413]/60 mb-2 italic">Optimized for token-saving resonance.</p>
                <p className="text-xs text-[#141413]/60 mb-3">Add Nastenka as a remote MCP server in your OpenCode config:</p>
                <code className="block bg-[#141413] text-[#faf9f5] p-3 rounded-sm text-[10px] font-mono">
                  /connect sse http://YOUR_HUB_URL/sse
                </code>
              </div>

              <div className="p-4 border border-[#141413]/10 rounded-sm bg-[#faf9f5]">
                <h4 className="text-[10px] uppercase font-bold text-[#d97757] mb-2 tracking-widest">Cursor AI // Claude Desktop</h4>
                <p className="text-xs text-[#141413]/60 mb-1">Add a new <span className="font-semibold text-[#141413]">SSE</span> server using your Hub's public or local endpoint.</p>
                <p className="text-xs text-[#141413]/60">URL: <code className="text-[#141413] font-semibold">http://YOUR_HUB_URL/sse</code></p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#141413]/80 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#faf9f5] flex items-center justify-center text-[10px]">3</span>
              Resonate Flow
            </h3>
            <p className="text-sm text-[#141413]/60 leading-relaxed ml-7">
              Once linked, tell your AI to <span className="italic font-headline text-[#141413]">"Witness the current flow"</span>. 
              The minimalist protocol ensures maximal token efficiency for high-density models like Qwen.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-[#141413]/5 flex justify-between items-center">
          <span className="text-[9px] uppercase tracking-widest text-[#141413]/30 font-medium">Protocol v1.0 • Sovereign Architecture</span>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#141413] text-[#faf9f5] rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-[#141413]/90 transition-all"
          >
            Resonate
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupModal;
