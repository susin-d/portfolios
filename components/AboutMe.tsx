// Author: Susindran
// OS support: Web
// Description: Detailed narrative section for the AI research portfolio.
import React from 'react';
import Section from './Section';

const AboutMe: React.FC = () => {
  return (
    <Section id="about" title="Neural Narrative" subtitle="Evolution of Intelligence">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="reveal">
          <div className="metallic-border p-12 relative overflow-hidden group border-white/20">
            <div className="hud-corner hud-corner-tl opacity-60"></div>
            <div className="hud-corner hud-corner-br opacity-60"></div>
            <div className="space-y-8 relative z-10">
              <div className="text-[10px] font-mono-tech text-white/50 uppercase tracking-[0.5em]">Origin_Point: 0x00</div>
              <h3 className="text-3xl font-heading font-bold text-white uppercase tracking-tighter">The Genesis</h3>
              <p className="text-slate-200 font-mono-tech text-sm leading-relaxed uppercase tracking-wider">
                Originating from a foundation in computer science, my focus rapidly pivoted from traditional software engineering to the abstract complexities of artificial intelligence. This transition was driven by a fundamental imperative: to understand not just how machines compute, but how they reason, adapt, and operate autonomously in unstructured environments.
              </p>
              <div className="h-px w-1/2 bg-white/20"></div>
              <div className="text-[10px] font-mono-tech text-white/50 uppercase tracking-[0.5em]">Convergence: Advanced Systems</div>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ transitionDelay: '300ms' }}>
          <div className="space-y-10">
            <div className="relative pl-8 border-l border-white/30">
              <div className="absolute top-0 left-0 w-2 h-2 bg-white -translate-x-1/2 shadow-[0_0_10px_white]"></div>
              <h4 className="text-white font-heading font-bold text-2xl uppercase mb-4">The Vision</h4>
              <p className="text-slate-300 font-light text-xl italic leading-relaxed">
                "We are approaching a singularity where intelligence becomes a distributed utility. My mission is to architect the protocols that allow these disparate agentic systems to synchronize, scale, and solve problems beyond human compute capability."
              </p>
            </div>
            <div className="metallic-border p-8 bg-white/5 border-white/20">
              <div className="text-[10px] font-mono-tech text-white/60 uppercase tracking-[0.3em] mb-4">Core_Philosophy</div>
              <div className="flex flex-wrap gap-4">
                <span className="text-[9px] font-mono-tech px-4 py-2 bg-white/10 text-white border border-white/10">Scalability</span>
                <span className="text-[9px] font-mono-tech px-4 py-2 bg-white/10 text-white border border-white/10">Context-Awareness</span>
                <span className="text-[9px] font-mono-tech px-4 py-2 bg-white/10 text-white border border-white/10">Agentic-Autonomy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;