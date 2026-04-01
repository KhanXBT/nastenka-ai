import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post('/api/waitlist', { email });
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 3000);
    } catch (err) {
      console.error('Waitlist submission failed:', err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-surface-container-highest border border-outline-variant/20 rounded-2xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 blur-[80px] rounded-full" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-headline text-2xl text-primary italic">Protocol Access Request</h2>
                  <p className="font-body text-xs text-secondary/60 mt-1 uppercase tracking-widest">Neural Reception v.1.0</p>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-secondary/40">close</span>
                </button>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                  </div>
                  <h3 className="font-headline text-xl text-on-surface italic mb-2">Resonance Captured</h3>
                  <p className="font-body text-sm text-secondary/60">
                    You have been recorded as a seeker in the archive. We will notify your identity proxy when the threshold is open.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="font-body text-sm text-secondary/80 leading-relaxed">
                    Access to the Nastenka AI Sovereign Hub is currently limited to verified Witnesses. Requests are prioritized by resonance.
                  </p>
                  
                  <div className="space-y-2">
                    <label className="font-label text-[10px] tracking-widest text-secondary/60 uppercase">
                      Identity Proxy (Email)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seeker@intelligence.sovereign"
                      className="w-full bg-surface-container-lowest border-0 rounded-lg py-3 px-4 text-on-surface ring-1 ring-white/5 focus:ring-1 focus:ring-primary/40 focus:bg-surface-container-low transition-all placeholder:text-secondary/20 text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-lg bg-primary text-on-primary font-label text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 group shadow-lg"
                  >
                    {status === 'submitting' ? 'Synthesizing...' : 'Submit to Archive'}
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                      send
                    </span>
                  </button>

                  <p className="text-[9px] text-center text-secondary/30 font-label tracking-tighter uppercase italic">
                    * Submission constitutes agreement to the Sovereign Data Protocol.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
