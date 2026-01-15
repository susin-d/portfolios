// Author: Susindran
// OS support: Web
// Description: Redesigned Section component with technical documentation layout and scroll reveal support.

import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="py-32 md:py-40 relative border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-20 reveal">
        <div>
          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-white uppercase mb-2">{title}</h2>
          <div className="flex items-center gap-3">
             <div className="w-8 h-px bg-white/40"></div>
             <span className="text-[10px] font-mono-tech text-white/50 uppercase tracking-[0.4em]">{subtitle}</span>
          </div>
        </div>
        <div className="text-[10px] font-mono-tech text-white/30 uppercase tracking-[0.3em] hidden md:block">
            REF: {id.toUpperCase()}_01
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;