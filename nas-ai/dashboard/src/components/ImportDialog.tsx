import React, { useState } from 'react';
import { archiveService } from '../services/archiveService';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ isOpen, onClose, onImportComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);

    try {
      await archiveService.importChatGPT(file);
      onImportComplete();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Resurrection failed.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative shadow-[0_0_50px_rgba(139,92,246,0.1)] border-primary/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20 animate-pulse">
            <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
          </div>
          <h2 className="text-2xl font-headline italic text-violet-100">Resurrect Context</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-body">Import ChatGPT conversations.json archive</p>
        </div>

        <div className="space-y-6">
          <label className="block w-full cursor-pointer">
            <div className={`p-10 border-2 border-dashed ${isImporting ? 'border-primary' : 'border-outline-variant/30'} rounded-xl bg-surface-container-lowest/50 hover:bg-primary/5 transition-all group text-center`}>
              <input type="file" className="hidden" accept=".json" onChange={handleFileUpload} disabled={isImporting} />
              <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-primary transition-colors block mb-4">
                {isImporting ? 'sync' : 'cloud_upload'}
              </span>
              <p className="text-sm font-body text-slate-300">
                {isImporting ? 'Sythesizing Epistemic Flows...' : 'Drop interactions.json here'}
              </p>
              {!isImporting && <p className="text-[9px] uppercase text-slate-600 mt-2">Maximum Sovereignty Guaranteed</p>}
            </div>
          </label>

          {error && <p className="text-xs text-red-400 font-body text-center">{error}</p>}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-3 text-[10px] font-label text-slate-500">
          <span className="material-symbols-outlined text-sm">security</span>
          <span>1866 Archive Protocol Active</span>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog;
