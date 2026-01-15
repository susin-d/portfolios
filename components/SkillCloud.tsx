// Author: Susindran
// OS support: Web
// Description: Interactive HUD-styled data grid for technical skills with cinematic staggered entry animations.

import React, { useState, useEffect, useRef } from 'react';

interface SkillCloudProps {
  title: string;
  skills: string[];
  onSkillSelect?: (skill: string) => void;
  activeSkill?: string | null;
  delay?: number;
}

const SkillCloud: React.FC<SkillCloudProps> = ({ title, skills, onSkillSelect, activeSkill, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Determine filtering state
  const hasActiveSkill = activeSkill ? skills.includes(activeSkill) : false;
  // If a skill is active globally, but NOT in this cloud, we dim this cloud.
  const isCloudDimmed = activeSkill && !hasActiveSkill;

  return (
    <div 
      ref={containerRef} 
      className={`metallic-border p-10 group bg-[#080808] transition-all duration-700 ease-out overflow-hidden relative border-white/20 hover:border-white/40 
        ${isCloudDimmed ? 'opacity-30 blur-[1px] grayscale' : 'opacity-100'} 
        ${hasActiveSkill ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/20' : ''}`
      }
    >
      <div className="hud-corner hud-corner-tl opacity-50"></div>
      
      <div className="flex items-center gap-3 mb-10">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${hasActiveSkill ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/40 group-hover:bg-white'} animate-pulse`}></div>
          <h3 className={`text-[10px] font-mono-tech uppercase tracking-[0.4em] font-bold transition-colors ${hasActiveSkill ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>{title}</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => {
          const isSelected = activeSkill === skill;
          // Fade if there is an active skill (globally) and this isn't it.
          const isFaded = activeSkill && !isSelected;

          return (
            <button 
              key={i} 
              onClick={() => onSkillSelect?.(skill)}
              style={{ transitionDelay: isVisible ? `${delay + (i * 50)}ms` : '0ms' }}
              className={`group/skill relative text-[11px] font-mono-tech border px-4 py-2 cursor-none flex items-center gap-2 overflow-hidden transition-all duration-500 ${
                isVisible ? 'translate-y-0' : 'opacity-0'
              } ${
                isSelected 
                ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.5)] ring-1 ring-white/50 opacity-100 scale-105 z-10' 
                : isFaded 
                    ? 'border-white/5 bg-transparent text-white/20 opacity-30 blur-[1px] scale-95' 
                    : 'border-white/10 bg-transparent opacity-100 hover:border-white/80 hover:bg-white/10 hover:scale-105 hover:text-white'
              }`}
            >
              {/* Pulse effect overlay for selected button */}
              {isSelected && <div className="absolute inset-0 bg-white/40 animate-pulse pointer-events-none mix-blend-overlay"></div>}

              <span className={`w-1 h-1 transition-colors ${isSelected ? 'bg-black shadow-[0_0_4px_black]' : 'bg-white/20 group-hover/skill:bg-white'}`}></span>
              <span className={`${isSelected ? 'text-black font-bold' : 'text-slate-300 group-hover/skill:text-white'} transition-colors`}>{skill}</span>
              
              {!isSelected && !isFaded && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover/skill:scale-x-100 transition-transform duration-500 origin-left"></div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-12 text-[8px] font-mono-tech text-white/30 uppercase tracking-[0.2em]">
        System_Ready // {skills.length}_Nodes
      </div>
    </div>
  );
};

export default SkillCloud;
// --- End of components/SkillCloud.tsx ---