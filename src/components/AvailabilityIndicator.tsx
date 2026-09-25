import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Briefcase, Sparkles, X, ChevronRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/links';

interface AvailabilityIndicatorProps {
  variant?: 'pill' | 'compact';
  onNavigateContact?: () => void;
}

export const AvailabilityIndicator: React.FC<AvailabilityIndicatorProps> = ({
  variant = 'pill',
  onNavigateContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Interactive Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        id="availability-indicator-btn"
        className={`group inline-flex items-center gap-2 cursor-pointer font-mono transition-all ${
          variant === 'pill'
            ? 'px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 text-[10px] sm:text-[11px]'
            : 'text-[10px] text-emerald-400 hover:text-emerald-300'
        }`}
        title="Click to view candidate availability details"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </span>
        <span className="tracking-wider font-semibold whitespace-nowrap">
          OPEN TO OPPORTUNITIES
        </span>
      </button>

      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click listener */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 sm:left-auto sm:right-0 mt-2 z-50 w-72 sm:w-80 rounded-xl border border-emerald-500/30 bg-[#070D14]/95 p-4 shadow-2xl backdrop-blur-xl font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>CANDIDATE AVAILABILITY</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-3 space-y-3 text-[11px]">
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5">
                    CURRENT FOCUS
                  </div>
                  <div className="space-y-1 text-neutral-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">›</span>
                      <span>Software Engineering</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">›</span>
                      <span>Backend Development</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">›</span>
                      <span>Full-Stack Development</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-400">›</span>
                      <span>GenAI / AI Engineering</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    LOCATION & LOGISTICS
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{SOCIAL_LINKS.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">STATUS // ACTIVE</span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (onNavigateContact) {
                        onNavigateContact();
                      } else {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                  >
                    <span>ESTABLISH CONTACT</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
