/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: Main App component with sequential layout for Experience, Skills, Projects, and Education.
  Updates: 
  - Refactored Tabbed interface into sequential sections.
  - Applied consistent responsive scaling to all section headers.
  - Added tooltips to Technical Skills with descriptive text.
  - Refactored tracker fetching into useTrackerStats hook.
  - Removed dynamic GitHub fetching; Projects are now hardcoded.
  - Applied responsive scaling to interactive social buttons and subsection titles.
  - Added entrance animation (fade-in + scale) to Tracker Cards.
*/
import React, { useEffect, useState, useRef } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import TrackerCard from './components/TrackerCard';
import Footer from './components/Footer';
import { PROFILE_DATA } from './constants';
import { useTrackerStats } from './hooks/useTrackerStats';
import { useResponsiveStyles } from './hooks/useResponsiveStyles';
import { 
  Github, Linkedin, Mail, Database, Cpu, Code2, Terminal, GraduationCap, 
  Briefcase, Calendar, ChevronRight 
} from './components/Icons';

// Tooltip descriptions for skills
const SKILL_TOOLTIPS: Record<string, string> = {
  "Python": "Versatile language for backend, AI, and scripting.",
  "C": "High-performance low-level system programming.",
  "C++": "Efficient language for competitive programming and systems.",
  "JavaScript": "Core language of the web for interactive UI.",
  "Java": "Robust, object-oriented language for enterprise apps.",
  "TypeScript": "Typed superset of JavaScript for scalable development.",
  "HTML/CSS": "Foundational technologies for web structure and styling.",
  "React": "Library for building component-based user interfaces.",
  "Next.js": "React framework for production-grade SSR applications.",
  "Django": "High-level Python framework for rapid backend development.",
  "Flask": "Lightweight Python micro-framework for web services.",
  "Tailwind CSS": "Utility-first CSS framework for rapid UI design.",
  "Flutter": "UI toolkit for building natively compiled cross-platform apps.",
  "Tkinter": "Standard Python interface to the Tk GUI toolkit.",
  "Docker": "Platform for containerizing and deploying applications.",
  "Git": "Distributed version control system for tracking changes.",
  "GCP": "Suite of cloud computing services by Google.",
  "Vercel": "Platform for frontend frameworks and static sites.",
  "PostgreSQL": "Advanced open-source relational database system.",
  "MongoDB": "NoSQL database for flexible JSON-like data storage.",
  "MySQL": "Popular open-source relational database management system."
};

// Hardcoded Best Projects
const PROJECTS = [
  {
    title: "CogniChat AI",
    techStack: ["Google Gemini API", "Llama 2", "Flask", "LangChain", "React", "Docker", "GCP"],
    description: [
      "Designed an AI-powered conversational system integrating Gemini-2.5-Flash API and Llama 2 for real-time NLP.",
      "Built a robust Flask backend using LangChain for multi-agent orchestration.",
      "Implemented a responsive web interface using Tailwind CSS."
    ]
  },
  {
    title: "Full-Stack University ERP System",
    techStack: ["Next.js", "React", "TypeScript", "Firebase Auth", "Firestore"],
    description: [
      "Architected a modular ERP platform enabling management of student, course, and finance data.",
      "Implemented secure Firebase Authentication with OAuth and real-time CRUD operations.",
      "Optimized state management resulting in a 30% faster load time."
    ]
  }
];

const App: React.FC = () => {
  const { codeChefStats, leetCodeStats, codeforcesStats } = useTrackerStats();
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for responsive scaling
  const nameRef = useRef<HTMLHeadingElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const trackerTitleRef = useRef<HTMLHeadingElement>(null);
  const experienceTitleRef = useRef<HTMLHeadingElement>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const projectsTitleRef = useRef<HTMLHeadingElement>(null);
  const educationTitleRef = useRef<HTMLHeadingElement>(null);

  // Apply responsive styles
  useResponsiveStyles(nameRef, { minSize: 2.5, maxSize: 4.5, minWidth: 640, maxWidth: 1280 });
  useResponsiveStyles(heroTextRef, { minSize: 1, maxSize: 1.25, minWidth: 640, maxWidth: 1280 });
  useResponsiveStyles(socialRef, { minSize: 1, maxSize: 1.15, minWidth: 640, maxWidth: 1280 }); // Scale buttons
  useResponsiveStyles(trackerTitleRef, { minSize: 0.875, maxSize: 1, minWidth: 640, maxWidth: 1280 }); // Scale tracker title
  
  const headerConfig = { minSize: 1.5, maxSize: 2, minWidth: 640, maxWidth: 1280 };
  useResponsiveStyles(experienceTitleRef, headerConfig);
  useResponsiveStyles(skillsTitleRef, headerConfig);
  useResponsiveStyles(projectsTitleRef, headerConfig);
  useResponsiveStyles(educationTitleRef, headerConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Waiting for you... | Susindran D";
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-slate-200 selection:bg-primary/30">
      
      {/* Inject custom keyframes for scale animation */}
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          height: 100%;
        }
        .animate-fade-in-scale > div {
          height: 100%;
        }
      `}</style>

      {/* Opening Curtain Animation */}
      <div className={`fixed inset-0 z-[100] flex flex-col ${isLoaded ? 'pointer-events-none' : ''}`}>
        <div className={`relative w-full h-1/2 bg-[#050505] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${isLoaded ? '-translate-y-full' : 'translate-y-0'}`}>
           <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
        </div>
        <div className={`relative w-full h-1/2 bg-[#050505] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${isLoaded ? 'translate-y-full' : 'translate-y-0'}`}>
           <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
        </div>
      </div>

      <AnimatedBackground />

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
        
        {/* Header / Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <div className="space-y-6 max-w-4xl">
            <h1 
              ref={nameRef}
              className="bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text font-bold tracking-tight text-transparent leading-[1.1] animate-fade-in-up"
            >
              {PROFILE_DATA.name}
            </h1>
            <p 
              ref={heroTextRef}
              className="mx-auto max-w-2xl leading-relaxed text-gray-400"
            >
              Bridging Software Engineering & Data Science. Building scalable, AI-driven solutions for the modern web.
            </p>
            
            <div ref={socialRef} className="flex flex-wrap justify-center gap-4 pt-6">
              <a href={PROFILE_DATA.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium transition-all hover:scale-105 hover:bg-white/10 hover:text-white hover:border-primary/50">
                <Github size={20} /> GitHub
              </a>
              <a href={PROFILE_DATA.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium transition-all hover:scale-105 hover:bg-white/10 hover:text-white hover:border-primary/50">
                <Linkedin size={20} /> LinkedIn
              </a>
              <a href={`mailto:${PROFILE_DATA.email}`} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium transition-all hover:scale-105 hover:bg-white/10 hover:text-white hover:border-primary/50">
                <Mail size={20} /> Email
              </a>
            </div>
          </div>
        </section>

        {/* Live Tracker Section */}
        <section className="mb-24">
          <div className="mb-8 flex items-center gap-4">
             <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
             <h2 ref={trackerTitleRef} className="font-bold uppercase tracking-[0.2em] text-primary-300">Competitive Programming Stats</h2>
             <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            <div className="animate-fade-in-scale" style={{ animationDelay: '0ms' }}>
              <TrackerCard stats={codeChefStats} />
            </div>
            <div className="animate-fade-in-scale" style={{ animationDelay: '150ms' }}>
              <TrackerCard stats={leetCodeStats} />
            </div>
            <div className="animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
              <TrackerCard stats={codeforcesStats} />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-3">
             <Briefcase className="text-primary" size={28} />
             <h2 ref={experienceTitleRef} className="font-bold text-white">Experience</h2>
          </div>
          <div className="relative flex flex-col space-y-12 md:space-y-16">
            {/* Timeline Vertical Line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent md:left-1/2 md:-translate-x-1/2 animate-fade-in"></div>
            
            {PROFILE_DATA.experience.map((exp, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col md:flex-row items-center w-full ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-fade-in-up`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Spacer for alternating layout on desktop */}
                <div className="hidden md:block w-1/2" />
                
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-[3px] border-[#050505] bg-primary shadow-[0_0_15px_rgba(139,92,246,0.6)] z-10 -translate-x-1/2 mt-8 md:mt-0"></div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/5">
                    
                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary-200 transition-colors">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-base text-primary-300 mt-1 font-medium">
                          <Briefcase size={16} />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-mono text-primary-200 shrink-0 w-fit self-start">
                        <Calendar size={12} />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-300 leading-relaxed">
                          <span className="mt-1.5 shrink-0 text-primary/70">
                            <ChevronRight size={16} />
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Decorative bottom gradient line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-3">
             <Cpu className="text-primary" size={28} />
             <h2 ref={skillsTitleRef} className="font-bold text-white">Technical Skills</h2>
          </div>
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {PROFILE_DATA.skills.map((skillSet, idx) => {
              const getIcon = () => {
                const cat = skillSet.category.toLowerCase();
                if (cat.includes('languages')) return <Code2 size={24} />;
                if (cat.includes('frameworks')) return <Cpu size={24} />;
                if (cat.includes('tools')) return <Database size={24} />;
                return <Terminal size={24} />;
              };

              return (
                <div 
                  key={idx} 
                  className="group relative overflow-visible rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                        {getIcon()}
                      </div>
                      <h3 className="text-xl font-bold text-white">{skillSet.category}</h3>
                    </div>
                    
                    <div className="flex flex-1 flex-wrap gap-2">
                      {skillSet.skills.map((skill) => (
                        <div key={skill} className="group/tooltip relative">
                          <span className="block rounded-md bg-white/5 px-3 py-1.5 text-sm font-medium text-primary-100 ring-1 ring-inset ring-white/10 transition-colors hover:bg-primary/20 hover:text-white cursor-default">
                            {skill}
                          </span>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 mb-2 w-max max-w-[200px] -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100 translate-y-2 pointer-events-none z-50 border border-white/10">
                            {SKILL_TOOLTIPS[skill] || "Skill"}
                            <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900 border-b border-r border-white/10"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-3">
            <Database className="text-primary" size={28} />
            <h2 
              ref={projectsTitleRef}
              className="font-bold text-white"
            >
              Featured Projects
            </h2>
          </div>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
            {PROJECTS.map((project, idx) => (
              <div 
                key={idx} 
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-300">{project.title}</h3>
                  </div>
                  <ul className="mb-6 space-y-2 text-sm text-gray-400">
                    {project.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-primary/50"></span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white cursor-default">
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-24">
           <div className="mb-12 flex items-center gap-3">
             <GraduationCap className="text-primary" size={28} />
             <h2 ref={educationTitleRef} className="font-bold text-white">Education</h2>
           </div>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {PROFILE_DATA.education.map((edu, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col justify-center rounded-xl border border-white/10 bg-black/20 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">{edu.degree}</h3>
                <div className="mt-2 text-base text-primary-300">{edu.institution}</div>
                <div className="mt-1 text-sm text-gray-500 font-mono">{edu.duration}</div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default App;
/* --- End of App.tsx --- */