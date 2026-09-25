import React from 'react';
import { Crosshair } from 'lucide-react';

export const LocationHUD: React.FC = () => {
  return (
    <div
      id="hero-location-hud"
      aria-label="Location telemetry: India, Asansol"
      className="inline-flex items-center gap-2.5 font-mono select-none px-3 py-1.5 rounded-md border border-cyan-500/15 bg-[#07111C]/60 backdrop-blur-md text-neutral-300 shadow-sm"
    >
      <div className="relative flex items-center justify-center">
        <Crosshair className="w-3.5 h-3.5 text-cyan-400 shrink-0 opacity-85" />
        <span className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-neutral-200 tracking-widest text-[10px] sm:text-[11px]">
            INDIA / ASANSOL
          </span>
        </div>
        <div className="text-[9px] sm:text-[10px] text-neutral-400/90 font-mono tracking-wider flex items-center gap-2">
          <span className="hidden sm:inline text-neutral-600">·</span>
          <span>
            <span className="text-cyan-400/75">LAT</span> 23.6739
          </span>
          <span>
            <span className="text-cyan-400/75">LONG</span> 86.9524
          </span>
        </div>
      </div>
    </div>
  );
};
