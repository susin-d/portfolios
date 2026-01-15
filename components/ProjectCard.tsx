// Author: Susindran
// OS support: Web
// Description: HUD-styled Project Card component with interactive 3D tilt and scanning effects.
import React, { useRef } from 'react';
import { ProjectItem } from '../types';

interface ProjectCardProps extends ProjectItem {
  onTagClick?: (tag: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description = [], tags = [], onTagClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Subtle tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 60;
    const rotateY = (centerX - x) / 60;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.05) 0%, transparent 80%)`;
      spotlightRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative border border-white/10 bg-[#151518]/50 transition-all duration-300 ease-out hover:border-white/30 hover:bg-[#1a1a1e] h-full flex flex-col p-8 md:p-10"
      style={{ willChange: 'transform' }}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.3em]">Project_ID: {title?.substring(0,3).toUpperCase() || 'UNK'}</div>
        <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-white transition-colors"></div>
      </div>

      <h3 className="text-3xl font-heading font-bold text-white uppercase tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-300">
        {title}
      </h3>
      
      <div className="space-y-4 mb-10 flex-grow">
        {description && description.map((desc, i) => (
          <p key={i} className="text-slate-400 text-xs font-mono-tech leading-relaxed border-l border-white/10 pl-4">
            {desc}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
        {tags && tags.map((tag, i) => (
          <button 
            key={i} 
            onClick={(e) => {
              e.stopPropagation();
              onTagClick?.(tag);
            }}
            className="text-[9px] font-mono-tech uppercase tracking-[0.2em] text-white/50 border border-white/10 px-3 py-1.5 transition-all duration-300 hover:text-white hover:border-white/40 hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95"
          >
            {tag}
          </button>
        ))}
      </div>
      
      <div 
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 ease-out z-0"
      />
    </div>
  );
};

export default ProjectCard;
// --- End of components/ProjectCard.tsx ---