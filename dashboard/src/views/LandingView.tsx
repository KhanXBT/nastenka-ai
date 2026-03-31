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
}

const LandingView: React.FC<LandingViewProps> = ({ onEnter }) => {
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
            <div className="relative w-10 h-10 md:w-11 md:h-11 group cursor-pointer">
              <svg viewBox="0 0 44 44" className="w-full h-full" fill="none">
                <circle cx="22" cy="22" r="21" stroke="#141413" strokeWidth="1" opacity="0.15" />
                <text 
                  x="22" 
                  y="30" 
                  textAnchor="middle" 
                  fontFamily="Newsreader, serif" 
                  fontStyle="italic" 
                  fontSize="26" 
                  fill="#141413"
                >
                  N
                </text>
              </svg>
              <div className="absolute inset-0 rounded-full bg-[#141413]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-headline italic text-lg md:text-xl tracking-tight text-[#141413]">Nastenka</span>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <span className="bg-[#141413] text-[#faf9f5] px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] font-semibold rounded-sm">
              BETA
            </span>
            <a 
              href="https://github.com/KhanXBT/nastenka-ai" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:block text-sm text-[#141413]/50 hover:text-[#141413] transition-colors duration-300"
            >
              GitHub
            </a>
            <button 
              onClick={onEnter}
              className="bg-[#141413] text-[#faf9f5] px-5 py-2.5 rounded-sm text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#141413]/90 transition-all duration-300"
            >
              Enter
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
              The Sovereign Brain
              <span className="block mt-1 md:mt-2">
                <span className="text-[#d97757]">// Resurrection</span>
              </span>
              <span className="block text-[#d97757]">of Context</span>
            </h1>

            <p className="font-body text-base md:text-lg text-[#141413]/60 max-w-[580px] leading-relaxed">
              A persistent, encrypted cognitive layer that bridges interaction contexts across 
              <span className="font-headline italic text-[#141413]/80"> Claude</span>, 
              <span className="font-headline italic text-[#141413]/80"> ChatGPT</span>, and 
              <span className="font-headline italic text-[#141413]/80"> Gemini</span>. 
              Your memory, finally sovereign—stored in a local SQLite brain.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 pt-4">
              <a 
                href="https://github.com/KhanXBT/nastenka-ai" 
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#141413] text-[#faf9f5] rounded-sm text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#141413]/90 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Explore on GitHub
              </a>

              <button 
                onClick={() => setIsSetupOpen(true)}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#141413]/20 text-[#141413] rounded-sm text-xs uppercase tracking-[0.15em] font-medium hover:border-[#141413]/40 hover:bg-[#141413]/[0.02] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                How to Setup MCP
              </button>
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
                <h3 className="font-headline italic text-xl md:text-2xl text-[#141413]">Unified Memory</h3>
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
                <h3 className="font-headline italic text-xl md:text-2xl text-[#141413]">Local Sovereignty</h3>
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
                <h3 className="font-headline italic text-xl md:text-2xl text-[#141413]">MCP Powered</h3>
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
                Stop losing context when switching between AI platforms. Nastenka maintains 
                your conversation history in a unified, queryable format that any LLM can access. 
                <span className="font-headline italic text-[#141413]/75"> Your context is your power</span>—reclaim it.
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
                Your Memory, <span className="text-[#d97757]">Your Rules</span>
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
              <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                <circle cx="16" cy="16" r="15" stroke="#141413" strokeWidth="0.75" opacity="0.15" />
                <text 
                  x="16" 
                  y="22" 
                  textAnchor="middle" 
                  fontFamily="Newsreader, serif" 
                  fontStyle="italic" 
                  fontSize="19" 
                  fill="#141413"
                  opacity="0.5"
                >
                  N
                </text>
              </svg>
              <span className="font-headline italic text-sm text-[#141413]/40">Nastenka AI</span>
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
