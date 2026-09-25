import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, ShieldCheck, Database } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="system-status-panel" 
      className="w-full border-y border-white/5 bg-[#07080D]/80 backdrop-blur-sm py-2 px-4 sm:px-6 font-mono text-[11px] text-neutral-400 select-none"
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        {/* Left: Core Status Array */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-neutral-400 text-[10px]">SYSTEM STATUS:</span>
            <span className="text-emerald-400 font-semibold tracking-wider">ONLINE</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-neutral-400 text-[10px]">AI CORE:</span>
            <span className="text-cyan-300 font-medium">ONLINE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <Database className="w-3 h-3 text-indigo-400" />
            <span className="text-neutral-400 text-[10px]">KNOWLEDGE BASE:</span>
            <span className="text-indigo-300 font-medium">LOADED</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="text-neutral-400 text-[10px]">PORTFOLIO:</span>
            <span className="text-neutral-200 font-medium">ACCESSIBLE</span>
          </div>
        </div>

        {/* Right: Telemetry metadata */}
        <div className="flex items-center gap-4 text-[10px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-cyan-500/70" />
            <span className="hidden sm:inline">LATENCY:</span>
            <span className="text-neutral-400">18ms</span>
          </div>
          <div className="text-neutral-400">
            <span>{timeString || 'SYSTEM CLOCK'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
