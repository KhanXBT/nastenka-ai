import React, { useEffect, useRef, useState } from 'react';
import SetupModal from '../components/SetupModal';


interface Ray {
  x: number;
  y: number;
  angle: number;
  length: number;
  speed: number;
  opacity: number;
  isAccent: boolean;
}

interface LandingViewProps {
  onEnter: () => void;
  onTry: () => void;
}

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = React.useState('');
  
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) i = 0; // Loop the typist
    }, 150);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

const LandingView: React.FC<LandingViewProps> = ({ onEnter, onTry }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raysRef = useRef<Ray[]>([]);
  const [isSetupOpen, setIsSetupOpen] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      raysRef.current = [];
      const rayCount = Math.floor((canvas.width * canvas.height) / 35000);
      
      for (let i = 0; i < rayCount; i++) {
        raysRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          angle: Math.random() * Math.PI * 2,
          length: Math.random() * 100 + 30,
          speed: (Math.random() * 0.06 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
          opacity: Math.random() * 0.12 + 0.03,
          isAccent: Math.random() > 0.85
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      raysRef.current.forEach(ray => {
        ray.angle += ray.speed;
        
        const endX = ray.x + Math.cos(ray.angle) * ray.length;
        const endY = ray.y + Math.sin(ray.angle) * ray.length;
        
        const gradient = ctx.createLinearGradient(ray.x, ray.y, endX, endY);
        
        if (ray.isAccent) {
          gradient.addColorStop(0, `rgba(217, 119, 87, 0)`);
          gradient.addColorStop(0.5, `rgba(217, 119, 87, ${ray.opacity})`);
          gradient.addColorStop(1, `rgba(217, 119, 87, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(20, 20, 19, 0)`);
          gradient.addColorStop(0.5, `rgba(20, 20, 19, ${ray.opacity})`);
          gradient.addColorStop(1, `rgba(20, 20, 19, 0)`);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(ray.x, ray.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf9f5] text-[#141413] font-body selection:bg-[#d97757]/20 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0"
      />

      <div className="fixed inset-0 bg-gradient-to-b from-[#faf9f5] via-transparent to-[#faf9f5]/90 pointer-events-none z-[1]" />

      <div className="relative z-10">
        <nav className="flex justify-between items-center px-6 md:px-12 lg:px-16 py-6 md:py-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-11 md:h-11 group cursor-pointer overflow-hidden rounded-full border border-[#141413]/10">
              <img 
                src="/logo.jpg" 
                alt="Nastenka AI Logo" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#141413]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-headline italic text-lg md:text-xl tracking-tight text-[#141413]">Agentic Alpha</span>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <span className="hidden sm:inline-block bg-[#141413] text-[#faf9f5] px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] font-semibold rounded-sm">
              BETA
            </span>
            <button 
                onClick={onTry}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#d97757] text-[#faf9f5] rounded-sm text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-[#d97757]/90 transition-all duration-300 shadow-[0_5px_20px_rgba(217,119,87,0.15)] overflow-hidden"
              >
                <span className="material-symbols-outlined text-xs animate-pulse">bolt</span>
                <span className="inline-block min-w-[140px] text-left">
                  <TypewriterText text="Initialize Agentic Alpha" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
            <button 
              onClick={onEnter}
              className="bg-[#141413] text-[#faf9f5] px-5 py-2.5 rounded-sm text-[10px] uppercase tracking-[0.15em] font-medium hover:bg-[#141413]/90 transition-all duration-300"
            >
              Enter Hub
            </button>
          </div>
        </nav>

        <main className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 lg:pt-36 pb-32 md:pb-40">
          <div className="space-y-10 md:space-y-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-[#d97757]" />
              <span className="text-[#d97757] text-[11px] uppercase tracking-[0.3em] font-medium">Cross-Platform Memory Bridge</span>
            </div>

            <h1 className="font-headline italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9] text-[#141413]">
              Agentic Alpha
              <span className="block mt-1 md:mt-2">
                <span className="text-[#d97757]">// Terminal Velocity</span>
              </span>
              <span className="block text-[#d97757]">Execution</span>
            </h1>

            <p className="font-body text-base md:text-lg text-[#141413]/60 max-w-[580px] leading-relaxed">
              A persistent, encrypted cognitive layer that bridges interaction contexts across 
              <span className="font-headline italic text-[#141413]/80"> Claude</span>, 
              <span className="font-headline italic text-[#141413]/80"> ChatGPT</span>, and 
              <span className="font-headline italic text-[#141413]/80"> Gemini</span>. 
              Your memory, finally sovereign—stored in a local SQLite brain.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
               <span className="text-[10px] uppercase tracking-[0.4em] text-[#141413]/30 font-medium border-l border-[#d97757] pl-4">
                 Sovereign Logic // Multi-Platform Resonance // Filecoin Verified
               </span>

               <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/KhanXBT/nastenka-ai" 
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#141413] text-[#faf9f5] rounded-sm text-[10px] uppercase tracking-[0.15em] font-medium hover:bg-[#141413]/90 transition-all duration-300"
                  >
                    <span>View Repository</span>
                  </a>

                  <button 
                    onClick={() => setIsSetupOpen(true)}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#141413]/20 text-[#141413] rounded-sm text-[10px] uppercase tracking-[0.15em] font-medium hover:border-[#141413]/40 hover:bg-[#141413]/[0.02] transition-all duration-300"
                  >
                    Setup MCP
                  </button>
               </div>
            </div>
          </div>
        </main>

        <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
          <div className="grid md:grid-cols-3 gap-px bg-[#141413]/8">
            <article className="bg-[#faf9f5] p-8 md:p-10 group">
              <div className="space-y-5">
                <div className="w-9 h-9 rounded-sm bg-[#d97757]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#d97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-headline italic text-xl md:text-2xl text-[#141413]">Agentic Orchestration</h3>
                <p className="text-[#141413]/50 text-sm leading-relaxed">
                  Store every conversation, every context, every insight in a single sovereign SQLite database. 
                  Access your complete cognitive history regardless of platform.
                </p>
              </div>
            </article>

            <article className="bg-[#faf9f5] p-8 md:p-10 group">
              <div className="space-y-5">
                <div className="w-9 h-9 rounded-sm bg-[#d97757]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#d97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-headline italic text-xl md:text-2xl text-[#141413]">Founder-First Stack</h3>
                <p className="text-[#141413]/50 text-sm leading-relaxed">
                  Zero cloud dependency. Your brain runs locally, encrypted and owned entirely by you. 
                  No central authority, no data harvesting.
                </p>
              </div>
            </article>

            <article className="bg-[#faf9f5] p-8 md:p-10 group">
              <div className="space-y-5">
                <div className="w-9 h-9 rounded-sm bg-[#d97757]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#d97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-headline italic text-xl md:text-2xl text-[#141413]">Sovereign L1 Bridge</h3>
                <p className="text-[#141413]/50 text-sm leading-relaxed">
                  Built on the Model Context Protocol. Seamlessly connect Claude Desktop, 
                  or any MCP-compatible client to your personal intelligence archive.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-headline italic text-3xl md:text-4xl lg:text-5xl text-[#141413] leading-[1.05] tracking-tight">
                Bridge the Context Gap
              </h2>
              <p className="text-[#141413]/55 text-sm md:text-base leading-relaxed">
                Stop losing velocity when switching between AI platforms. Agentic Alpha maintains 
                your strategic intent in a unified, queryable format. 
                <span className="font-headline italic text-[#141413]/75"> The Vibe is the new Code</span>—ship it.
              </p>
            </div>
            <div className="bg-[#141413] rounded-sm p-8 md:p-10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d97757]/15 rounded-full blur-[80px]" />
              <div className="relative space-y-4">
                <div className="flex items-center gap-2 text-[#faf9f5]/40 text-xs uppercase tracking-[0.2em]">
                  <div className="w-2 h-2 rounded-full bg-[#d97757]" />
                  Architecture
                </div>
                <div className="space-y-3 text-[#faf9f5]/70 text-sm font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-[#d97757]">→</span>
                    <span>Claude ↔ SQLite Bridge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#d97757]">→</span>
                    <span>ChatGPT ↔ Context Sync</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#d97757]">→</span>
                    <span>Gemini ↔ Memory Layer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#d97757]">→</span>
                    <span>Encrypted Local Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-16 pb-32 md:pb-40">
          <div className="relative rounded-sm overflow-hidden bg-[#141413] p-10 md:p-16 lg:p-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d97757]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d97757]/8 rounded-full blur-[80px]" />
            
            <div className="relative space-y-8 text-center">
              <h2 className="font-headline italic text-3xl md:text-4xl lg:text-5xl text-[#faf9f5] tracking-tight leading-[1.05]">
                Agentic Command, <span className="text-[#d97757]">Your Mission</span>
              </h2>
              <p className="text-[#faf9f5]/50 text-sm md:text-base max-w-[500px] mx-auto leading-relaxed">
                Built for those who refuse to let their insights disappear into the void. 
                Every conversation preserved. Every context maintained. 
                <span className="font-headline italic text-[#faf9f5]/70"> Forever accessible.</span>
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <a 
                  href="https://github.com/KhanXBT/nastenka-ai" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#faf9f5] text-[#141413] rounded-sm text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#faf9f5]/90 transition-all duration-300"
                >
                  <span>View Documentation</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="px-6 md:px-12 lg:px-16 py-10 border-t border-[#141413]/8">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#141413]/10 opacity-60">
                <img src="/logo.jpg" alt="Nastenka AI Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-headline italic text-sm text-[#141413]/40">Agentic Alpha</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-[#141413]/35 uppercase tracking-[0.15em]">
              <span>© 2026 Archive</span>
              <span className="w-1 h-1 rounded-full bg-[#141413]/20" />
              <span>MIT License</span>
              <span className="w-1 h-1 rounded-full bg-[#141413]/20" />
              <span className="font-headline italic normal-case tracking-normal">Sovereign Intelligence Architecture</span>
            </div>
          </div>
        </footer>
      </div>

      <SetupModal 
        isOpen={isSetupOpen} 
        onClose={() => setIsSetupOpen(false)} 
      />
    </div>
  );
};

export default LandingView;
