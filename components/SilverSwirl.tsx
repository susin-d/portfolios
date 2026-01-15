// Author: Susindran
// OS support: Web
// Description: WebGL-based Silver Swirl background effect. Production optimized.

import React, { useEffect, useRef } from 'react';

export const SilverSwirl: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Optimization: Disable unnecessary buffers
    const gl = canvas.getContext('webgl', { 
      alpha: false, 
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: "high-performance"
    });

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader: Simple full-screen quad pass-through
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Black/Oil liquid effect logic
    const fragmentShaderSource = `
      #ifdef GL_ES
      precision highp float;
      #endif

      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        // Normalized coordinates (0 to 1) with aspect ratio correction
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        
        // Zoom out slightly to see more of the flow
        uv *= 2.0;

        // Domain Warping Loop
        vec2 p = uv;
        float t = u_time;
        
        // Unroll loop slightly for performance or keep generic
        for(float i = 1.0; i <= 5.0; i++){
            // Warping calculation using FBM (Fractal Brownian Motion) principles
            p.x += 0.6 / i * sin(i * 3.0 * p.y + t + 0.3 * i) + 0.5;
            p.y += 0.6 / i * cos(i * 3.0 * p.x + t + 0.3 * (i + 10.0)) - 0.5;
        }
        
        // --- Color & Lighting Synthesis ---

        // Metallic Specular Highlights
        // We simulate gloss by taking a very sharp power of the wave function.
        float specular = pow(abs(sin(p.x * 4.0 + p.y * 3.0)), 10.0);
        
        // Secondary layer for subtle surface detail
        float surfaceNoise = sin(p.x * 8.0 - p.y * 4.0 + t * 2.0);
        surfaceNoise = smoothstep(0.0, 1.0, surfaceNoise);
        
        // --- Composition ---
        
        // Start with pure black
        vec3 col = vec3(0.0);
        
        // Add the fluid body (Extremely dark grey, barely visible, just for depth)
        float body = 0.5 + 0.5 * sin(p.x * 1.5);
        col = mix(col, vec3(0.05), body);
        
        // Add the sharp ridges (Neutral Grey/White highlights)
        // We reduce intensity and keep it neutral to look like black oil/glossy plastic
        vec3 highlightColor = vec3(0.5); 
        col += highlightColor * specular;
        
        // Add secondary glints - sharper and dimmer
        col += vec3(0.3) * pow(abs(surfaceNoise), 8.0) * 0.4;
        
        // Vignette to focus center
        float dist = length(uv * 0.5);
        col *= 1.0 - smoothstep(0.5, 1.5, dist);

        // Final output
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Shader compilation helper
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up geometry (Full screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;
    let startTime = Date.now();
    
    // Production: Visibility handling to pause when tab is inactive
    let isVisible = true;
    const handleVisibilityChange = () => {
        isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Production: Reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedFactor = prefersReducedMotion ? 0.01 : 0.15;

    const render = () => {
      if (!isVisible) {
          // Skip rendering if hidden, but keep the loop alive to resume
          animationFrameId = requestAnimationFrame(render);
          return;
      }

      // Production: Cap DPR at 2.0 to ensure performance on high-DPI screens
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }

      // Update Uniforms
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      
      const currentTime = (Date.now() - startTime) * 0.001 * speedFactor;
      gl.uniform1f(timeUniformLocation, currentTime);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full block" 
      style={{ touchAction: 'none' }}
    />
  );
};
// --- End of components/SilverSwirl.tsx ---