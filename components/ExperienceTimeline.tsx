// Author: Susindran
// OS support: Web
// Description: Cinematic Timeline for professional experience history.

import React, { useState } from 'react';
import { ExperienceItem } from '../types';

const ExperienceTimeline: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  const [activeIndices, setActiveIndices] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    items.forEach((_, i) => initial[i] = 0);
    return initial;
  });

  const setPoint = (itemIndex: number, pointIndex: number) => {
    setActiveIndices(prev => ({ ...prev, [itemIndex]: pointIndex }));
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-24 relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
      
      {items.map((item, idx) => (
        <div key={idx} className="relative pl-0 md:pl-12 group">
           <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-black border border-white/60 rotate-45 hidden md:block group-hover:bg-white transition-colors"></div>
           
           <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3">
                  <div className="text-[10px] font-mono-tech text-white/40 uppercase tracking-[0.3em] mb-2">{item.period}</div>
                  <h3 className="text-4xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-2">{item.role}</h3>
                  <div className="text-xl font-light text-slate-300 font-heading uppercase">{item.company}</div>
                  
                  <div className="mt-8 flex flex-col gap-2">
                    {item.points.map((_, pIdx) => (
                        <button 
                            key={pIdx}
                            onClick={() => setPoint(idx, pIdx)}
                            className={`text-left text-[10px] font-mono-tech uppercase tracking-[0.2em] py-2 pl-4 border-l-2 transition-all ${
                                activeIndices[idx] === pIdx 
                                ? 'border-white text-white' 
                                : 'border-white/10 text-white/30 hover:text-white/70 hover:border-white/30'
                            }`}
                        >
                            Log_Entry_0{pIdx + 1}
                        </button>
                    ))}
                  </div>
              </div>

              <div className="lg:w-2/3">
                 <div className="metallic-border p-8 md:p-12 min-h-[200px] flex items-center relative overflow-hidden group-hover:border-white/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H10V1H1V10H0V0Z" fill="white"/>
                            <path d="M30 0H40V10H39V1H30V0Z" fill="white"/>
                            <path d="M40 40H30V39H39V30H40V40Z" fill="white"/>
                            <path d="M10 40H0V30H1V39H10V40Z" fill="white"/>
                        </svg>
                    </div>
                    <p className="text-lg md:text-xl text-slate-200 font-light leading-relaxed font-sans animate-[fadeIn_0.5s_ease-out]">
                        {item.points[activeIndices[idx]]}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;