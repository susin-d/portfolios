// Author: Susindran
// OS support: Web
// Description: Cinematic Hero with HUD elements, technical data streams, and character-style professional intro.

import React from 'react';

interface HeroProps {
  onArchiveClick?: () => void;
  onExploreClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onArchiveClick, onExploreClick }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Subtle grid lines */}
         <div className="absolute top-0 left-12 h-full w-px bg-white/5 hidden md:block"></div>
         <div className="absolute top-0 right-12 h-full w-px bg-white/5 hidden md:block"></div>
         <div className="absolute bottom-20 left-0 w-full h-px bg-white/5"></div>
      </div>

      <div className="w-full relative z-10 flex flex-col justify-center">
        <div className="grid md:grid-cols-12 gap-8 mb-10 px-4 md:px-0">
            <div className="md:col-span-8">
                <div className="flex items-center gap-4 mb-2 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
                    <div className="w-2 h-2 bg-white shadow-[0_0_10px_white]"></div>
                    <div className="text-[10px] font-mono-tech text-white/60 uppercase tracking-[0.4em]">Neural_Architect // ID: 0x921A</div>
                </div>
            </div>
        </div>

        {/* Massive Typography Layer - Grok Effect */}
        <div className="relative w-full flex justify-center items-center opacity-0 animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
            {/* 1. Deep Atmospheric Glow (Background Nebula) - Adjusted to be less intrusive */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(200,200,255,0.06)_0%,rgba(0,0,0,0)_70%)] blur-[60px] pointer-events-none"></div>
            
            {/* 2. Text Reflection/Bloom Layer (Behind) */}
            <h1 className="absolute z-0 text-[18vw] leading-[0.8] font-heading font-black tracking-tighter uppercase select-none text-center text-white/10 blur-xl scale-y-110">
                Susindran
            </h1>

            {/* 3. Main Text with Gradient (Top to Bottom fade) */}
            <h1 className="relative z-10 text-[18vw] leading-[0.8] font-heading font-black tracking-tighter uppercase select-none text-center scale-y-110">
                <span className="block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    Susindran
                </span>
            </h1>
        </div>

        <div className="grid md:grid-cols-12 gap-8 mt-12 px-4 md:px-0">
            <div className="md:col-span-6 md:col-start-2">
                <div className="max-w-xl opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                    <p className="text-slate-300 font-mono-tech text-xs md:text-sm uppercase tracking-[0.2em] leading-loose border-l-2 border-white/20 pl-6">
                        Architecting the convergence of <span className="text-white font-bold">autonomous agentic logic</span> and <span className="text-white font-bold">scalable distributed systems</span>.
                    </p>
                </div>

                <div className="flex flex-wrap gap-6 mt-12 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
                    <button 
                        onClick={onExploreClick}
                        className="px-8 py-4 bg-white text-black font-mono-tech text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                        Explore_System
                    </button>
                    <button onClick={onArchiveClick} className="px-8 py-4 border border-white/20 text-white font-mono-tech text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-colors cursor-pointer">
                        Full_Archive
                    </button>
                </div>
            </div>

            <div className="md:col-span-4 md:col-start-9 flex flex-col justify-end items-end opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">
                <div className="text-right space-y-6">
                    <div>
                        <div className="text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.4em] mb-1">Current_Focus</div>
                        <div className="text-lg font-heading font-bold text-white uppercase tracking-tight">Agentic_RAG_Pipelines</div>
                    </div>
                    <div>
                        <div className="text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.4em] mb-1">System_Status</div>
                        <div className="text-lg font-heading font-bold text-green-400 uppercase tracking-tight flex items-center justify-end gap-2">
                            Online <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        </div>
                    </div>
                    <div className="text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.4em] text-right mt-4">
                        LAT: 13.08 N <br/> LON: 80.27 E
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
// --- End of components/Hero.tsx ---