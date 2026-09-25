import React, { useEffect, useState } from 'react';

export const SystemTelemetry: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'CHECKING' | 'CONNECTED' | 'READY'>('CHECKING');

  useEffect(() => {
    let isMounted = true;
    const checkApi = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok && isMounted) {
          setApiStatus('CONNECTED');
        } else if (isMounted) {
          setApiStatus('READY');
        }
      } catch {
        if (isMounted) {
          setApiStatus('READY');
        }
      }
    };

    checkApi();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      id="hero-live-telemetry"
      className="w-full flex items-center justify-between flex-wrap gap-x-6 gap-y-2 py-2 px-3 rounded-lg border border-white/10 bg-[#070B12]/80 backdrop-blur-md font-mono text-[10px] sm:text-[11px] text-neutral-400 select-none"
    >
      {/* Telemetry Item: SYSTEM */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-500 uppercase tracking-wider">SYSTEM</span>
        <div className="flex items-center gap-1.5 text-neutral-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="font-semibold text-emerald-300">ONLINE</span>
        </div>
      </div>

      <div className="hidden sm:block text-white/10 select-none">|</div>

      {/* Telemetry Item: AI CORE */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-500 uppercase tracking-wider">AI CORE</span>
        <div className="flex items-center gap-1.5 text-neutral-200">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)] animate-pulse" />
          <span className="font-semibold text-cyan-300">ACTIVE</span>
        </div>
      </div>

      <div className="hidden sm:block text-white/10 select-none">|</div>

      {/* Telemetry Item: API */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-500 uppercase tracking-wider">API</span>
        <div className="flex items-center gap-1.5 text-neutral-200">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="font-semibold text-cyan-200">
            {apiStatus === 'CHECKING' ? 'PROBING' : apiStatus === 'CONNECTED' ? 'CONNECTED' : 'READY'}
          </span>
        </div>
      </div>

      <div className="hidden sm:block text-white/10 select-none">|</div>

      {/* Telemetry Item: PORTFOLIO */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-500 uppercase tracking-wider">PORTFOLIO</span>
        <div className="flex items-center gap-1.5 text-neutral-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-semibold text-emerald-300">ONLINE</span>
        </div>
      </div>
    </div>
  );
};
