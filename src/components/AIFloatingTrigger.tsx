import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles } from 'lucide-react';

interface AIFloatingTriggerProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const AIFloatingTrigger: React.FC<AIFloatingTriggerProps> = ({ onOpen, isOpen }) => {
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpen}
      id="floating-rai-btn"
      aria-label="Open R//AI Portfolio Intelligence Assistant"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-[#090C15] border border-cyan-500/40 text-white shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all cursor-pointer font-mono group"
    >
      <div className="relative">
        <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
          <Bot className="w-4 h-4" />
        </div>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="text-left">
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-cyan-300">
          <span>R//AI</span>
          <span className="text-[10px] text-neutral-400 font-normal hidden sm:inline">• ASK THE PORTFOLIO</span>
        </div>
      </div>
    </motion.button>
  );
};
