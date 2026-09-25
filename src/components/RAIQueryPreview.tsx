import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, ChevronRight, Sparkles } from 'lucide-react';

interface RAIQueryPreviewProps {
  onSelectQuery: (query: string) => void;
}

const EXAMPLE_QUERIES = [
  "Who is Rahul?",
  "Explain SmartTrack",
  "What is Rahul's GenAI experience?",
  "Show backend projects",
  "What technologies does Rahul use?"
];

export const RAIQueryPreview: React.FC<RAIQueryPreviewProps> = ({ onSelectQuery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EXAMPLE_QUERIES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const currentQuery = EXAMPLE_QUERIES[currentIndex];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onSelectQuery(currentQuery)}
        id="rai-query-preview-pill"
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/20 hover:bg-cyan-950/40 text-neutral-300 hover:text-cyan-200 transition-all font-mono text-[11px] cursor-pointer"
        title="Click to ask R//AI this question"
      >
        <Sparkles className="w-3 h-3 text-cyan-400 group-hover:rotate-12 transition-transform shrink-0" />
        <span className="text-[10px] text-cyan-500 font-semibold tracking-wider select-none">
          TRY:
        </span>
        <div className="overflow-hidden h-4 flex items-center min-w-[170px] sm:min-w-[210px] text-left">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentQuery}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="text-cyan-300 font-medium whitespace-nowrap block"
            >
              &gt; {currentQuery}
            </motion.span>
          </AnimatePresence>
        </div>
        <ChevronRight className="w-3 h-3 text-cyan-400/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
      </button>
    </div>
  );
};
