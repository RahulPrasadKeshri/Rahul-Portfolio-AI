import React from 'react';

export const HeroGridFloor: React.FC = () => {
  return (
    <div 
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-[220px] sm:h-[280px] pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Horizon glow line */}
      <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent blur-[1px]" />
      <div className="absolute top-[20%] left-1/4 right-1/4 h-[12px] bg-cyan-500/5 blur-[8px]" />

      {/* 3D Perspective Plane Container */}
      <div 
        className="w-full h-full [perspective:450px]"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 45%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 45%, transparent 80%)',
        }}
      >
        <div 
          className="w-[140%] -ml-[20%] h-[200%] [transform:rotateX(72deg)] [transform-origin:50%_100%] opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.14) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.14) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center bottom',
          }}
        />
      </div>
    </div>
  );
};
