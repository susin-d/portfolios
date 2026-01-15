// Author: Susindran
// OS support: Web
// Description: Core application logic with cinematic navigation and unified layout structure.

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Hero from './components/Hero';
import Section from './components/Section';
import SkillCloud from './components/SkillCloud';
import ProjectCard from './components/ProjectCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import AboutMe from './components/AboutMe';
import NeuralBackground from './components/NeuralBackground';
import OpeningSequence from './components/OpeningSequence';
import { PROJECTS, EXPERIENCES, ACHIEVEMENTS, SKILLS, SKILL_PROFILES, EDUCATION } from './constants';

const SkillHUD = ({ selectedSkill, onClose }: { selectedSkill: string, onClose: () => void }) => {
  const profile = SKILL_PROFILES[selectedSkill] || {
    description: `Detailed documentation for ${selectedSkill} is currently being indexed. This node represents a core competency in high-level system logic.`,
    metrics: [{ label: "Efficiency", value: 90 }, { label: "Stability", value: 92 }, { label: "Integration", value: 88 }]
  };

  const relatedProjects = PROJECTS.filter(p => p.tags.some(t => t.toLowerCase() === selectedSkill.toLowerCase()));
  const nodeID = useMemo(() => Math.random().toString(16).slice(2, 5).toUpperCase(), [selectedSkill]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
      <div className="absolute inset-0 bg-[#0a0a0c]/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out_forwards]" onClick={onClose}></div>
      <div className="relative w-full max-w-7xl metallic-border bg-[#151518] overflow-hidden flex flex-col max-h-[90vh] reveal revealed border-white/20 shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex justify-between items-start p-8 md:p-12 border-b border-white/10">
          <div>
            <div className="text-[10px] font-mono-tech text-white/40 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Active_Node // {nodeID}
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight">{selectedSkill}</h2>
          </div>
          <button onClick={onClose} className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors border border-white/20 px-4 py-2 hover:bg-white/10 cursor-pointer">Close [ESC]</button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-12 border-r border-white/5 pr-8">
            <div>
              <div className="text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.2em] mb-4">Description</div>
              <p className="text-sm font-light leading-relaxed text-slate-300 font-mono-tech">{profile.description}</p>
            </div>
            <div>
              <div className="text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.2em] mb-4">Performance_Metrics</div>
              <div className="space-y-6">
                {profile.metrics.map((m, i) => (
                  <div key={i}>
                      <div className="flex justify-between text-[10px] font-mono-tech uppercase text-white/70 mb-2"><span>{m.label}</span><span>{m.value}%</span></div>
                      <div className="h-0.5 bg-white/10 w-full overflow-hidden"><div className="h-full bg-white transition-all duration-1000 ease-out" style={{ width: `${m.value}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.2em] mb-6">Linked_Deployments</div>
            {relatedProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {relatedProjects.map((proj, idx) => (
                  <div key={idx} className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                    <h4 className="text-white font-heading font-bold text-xl uppercase mb-2 group-hover:text-blue-200 transition-colors">{proj.title}</h4>
                    <p className="text-slate-400 text-xs font-mono-tech leading-relaxed line-clamp-3">{proj.description[0]}</p>
                  </div>
                ))}
              </div>
            ) : <div className="p-12 border border-dashed border-white/10 text-center text-[10px] font-mono-tech uppercase text-white/30">No direct deployments linked to this node.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ view, toggleArchive, time, isScrolled }: { view: string, toggleArchive: () => void, time: string, isScrolled: boolean }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? 'bg-[#111114]/90 border-b border-white/5 py-4 backdrop-blur-xl' : 'bg-transparent py-8'}`}>
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="flex flex-col group cursor-pointer"
        >
          <span className="text-lg md:text-xl font-heading font-bold tracking-tighter silver-gradient uppercase group-hover:opacity-80 transition-opacity">Susindran</span>
          <span className="text-[10px] font-mono-tech text-white/40 uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">Neural_Architect_v3</span>
        </a>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-mono-tech uppercase tracking-[0.2em] text-slate-400 font-medium">
          {view === 'main' && ['About', 'Deployments', 'Intelligence', 'Architectures', 'Education', 'Metrics'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, link.toLowerCase())}
              className="hover:text-white transition-colors relative group py-2 cursor-pointer"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left" />
            </a>
          ))}
          <div className="flex items-center gap-6 border-l border-white/20 pl-6">
              <a href="https://linkedin.com/in/susin-dran" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer relative group">
                LINKEDIN
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left" />
              </a>
              <a href="https://github.com/susin-d" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer relative group">
                GITHUB
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left" />
              </a>
          </div>
          <button 
            type="button"
            onClick={toggleArchive} 
            className="text-white border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition-all duration-300 ml-4 cursor-pointer"
          >
            {view === 'main' ? 'ARCHIVE_ACCESS' : 'MAIN_SYSTEM'}
          </button>
          <div className="text-white/30 border-l border-white/20 pl-6 animate-pulse">{time}</div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'main' | 'archive'>('main');
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  // Interaction State
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [isHudOpen, setIsHudOpen] = useState(false);
  
  // Intro State
  const [showIntro, setShowIntro] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
          
          document.documentElement.style.setProperty('--scroll', progress.toString());
          
          if (scrollY > 50 && !document.body.classList.contains('scrolled-state')) {
             document.body.classList.add('scrolled-state');
             setIsScrolled(true);
          } else if (scrollY <= 50 && document.body.classList.contains('scrolled-state')) {
             document.body.classList.remove('scrolled-state');
             setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && dotRef.current) {
        // Adjust for center of the cursor (15px is half of 30px width defined in CSS)
        cursorRef.current.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
        dotRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
      }
      
      const target = e.target as HTMLElement;
      if (cursorRef.current && (target.closest('a') || target.closest('button'))) {
          cursorRef.current.classList.add('active');
      } else if (cursorRef.current) {
          cursorRef.current.classList.remove('active');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    handleScroll();

    return () => {
      clearInterval(timer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [view]);

  const toggleArchive = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    // Slight delay to decouple state update from event handler, preventing potential race conditions
    setTimeout(() => {
        setView(prev => prev === 'main' ? 'archive' : 'main');
    }, 10);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  const handleSkillCloudClick = (skill: string) => {
    setActiveSkill(skill);
    setIsHudOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleProjectTagClick = (tag: string) => {
    setActiveSkill(tag);
    setIsHudOpen(false); // Do not open HUD
    scrollToSection('architectures');
  };

  const closeSkillHUD = () => {
    setIsHudOpen(false);
    setActiveSkill(null); // Clear selection to reset visual state
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`min-h-screen font-sans relative ${view === 'archive' ? 'text-white' : 'text-slate-200'}`}>
      <div className="fixed inset-0 z-0 bg-[#050505]">
        <NeuralBackground />
      </div>
      
      {/* Unique Technical Cursor Structure */}
      <div ref={cursorRef} className="custom-cursor hidden md:block">
          <div className="cursor-graphic"></div>
      </div>
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
      
      {showIntro && <OpeningSequence onComplete={() => setShowIntro(false)} />}
      
      {isHudOpen && activeSkill && <SkillHUD selectedSkill={activeSkill} onClose={closeSkillHUD} />}

      <Header view={view} toggleArchive={toggleArchive} time={time} isScrolled={isScrolled} />

      <main className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 pt-40 pb-40">
        {view === 'main' ? (
          <>
            <Hero onArchiveClick={toggleArchive} onExploreClick={() => scrollToSection('intelligence')} />
            
            <AboutMe />

            <Section id="deployments" title="Experience_Log" subtitle="Professional Timeline">
              <div className="max-w-6xl reveal"><ExperienceTimeline items={EXPERIENCES} /></div>
            </Section>

            <Section id="intelligence" title="Systems_Intel" subtitle="Projects & Research">
              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((proj, idx) => (
                  <div key={idx} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                    <ProjectCard {...proj} onTagClick={handleProjectTagClick} />
                  </div>
                ))}
              </div>
            </Section>

            <Section id="architectures" title="Core_Layers" subtitle="Technological Stack">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="reveal"><SkillCloud title="Logic_Engines" skills={SKILLS.languages} onSkillSelect={handleSkillCloudClick} activeSkill={activeSkill} delay={0} /></div>
                <div className="reveal" style={{ transitionDelay: '100ms' }}><SkillCloud title="Neural_Engines" skills={SKILLS.frameworks} onSkillSelect={handleSkillCloudClick} activeSkill={activeSkill} delay={200} /></div>
                <div className="reveal" style={{ transitionDelay: '200ms' }}><SkillCloud title="Architectures" skills={SKILLS.architectures} onSkillSelect={handleSkillCloudClick} activeSkill={activeSkill} delay={400} /></div>
                <div className="reveal" style={{ transitionDelay: '300ms' }}><SkillCloud title="Infrastructure" skills={SKILLS.tools} onSkillSelect={handleSkillCloudClick} activeSkill={activeSkill} delay={600} /></div>
              </div>
            </Section>

            <Section id="education" title="Academic_Log" subtitle="Institutional Background">
              <div className="grid md:grid-cols-2 gap-8">
                {EDUCATION.map((edu, idx) => (
                   <div key={idx} className="metallic-border p-10 hover:bg-white/5 transition-colors group reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                     <div className="flex justify-between items-start mb-6">
                        <div className="text-[9px] font-mono-tech text-white/40 uppercase tracking-[0.2em]">{edu.period}</div>
                        <div className="text-[9px] font-mono-tech text-green-400 uppercase tracking-[0.2em] border border-green-400/30 px-2 py-1 bg-green-400/10">Verified</div>
                     </div>
                     <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-tight mb-2 group-hover:text-blue-200 transition-colors">{edu.institution}</h3>
                     <div className="text-sm font-mono-tech text-slate-300 uppercase tracking-wider mb-6">{edu.degree}</div>
                     <p className="text-slate-400 text-xs font-mono-tech leading-relaxed border-t border-white/10 pt-4">
                        {edu.details}
                     </p>
                   </div>
                ))}
              </div>
            </Section>

            <Section id="metrics" title="Performance_Data" subtitle="Global Rankings">
              <div className="grid md:grid-cols-3 gap-6">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="metallic-border p-8 hover:border-white/30 transition-all group reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <div className="text-[9px] font-mono-tech text-white/40 uppercase tracking-[0.2em] mb-4">{ach.platform}</div>
                    <h4 className="text-white font-heading font-bold text-3xl uppercase mb-2 tracking-tight">{ach.title}</h4>
                    <div className="h-px w-12 bg-white/20 my-4 group-hover:w-full transition-all duration-500"></div>
                    <p className="text-slate-300 text-xs font-mono-tech">{ach.stats}</p>
                  </div>
                ))}
              </div>
            </Section>

            <footer className="relative py-40 mt-40 border-t border-white/10 reveal overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
               
               <div className="container mx-auto px-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-[10px] font-mono-tech text-white/40 uppercase tracking-[0.6em] mb-12">End_Session_Sequence</div>
                    
                    <a href="mailto:susinsusindran@gmail.com" className="group relative block w-full text-center">
                        <h2 className="text-[10vw] md:text-[14vw] leading-[0.8] font-heading font-black tracking-tighter uppercase select-none mix-blend-normal transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                            <span className="block silver-gradient bg-clip-text text-transparent opacity-90 group-hover:opacity-100">Terminate</span>
                            <span className="block text-white/5 group-hover:text-white/20 transition-colors duration-500">& Sync</span>
                        </h2>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                           <div className="bg-white text-black font-mono-tech text-[12px] font-bold uppercase tracking-[0.2em] px-6 py-3">Initialize_Contact</div>
                        </div>
                    </a>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 mt-32 border-t border-white/10 pt-16 w-full max-w-6xl">
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-mono-tech text-white/30 uppercase tracking-[0.2em]">Coordinates</span>
                            <span className="text-sm font-mono-tech text-white/80 uppercase tracking-widest">Chennai, IN</span>
                        </div>
                         <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-mono-tech text-white/30 uppercase tracking-[0.2em]">Social_Link_01</span>
                            <a href="https://linkedin.com/in/susin-dran" target="_blank" className="text-sm font-mono-tech text-white/80 uppercase tracking-widest hover:text-white hover:underline decoration-white/30 underline-offset-8 transition-all">LinkedIn</a>
                        </div>
                         <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-mono-tech text-white/30 uppercase tracking-[0.2em]">Social_Link_02</span>
                            <a href="https://github.com/susin-d" target="_blank" className="text-sm font-mono-tech text-white/80 uppercase tracking-widest hover:text-white hover:underline decoration-white/30 underline-offset-8 transition-all">GitHub</a>
                        </div>
                         <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-mono-tech text-white/30 uppercase tracking-[0.2em]">Status</span>
                            <div className="flex items-center gap-2 text-sm font-mono-tech text-green-400 uppercase tracking-widest">
                                Online <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 text-[9px] font-mono-tech text-white/20 uppercase tracking-[0.2em]">
                        System_Version_3.0 // Last_Update_2025
                    </div>
                  </div>
               </div>
            </footer>
          </>
        ) : (
          <>
            <div className="mb-24 reveal text-center">
              <div className="text-[10px] font-mono-tech text-white/40 uppercase tracking-[0.5em] mb-8">Database_Index_Root</div>
              <h1 className="w-full text-[15vw] leading-[0.8] font-heading font-black tracking-tighter uppercase select-none text-center mix-blend-normal">
                 <span className="block silver-gradient bg-clip-text text-transparent opacity-90 scale-y-110 transform">Archive</span>
              </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
              {PROJECTS && PROJECTS.map((p, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                  <ProjectCard {...p} onTagClick={handleProjectTagClick} />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
// --- End of App.tsx ---