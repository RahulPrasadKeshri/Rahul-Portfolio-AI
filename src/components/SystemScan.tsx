import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Check, X, Shield, ChevronRight } from 'lucide-react';

interface SystemScanProps {
  onScanComplete?: () => void;
}

const SCAN_STEPS = [
  { id: 'identity', label: 'IDENTITY VERIFIED', target: 'about' },
  { id: 'projects', label: 'PROJECTS FOUND (SMARTTRACK & CRYPTO PULSE)', target: 'projects' },
  { id: 'experience', label: 'EXPERIENCE FOUND (BLUESTOCK FINTECH)', target: 'experience' },
  { id: 'stack', label: 'TECH STACK FOUND (REACT, TYPESCRIPT, FASTAPI)', target: 'stack' },
  { id: 'ai', label: 'AI SYSTEM FOUND (R//AI ASSISTANT READY)', target: 'system' },
];

export const SystemScan: React.FC<SystemScanProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [scanFinished, setScanFinished] = useState(false);

  useEffect(() => {
    if (!isScanning) return;

    setCompletedSteps(0);
    setScanFinished(false);

    const stepInterval = 420; // total scan duration ~2.5s
    const timers: NodeJS.Timeout[] = [];

    SCAN_STEPS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCompletedSteps(index + 1);
        if (index === SCAN_STEPS.length - 1) {
          const finalTimer = setTimeout(() => {
            setScanFinished(true);
            const closeTimer = setTimeout(() => {
              handleFinishScan();
            }, 900);
            timers.push(closeTimer);
          }, 400);
          timers.push(finalTimer);
        }
      }, (index + 1) * stepInterval);
      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isScanning]);

  const handleFinishScan = () => {
    setIsScanning(false);
    if (onScanComplete) {
      onScanComplete();
    } else {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSkipOrClose = () => {
    setIsScanning(false);
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Small Action Button near Hero CTAs */}
      <button
        onClick={() => setIsScanning(true)}
        id="scan-system-btn"
        className="group relative flex items-center gap-2 px-3.5 py-3 rounded-lg border border-cyan-500/20 bg-cyan-950/15 hover:bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-wider transition-all hover:border-cyan-400/60 cursor-pointer"
        title="Execute cinematic portfolio system scan"
      >
        <Scan className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
        <span>SCAN SYSTEM</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-ping" />
      </button>

      {/* Cinematic Technical Scan Modal / Overlay */}
      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-[#070B12] p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] font-mono text-xs relative overflow-hidden"
            >
              {/* Scanline radar animation line */}
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 260 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none opacity-40 shadow-[0_0_12px_#22d3ee]"
              />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-cyan-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="font-bold tracking-wider text-white">
                    PORTFOLIO TELEMETRY SCAN
                  </span>
                </div>
                <button
                  onClick={handleSkipOrClose}
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white px-2 py-0.5 rounded border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>SKIP</span>
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Scan Status Banner */}
              <div className="my-5 p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/20 flex items-center justify-between">
                <span className="text-cyan-300 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  {scanFinished ? 'SYSTEM READY' : 'SCANNING PORTFOLIO...'}
                </span>
                <span className="text-neutral-400 text-[10px]">
                  {Math.round((completedSteps / SCAN_STEPS.length) * 100)}% COMPLETE
                </span>
              </div>

              {/* Step Sequence List */}
              <div className="space-y-2.5">
                {SCAN_STEPS.map((step, idx) => {
                  const isDone = completedSteps > idx;
                  const isCurrent = completedSteps === idx;
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: isDone ? 1 : isCurrent ? 0.9 : 0.25 }}
                      className={`flex items-center justify-between p-2 rounded transition-colors ${
                        isDone
                          ? 'bg-cyan-950/25 text-neutral-100 border border-cyan-500/20'
                          : isCurrent
                          ? 'bg-white/[0.02] text-cyan-200 border border-white/10'
                          : 'text-neutral-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                            <Check className="w-3 h-3 text-cyan-400" />
                          </div>
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[9px] text-neutral-500">
                            {idx + 1}
                          </span>
                        )}
                        <span className="tracking-wide text-[11px] font-medium">
                          {step.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono">
                        {isDone ? (
                          <span className="text-emerald-400 font-semibold">VERIFIED</span>
                        ) : isCurrent ? (
                          <span className="text-cyan-400 animate-pulse">PROBING...</span>
                        ) : (
                          <span className="text-neutral-600">PENDING</span>
                        )}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer completion note */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-neutral-500">AUTONOMOUS DISCOVERY PROTOCOL</span>
                {scanFinished ? (
                  <button
                    onClick={handleFinishScan}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>EXPLORE PORTFOLIO</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-cyan-400 animate-pulse">SYNCHRONIZING...</span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
