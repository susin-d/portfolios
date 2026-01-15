// Author: Susindran
// OS support: Web
// Description: Cinematic startup animation sequence simulating a system boot process.

import React, { useState, useEffect } from 'react';

interface OpeningSequenceProps {
  onComplete: () => void;
}

const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentText, setCurrentText] = useState("INITIALIZING");
  
  // Random hex codes for "decoding" effect
  const [code, setCode] = useState("0x0000");

  useEffect(() => {
    // Progress simulation
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increments for realism
        const jump = Math.random() > 0.8 ? 5 : 1;
        return Math.min(prev + jump, 100);
      });
      
      setCode("0x" + Math.floor(Math.random()*16777215).toString(16).toUpperCase().padEnd(6, '0'));
    }, 40);

    return () => clearInterval(timer);
  }, []);

  // Text updates based on progress stages
  useEffect(() => {
    if (progress < 30) setCurrentText("LOADING NEURAL KERNEL");
    else if (progress < 60) setCurrentText("ALLOCATING MEMORY BLOCKS");
    else if (progress < 85) setCurrentText("ESTABLISHING SECURE CONNECTION");
    else if (progress < 100) setCurrentText("FINALIZING SYSTEM CONFIG");
    else setCurrentText("ACCESS GRANTED");

    if (progress === 100) {
      // Start exit sequence
      setTimeout(() => setIsExiting(true), 500);
    }
  }, [progress]);

  // Handle unmount after animation
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(onComplete, 1000); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="w-full max-w-md px-8 relative">
        {/* Decorative HUD lines */}
        <div className="absolute top-[-40px] left-8 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-[-40px] right-8 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        
        {/* Header Text */}
        <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col">
                <span className="text-[10px] font-mono-tech text-white/40 uppercase tracking-[0.2em] mb-1">System_Boot_Seq</span>
                <span className="text-sm font-mono-tech text-white uppercase tracking-widest min-w-[200px]">{currentText}</span>
            </div>
            <div className="text-right">
                <span className="text-[10px] font-mono-tech text-white/30 uppercase block tracking-wider">{code}</span>
                <span className="text-2xl font-heading font-bold text-white">{Math.floor(progress)}%</span>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mb-8">
          <div 
            className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer info */}
        <div className="flex justify-between text-[9px] font-mono-tech text-white/30 uppercase tracking-[0.3em]">
           <span>Susindran // Neural_Architect</span>
           <span>V3.0.1</span>
        </div>
      </div>
    </div>
  );
};

export default OpeningSequence;
// --- End of components/OpeningSequence.tsx ---