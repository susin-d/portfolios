/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: Custom hook to apply responsive styles (font-size or scale) based on viewport dimensions
*/
import React, { useEffect } from 'react';

interface ResponsiveConfig {
  minSize: number;     // Minimum value (rem for fontSize, scalar for transform)
  maxSize: number;     // Maximum value
  minWidth?: number;   // Viewport width start (px)
  maxWidth?: number;   // Viewport width end (px)
  property?: 'fontSize' | 'transform'; // Style property to animate
}

export const useResponsiveStyles = (
  ref: React.RefObject<HTMLElement | null>,
  config: ResponsiveConfig
) => {
  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;

      const { 
        minSize, 
        maxSize, 
        minWidth = 640, 
        maxWidth = 1280, 
        property = 'fontSize' 
      } = config;

      const currentWidth = window.innerWidth;
      
      // Calculate interpolation factor clamped between 0 and 1
      let factor = (currentWidth - minWidth) / (maxWidth - minWidth);
      factor = Math.min(Math.max(factor, 0), 1);

      // Linear interpolation
      const value = minSize + factor * (maxSize - minSize);

      if (property === 'fontSize') {
        ref.current.style.fontSize = `${value}rem`;
      } else if (property === 'transform') {
        ref.current.style.transform = `scale(${value})`;
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref, config.minSize, config.maxSize, config.minWidth, config.maxWidth, config.property]);
};
/* --- End of hooks/useResponsiveStyles.ts --- */