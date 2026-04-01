import React, { useState } from 'react';
import NeuralRays from '../components/NeuralRays';
import WaitlistModal from '../components/WaitlistModal';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="bg-background font-body text-on-background min-h-screen flex items-center justify-center overflow-hidden relative">
      <NeuralRays />
      
      {/* Decorative Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      <main className="relative z-10 w-full max-w-[440px] px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="mb-8 p-4 rounded-full bg-primary-container shadow-[0_0_40px_rgba(10,0,38,1)] ring-1 ring-primary/20">
            <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <h1 className="font-headline italic text-4xl md:text-5xl text-primary text-center tracking-tight leading-tight">
            The Threshold of Witness
          </h1>
          <p className="font-label text-secondary/60 tracking-[0.2em] uppercase text-[10px] mt-4">
            Accessing Archive v.1866
          </p>
        </div>

        <div className="bg-surface-container-highest/60 backdrop-blur-xl border border-outline-variant/15 p-10 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="font-label text-[10px] tracking-widest text-secondary/80 uppercase" htmlFor="email">
                Identity Proxy (Email)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary/40 text-lg group-focus-within:text-primary transition-colors">
                    alternate_email
                  </span>
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full bg-surface-container-lowest border-0 rounded-md py-4 pl-10 pr-4 text-on-surface ring-1 ring-white/5 focus:ring-1 focus:ring-primary/40 focus:bg-surface-container-low transition-all duration-300 placeholder:text-secondary/20 font-body text-sm"
                  placeholder="archivist@intelligence.sovereign"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="font-label text-[10px] tracking-widest text-secondary/80 uppercase" htmlFor="password">
                  Cryptographic Key
                </label>
                <button type="button" className="font-label text-[9px] tracking-wider text-primary/60 hover:text-primary transition-colors uppercase">
                  Lost Access?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary/40 text-lg group-focus-within:text-primary transition-colors">
                    key
                  </span>
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full bg-surface-container-lowest border-0 rounded-md py-4 pl-10 pr-4 text-on-surface ring-1 ring-white/5 focus:ring-1 focus:ring-primary/40 focus:bg-surface-container-low transition-all duration-300 placeholder:text-secondary/20 font-body text-sm"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-md text-on-primary font-label text-[11px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 group hover:opacity-90 transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(208,188,255,0.3)] bg-gradient-to-br from-primary to-on-primary-container"
              >
                Sign In
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
            <p className="font-body text-xs text-secondary/40">
              First encounter? <button onClick={() => setIsWaitlistOpen(true)} className="text-primary/80 hover:text-primary underline underline-offset-4 decoration-primary/20 transition-colors">Apply for Protocol Access</button>
            </p>
          </div>
        </div>

        <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

        <footer className="mt-12 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <button className="font-label text-[9px] tracking-widest text-secondary/40 hover:text-primary transition-colors uppercase">Privacy Protocol</button>
            <button className="font-label text-[9px] tracking-widest text-secondary/40 hover:text-primary transition-colors uppercase">Terminal Terms</button>
          </div>
          <p className="font-label text-[8px] tracking-[0.3em] text-secondary/20 uppercase">
            © 1866 Sovereign Intelligence Archive
          </p>
        </footer>
      </main>
    </div>
  );
};

export default LoginView;
