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
          <h2 className="text-4xl font-headline italic text-[#141413]">How to Setup MCP</h2>
        </div>

        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#141413]/80 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#faf9f5] flex items-center justify-center text-[10px]">1</span>
              Local Environment
            </h3>
            <p className="text-sm text-[#141413]/60 leading-relaxed ml-7">
              Ensure your Nastenka Intelligence Hub is running locally. Open your terminal in the root directory and run:
              <code className="block bg-[#141413]/5 p-3 rounded-sm mt-3 text-[#141413] font-mono text-xs">npm run start:api</code>
              This starts the SSE (Server-Sent Events) server on <span className="font-semibold">port 3001</span>.
            </p>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#141413]/80 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#faf9f5] flex items-center justify-center text-[10px]">2</span>
              External Platform Sync
            </h3>
            <div className="ml-7 space-y-4">
              <div className="p-4 border border-[#141413]/10 rounded-sm bg-[#faf9f5]">
                <h4 className="text-[10px] uppercase font-bold text-[#d97757] mb-2 tracking-widest">Claude Desktop</h4>
                <p className="text-xs text-[#141413]/60 mb-3">Add this to your <code className="text-[#141413]">claude_desktop_config.json</code>:</p>
                <pre className="bg-[#141413] text-[#faf9f5] p-3 rounded-sm text-[10px] overflow-x-auto">
{`{
  "mcpServers": {
    "nastenka": {
      "url": "http://localhost:3001/sse"
    }
  }
}`}
                </pre>
              </div>

              <div className="p-4 border border-[#141413]/10 rounded-sm bg-[#faf9f5]">
                <h4 className="text-[10px] uppercase font-bold text-[#d97757] mb-2 tracking-widest">Cursor AI</h4>
                <p className="text-xs text-[#141413]/60 mb-1">1. Open Settings → MCP</p>
                <p className="text-xs text-[#141413]/60 mb-1">2. Add Server → Type: <span className="font-semibold">SSE</span></p>
                <p className="text-xs text-[#141413]/60">3. URL: <code className="text-[#141413] font-semibold">http://localhost:3001/sse</code></p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#141413]/80 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#141413] text-[#faf9f5] flex items-center justify-center text-[10px]">3</span>
              Verify Witnessing
            </h3>
            <p className="text-sm text-[#141413]/60 leading-relaxed ml-7">
              Once connected, ask your AI to <span className="italic font-headline text-[#141413]">"Witness the current flow"</span>. 
              The synapse will appear instantly on your Nastenka Dashboard.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-[#141413]/5 flex justify-between items-center">
          <span className="text-[9px] uppercase tracking-widest text-[#141413]/30 font-medium">Protocol v1.0 • White Nights Edition</span>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#141413] text-[#faf9f5] rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-[#141413]/90 transition-all"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupModal;
