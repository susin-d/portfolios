// Author: Susindran
// OS support: Web
// Description: Immersive 3D Neural Network visualization with high-contrast glowing nodes arranged in a sphere. Spinable and clickable interaction.

import React, { useEffect, useRef, useState } from 'react';

const AI_FACTS = [
  "The term 'Artificial Intelligence' was coined at Dartmouth in 1956.",
  "Perceptrons (1958) were the first mathematical models of neural networks.",
  "Google's AlphaGo stunned the world by defeating Lee Sedol in 2016.",
  "The Transformer architecture (2017) revolutionized NLP with 'Attention'.",
  "Deep Blue was the first AI to beat a reigning chess world champion in 1997.",
  "GPT-4 reportedly has over 1.7 trillion parameters.",
  "Geoffrey Hinton, the 'Godfather of AI', popularized backpropagation.",
  "The first chatbot, ELIZA (1966), parodied a Rogerian psychotherapist.",
  "Machine Learning is a subset of AI; Deep Learning is a subset of ML.",
  "Reinforcement Learning is inspired by behavioral psychology (dopamine).",
  "Generative Adversarial Networks (GANs) pit two AIs against each other.",
  "The 'Singularity' is the hypothetical point when AI surpasses human intelligence.",
  "Boston Dynamics' Atlas robot can perform parkour with human-level agility.",
  "Yann LeCun is a pioneer of Convolutional Neural Networks (CNNs).",
  "AI hallucinations occur when LLMs confidently generate false information.",
  "AlexNet (2012) kickstarted the modern Deep Learning revolution.",
  "Self-driving cars use LiDAR and Vision Transformers to navigate.",
  "The Turing Test measures a machine's ability to exhibit intelligent behavior.",
  "AlphaFold solved the 50-year-old protein folding problem in biology.",
  "OpenAI's DALL-E 2 can generate photorealistic images from text.",
  "Few-shot learning allows models to adapt with minimal examples.",
  "Gradient Descent is the optimization algorithm powering most neural nets.",
  "Moore's Law predicts the doubling of transistors every two years.",
  "The Neocognitron (1980) was the precursor to modern CNNs.",
  "LSTM networks solved the vanishing gradient problem in RNNs.",
  "BERT uses bidirectional training to understand context in NLP.",
  "Swarm Intelligence mimics the collective behavior of decentralized systems.",
  "Symbolic AI relies on high-level, human-readable representations.",
  "Connectionism models mental or behavioral phenomena as neural nets.",
  "The Chinese Room argument challenges the idea that computers 'understand'.",
  "Federated Learning trains algorithms across decentralized edge devices.",
  "Neuromorphic computing mimics the neuro-biological architecture of the brain.",
  "Stable Diffusion brings high-quality image generation to consumer GPUs.",
  "Chain-of-Thought prompting improves reasoning in Large Language Models.",
  "Zero-knowledge proofs allow verification without revealing data.",
  "Quantum Machine Learning aims to process data using quantum states.",
  "Vector databases are essential for RAG (Retrieval Augmented Generation).",
  "YOLO (You Only Look Once) revolutionized real-time object detection."
];

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeFact, setActiveFact] = useState<string | null>(null);
  
  // We use a ref to track the active node index to avoid re-renders in the animation loop
  const activeNodeRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuration
    const config = {
      particleCount: 300, 
      connectionDistance: 110, 
      focalLength: 500, 
      baseRotationSpeed: 0.001, 
      dragSensitivity: 0.004, 
      friction: 0.95, 
      baseRadius: 2.0, 
    };

    interface Point3D {
      x: number;
      y: number;
      z: number;
      ox: number; 
      oy: number;
      oz: number;
    }

    let nodes: Point3D[] = [];
    
    // Rotation State (Absolute Angles)
    let rotationY = 0;
    let rotationX = 0;
    
    // Physics State
    let velocityX = 0; 
    let velocityY = config.baseRotationSpeed; 
    
    // Interaction State
    let isDragging = false;
    let startMouseX = 0;
    let startMouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isClickCandidate = false;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      nodes = [];
      const radius = Math.min(width, height) * 0.35; 
      
      for (let i = 0; i < config.particleCount; i++) {
        // Uniform Sphere Surface Distribution
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        nodes.push({ x, y, z, ox: x, oy: y, oz: z });
      }
    };

    const project = (p: Point3D) => {
      const depth = config.focalLength + p.z;
      if (depth <= 0) return null;
      
      const scale = config.focalLength / depth;
      const x2d = p.x * scale + width / 2;
      const y2d = p.y * scale + height / 2;
      return { x: x2d, y: y2d, scale };
    };

    const rotate = (p: Point3D, ay: number, ax: number) => {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      let x1 = p.ox * cosY - p.oz * sinY;
      let z1 = p.ox * sinY + p.oz * cosY;
      
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      let y1 = p.oy * cosX - z1 * sinX;
      let z2 = p.oy * sinX + z1 * cosX;

      p.x = x1;
      p.y = y1;
      p.z = z2;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Physics Update
      if (!isDragging) {
          velocityX *= config.friction;
          velocityY *= config.friction;
          
          if (Math.abs(velocityY) < config.baseRotationSpeed && Math.abs(velocityX) < config.baseRotationSpeed) {
              const targetSpeed = config.baseRotationSpeed;
              velocityY += (targetSpeed - velocityY) * 0.05;
          }
      }
      
      rotationY += velocityY;
      rotationX += velocityX;

      nodes.forEach(node => rotate(node, rotationY, rotationX));

      // Calculate projections
      const projectedNodes = nodes.map((n, index) => ({ ...n, index, proj: project(n) })).filter(n => n.proj !== null) as (Point3D & { index: number, proj: NonNullable<ReturnType<typeof project>> })[];
      
      // Sort for z-indexing (painters algorithm)
      projectedNodes.sort((a, b) => a.proj.scale - b.proj.scale);

      ctx.lineWidth = 0.8;

      // Draw Connections
      for (let i = 0; i < projectedNodes.length; i++) {
        const n1 = projectedNodes[i];
        for (let j = i + 1; j < projectedNodes.length; j++) {
            const n2 = projectedNodes[j];
            
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dz = n1.z - n2.z;
            const distSq = dx*dx + dy*dy + dz*dz;
            const thresholdSq = config.connectionDistance * config.connectionDistance;

            if (distSq < thresholdSq) {
                const dist = Math.sqrt(distSq);
                const opacity = 1 - (dist / config.connectionDistance);
                
                if (opacity > 0) {
                    ctx.beginPath();
                    ctx.moveTo(n1.proj.x, n1.proj.y);
                    ctx.lineTo(n2.proj.x, n2.proj.y);
                    const depthFade = Math.min(n1.proj.scale, n2.proj.scale); 
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * depthFade * 0.5})`;
                    ctx.stroke();
                }
            }
        }
      }

      // Draw Nodes
      projectedNodes.forEach(n => {
         const isActive = activeNodeRef.current === n.index;
         // Sharpness fix: Removed Math.max(0.4) floor to allow depth to handle opacity, but keep it crisp.
         // Actually, to keep it 'sharp' we avoid blur. Opacity is fine.
         const alpha = Math.min(1, Math.max(0.5, n.proj.scale)); 
         
         ctx.beginPath();
         // Make active node slightly larger
         const r = (isActive ? config.baseRadius * 1.8 : config.baseRadius) * n.proj.scale;
         ctx.arc(n.proj.x, n.proj.y, r, 0, Math.PI * 2);
         
         ctx.fillStyle = isActive ? '#ffffff' : `rgba(255, 255, 255, ${alpha})`;
         
         // Sharpness fix: ONLY apply shadowBlur to the ACTIVE node. 
         // All other nodes render as sharp circles.
         if (isActive) {
             ctx.shadowBlur = 20 * n.proj.scale;
             ctx.shadowColor = 'rgba(255, 255, 255, 1)';
         } else {
             ctx.shadowBlur = 0;
         }
         
         ctx.fill();
         ctx.shadowBlur = 0;

         // Draw ring around active node
         if (isActive) {
            ctx.beginPath();
            ctx.arc(n.proj.x, n.proj.y, r * 2.5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * n.proj.scale})`;
            ctx.lineWidth = 1;
            ctx.stroke();
         }
      });

      // Update Popup Position Logic
      if (activeNodeRef.current !== -1 && popupRef.current) {
          const activeNodeIndex = activeNodeRef.current;
          // Find the node in the projected list (since it might be culled if behind camera, though project returns null then)
          // We can also just project the raw node from 'nodes' array directly
          const rawNode = nodes[activeNodeIndex];
          const proj = project(rawNode);
          
          if (proj) {
              popupRef.current.style.opacity = '1';
              popupRef.current.style.transform = `translate3d(${proj.x}px, ${proj.y}px, 0)`;
              // Optional: Hide if z-scale is too small (behind sphere)
              if (proj.scale < 0.5) {
                   popupRef.current.style.opacity = '0.2';
              }
          } else {
              popupRef.current.style.opacity = '0';
          }
      }
      
      // Random firing synapses
      if (Math.random() < 0.05) {
          const target = projectedNodes[Math.floor(Math.random() * projectedNodes.length)];
          if (target && target.proj.scale > 0.5) {
              ctx.beginPath();
              ctx.arc(target.proj.x, target.proj.y, config.baseRadius * target.proj.scale * 3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * target.proj.scale})`;
              // Keep synapses sharp too, or maybe just a little glow
              ctx.shadowBlur = 10;
              ctx.shadowColor = 'white';
              ctx.fill();
              ctx.shadowBlur = 0;
          }
      }

      requestAnimationFrame(draw);
    };

    // --- Interaction Handlers ---

    const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button') || target.closest('input')) return;

        isDragging = true;
        isClickCandidate = true; // Potentially a click
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        velocityX = 0;
        velocityY = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        
        // Check if moved enough to cancel click
        if (Math.abs(e.clientX - startMouseX) > 5 || Math.abs(e.clientY - startMouseY) > 5) {
            isClickCandidate = false;
        }
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        velocityY = deltaX * config.dragSensitivity;
        velocityX = deltaY * config.dragSensitivity;
    };

    const handleMouseUp = (e: MouseEvent) => {
        isDragging = false;
        
        if (isClickCandidate) {
            // It was a click! Perform hit test.
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            let clickedIndex = -1;
            let minDist = 30; // Hit radius
            let maxScale = -1; // To prefer closer nodes

            // Iterate all nodes to find closest match
            nodes.forEach((node, idx) => {
                const proj = project(node);
                if (proj) {
                    const dx = clickX - proj.x;
                    const dy = clickY - proj.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if (dist < minDist) {
                        // Tie breaker: pick the one closer to camera (larger scale)
                        if (proj.scale > maxScale) {
                            maxScale = proj.scale;
                            minDist = dist;
                            clickedIndex = idx;
                        }
                    }
                }
            });

            if (clickedIndex !== -1) {
                // Clicked a node
                // Deterministic fact assignment: use index modulo fact length
                const fact = AI_FACTS[clickedIndex % AI_FACTS.length];
                setActiveFact(fact);
                activeNodeRef.current = clickedIndex;
                
                // Add a little spin impulse to make it feel alive
                velocityY += 0.002;
                velocityX += 0.001;
            } else {
                // Clicked empty space
                setActiveFact(null);
                activeNodeRef.current = -1;
            }
        }
    };

    const handleResize = () => {
       init();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    init();
    const animId = requestAnimationFrame(draw);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-auto z-0 cursor-crosshair" 
        style={{ background: 'transparent' }} 
      />
      {/* HUD Popup for Active Node */}
      <div 
        ref={popupRef}
        className="fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <div className="relative ml-8 -mt-4 w-64">
           {/* Connecting Line */}
           <svg className="absolute top-4 -left-8 w-8 h-[2px] overflow-visible">
              <line x1="0" y1="0" x2="32" y2="0" stroke="white" strokeWidth="1" />
              <circle cx="0" cy="0" r="2" fill="white" />
           </svg>
           
           {/* Content Box */}
           <div className="bg-black/80 backdrop-blur-md border border-white/30 p-4 text-left shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <div className="text-[9px] font-mono-tech text-white/50 uppercase tracking-[0.2em] mb-2 border-b border-white/10 pb-1">
                 System_Intel // Node_{activeNodeRef.current.toString(16).toUpperCase().padStart(3, '0')}
              </div>
              <p className="text-xs font-mono-tech text-white leading-relaxed">
                 {activeFact || "Scanning..."}
              </p>
           </div>
        </div>
      </div>
    </>
  );
};

export default NeuralBackground;
// --- End of components/NeuralBackground.tsx ---