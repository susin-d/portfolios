/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: "Digital Terrain Scan" - A 3D retro-futuristic data landscape loop.
*/
import React, { useEffect, useRef } from 'react';

const DigitalTerrainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let frameCount = 0;

    // Configuration
    const config = {
      gridSize: 40, // Distance between points
      horizon: height * 0.4, // Where the "sky" starts (0.5 is middle)
      speed: 1.5, // Flight speed
      color: '168, 85, 247', // Tailwind Purple-500
      peaks: 60, // Height of the data mountains
    };

    // We don't store particles in a class here because the grid is mathematically generated
    // every frame based on time (Z-axis movement), which is more performant for infinite scrolling.

    const project3D = (x: number, y: number, z: number) => {
      // Simple perspective projection
      const scale = 300 / (300 + z); 
      const x2d = (x * scale) + width / 2;
      const y2d = (y * scale) + config.horizon;
      return { x: x2d, y: y2d, scale };
    };

    const drawScene = () => {
      frameCount += config.speed;
      
      // Clear with a deep purple/black fade for the trail effect
      ctx.fillStyle = '#020205'; // Almost black
      ctx.fillRect(0, 0, width, height);

      // We render a grid of points
      // Z goes from closest (0) to furthest (1000)
      // X goes from left (-width) to right (+width)
      
      const rows = 50; // Depth
      const cols = 60; // Width
      const spacing = 40;

      for (let z = 0; z < rows; z++) {
        for (let x = -cols/2; x < cols/2; x++) {
          
          // 1. Calculate the moving Z position for infinite loop
          // We add frameCount to Z, then modulo to loop it
          const zPos = (z * spacing - (frameCount % spacing)) + 10; // +10 prevents div by zero
          
          // 2. Generate "Terrain" height (Y) using Math.sin/cos
          // We use the absolute grid coordinates to make the terrain "stationary" as we fly over
          const absoluteZ = Math.floor((frameCount + zPos) / spacing); 
          const yNoise = Math.sin(x * 0.3) * Math.cos(absoluteZ * 0.2) * config.peaks;
          
          // Lower the plane slightly so we fly "over" it
          const yPos = yNoise + 150; 

          // 3. Project to 2D screen space
          const p = project3D(x * spacing, yPos, zPos);

          // 4. Draw
          // Opacity fades as Z increases (Fog effect)
          const alpha = 1 - (zPos / (rows * spacing));
          
          if (alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
            
            // Core style
            ctx.fillStyle = `rgba(${config.color}, ${alpha})`;
            ctx.fill();

            // Optional: Draw connecting lines for the "Grid" look (more expensive)
            // But just points look cleaner and more like "Data Dust"
          }
        }
      }

      // Add a top "Glow" to mimic a sun or core intelligence at the horizon
      const gradient = ctx.createRadialGradient(width/2, config.horizon, 10, width/2, config.horizon, 400);
      gradient.addColorStop(0, `rgba(${config.color}, 0.3)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(drawScene);
    };

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      config.horizon = height * 0.5;
    };

    init();
    drawScene();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-black" />;
};

export default DigitalTerrainBackground;