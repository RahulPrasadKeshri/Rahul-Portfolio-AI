import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, ChevronRight, Zap } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface SystemIntroProps {
  onComplete: () => void;
}

const SEQUENCE_STEPS = [
  { text: "INITIALIZING SYSTEM...", delay: 250 },
  { text: "IDENTITY ........ UNKNOWN", delay: 300 },
  { text: "SIGNAL .......... UNAVAILABLE", delay: 300 },
  { text: "LOCATION ........ CLASSIFIED", delay: 300 },
  { text: "STATUS .......... UNREACHABLE", delay: 350 },
  { text: "ACCESS .......... RESTRICTED", delay: 350 },
  { text: "AI CORE ......... ONLINE", delay: 400 },
  { text: "KNOWLEDGE ....... LOADED", delay: 400 },
];

export const SystemIntro: React.FC<SystemIntroProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showEntityDetected, setShowEntityDetected] = useState(false);
  const [showIdentityReveal, setShowIdentityReveal] = useState(false);

  useEffect(() => {
    // Check if user already skipped previously in this session
    const hasSeenIntro = sessionStorage.getItem('rahul_intro_seen');
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    let timeoutId: NodeJS.Timeout;

    if (currentStepIndex < SEQUENCE_STEPS.length) {
      timeoutId = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, SEQUENCE_STEPS[currentStepIndex].delay);
    } else if (!showEntityDetected) {
      timeoutId = setTimeout(() => {
        setShowEntityDetected(true);
      }, 350);
    } else if (!showIdentityReveal) {
      timeoutId = setTimeout(() => {
        setShowIdentityReveal(true);
      }, 500);
    } else {
      timeoutId = setTimeout(() => {
        handleFinish();
      }, 1600);
    }

    return () => clearTimeout(timeoutId);
  }, [currentStepIndex, showEntityDetected, showIdentityReveal]);

  // Keyboard shortcut ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem('rahul_intro_seen', 'true');
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050608] text-neutral-200 font-mono select-none px-6"
    >
      {/* Subtle background coordinate grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top terminal status header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs text-neutral-400 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tracking-widest">R//SYS.BOOT_SEQUENCE</span>
        </div>
        <button
          onClick={handleFinish}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-300 text-xs transition-colors cursor-pointer"
        >
          <span>SKIP INITIALIZATION</span>
          <span className="text-[10px] text-neutral-400 border border-white/10 px-1 rounded">ESC</span>
        </button>
      </div>

      {/* Center cinematic sequence card */}
      <div className="w-full max-w-xl relative">
        {/* Terminal frame */}
        <div className="rounded-lg border border-white/10 bg-[#090A0F]/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle glowing accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Sequence lines */}
          <div className="space-y-2 mb-6 min-h-[190px]">
            {SEQUENCE_STEPS.slice(0, currentStepIndex).map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 text-xs sm:text-sm tracking-wider"
              >
                <span className="text-cyan-400/60 select-none">&gt;</span>
                <span className={step.text.includes('ONLINE') || step.text.includes('LOADED') ? 'text-cyan-300 font-semibold' : 'text-neutral-300'}>
                  {step.text}
                </span>
              </motion.div>
            ))}

            {currentStepIndex < SEQUENCE_STEPS.length && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400">
                <span className="animate-pulse">&gt;</span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
              </div>
            )}
          </div>

          {/* Entity Detected Card */}
          <AnimatePresence>
            {showEntityDetected && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="border-t border-white/10 pt-6 mt-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-widest uppercase mb-3">
                  <Cpu className="w-3.5 h-3.5 animate-pulse" />
                  <span>ENTITY DETECTED</span>
                </div>

                <AnimatePresence>
                  {showIdentityReveal && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                        RAHUL KESHRI
                      </h1>
                      <div className="text-xs sm:text-sm text-neutral-300 tracking-wider flex flex-wrap items-center gap-2">
                        <span className="text-cyan-300">SOFTWARE ENGINEER</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-200">FULL-STACK DEVELOPER</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-cyan-300">GENAI BUILDER</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom indicator */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>ESTABLISHING INTERFACE</span>
            </span>
            <span>BUILD 2026.09</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
