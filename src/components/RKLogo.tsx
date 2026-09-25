import React from 'react';

interface RKLogoProps {
  className?: string;
  onClick?: () => void;
}

export const RKLogo: React.FC<RKLogoProps> = ({ className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      id="rk-monogram-brand"
      aria-label="Rahul Keshri - Scroll to top"
      className={`group relative flex items-center justify-center cursor-pointer select-none focus:outline-none transition-all duration-300 ${className}`}
    >
      {/* Precision Geometric RK Monogram */}
      <svg
        width="28"
        height="22"
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]"
      >
        {/* Shared / Left Vertical Stem for R */}
        <path
          d="M 4 2.5 L 4 25.5"
          stroke="#F8FAFC"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* 'R' Upper Loop with crisp modern geometric curve */}
        <path
          d="M 4 2.5 L 14 2.5 C 19 2.5 20.5 5.5 20.5 8.5 C 20.5 11.5 19 14.5 14 14.5 L 4 14.5"
          stroke="#F8FAFC"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'R' Diagonal Leg with Cyan Accent Dot/Joint */}
        <path
          d="M 12 14.5 L 19 25.5"
          stroke="#F8FAFC"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Intersecting/Continuous 'K' Upper Branch with subtle Cyan Glow */}
        <path
          d="M 17 12.5 L 29 2.5"
          stroke="#22D3EE"
          strokeWidth="3.2"
          strokeLinecap="round"
          className="transition-colors group-hover:stroke-cyan-300"
        />

        {/* 'K' Lower Branch */}
        <path
          d="M 19.5 15 L 30 25.5"
          stroke="#F8FAFC"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Subtle decorative futuristic junction pip */}
        <circle
          cx="17"
          cy="12.5"
          r="1.4"
          fill="#06B6D4"
          className="animate-pulse"
        />
      </svg>
    </button>
  );
};
