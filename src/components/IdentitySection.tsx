import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, GraduationCap, CheckCircle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { EDUCATION } from '../data/education';

interface IdentitySectionProps {
  onOpenAI: (initialPrompt?: string) => void;
}

export const IdentitySection: React.FC<IdentitySectionProps> = ({ onOpenAI }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [executedCommand, setExecutedCommand] = useState('identify Rahul');
  const [cliHistory, setCliHistory] = useState<string[]>([
    'System initialized in diagnostic mode.',
    '> identify Rahul',
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === 'clear') {
      setCliHistory(['> clear']);
      setTerminalInput('');
      return;
    }

    if (cmd.toLowerCase().includes('ask') || cmd.toLowerCase().includes('rai')) {
      onOpenAI(cmd);
      setTerminalInput('');
      return;
    }

    setExecutedCommand(cmd);
    setCliHistory(prev => [...prev, `> ${cmd}`]);
    setTerminalInput('');
  };

  const handleQuickCommand = (cmd: string) => {
    setExecutedCommand(cmd);
    setCliHistory(prev => [...prev, `> ${cmd}`]);
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest">
          01 //
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
          IDENTITY
        </h2>
        <div className="flex-1 h-[1px] bg-white/10 ml-4" />
      </div>

      {/* Terminal Container */}
      <div className="rounded-xl border border-white/15 bg-[#080A0F] shadow-2xl overflow-hidden font-mono">
        {/* Terminal Header Bar */}
        <div className="bg-[#0D1017] px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
            </div>
            <span className="text-neutral-400 text-[11px] ml-2">identity_shell.sh — bash</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>SESSION_AUTH: VERIFIED</span>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Historical command log */}
          <div className="space-y-1 text-xs text-neutral-400 select-none pb-2 border-b border-white/5">
            {cliHistory.slice(-3).map((line, idx) => (
              <div key={idx} className="leading-relaxed">{line}</div>
            ))}
          </div>

          {/* Active Terminal Prompt Reveal */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm sm:text-base text-cyan-300 font-semibold">
              <span className="text-neutral-400 select-none">&gt;</span>
              <span>identify Rahul</span>
              <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1 inline-block" />
            </div>

            {/* Factual reveal output */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-4 border-l-2 border-cyan-500/40 space-y-4 text-sm sm:text-base text-neutral-200 font-sans"
            >
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                {PROFILE.bioTerminal}
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {PROFILE.detailedBio}
              </p>
            </motion.div>
          </div>

          {/* Education & Academic Credentials */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 font-mono">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC FOUNDATION & COMPUTER SCIENCE DEGREE</span>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 font-mono text-xs sm:text-sm space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-white font-semibold">{EDUCATION[0].degree} — {EDUCATION[0].major}</span>
                <span className="text-cyan-400 text-xs px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">{EDUCATION[0].year}</span>
              </div>
              <div className="text-neutral-400 text-xs">
                Institution: {EDUCATION[0].institution}
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[11px]">
                {EDUCATION[0].focusAreas.map((area, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-white/[0.04] text-neutral-300 border border-white/5">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick interactive commands */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-neutral-400 text-[11px]">RUN TELEMETRY:</span>
              <button
                onClick={() => handleQuickCommand('identify Rahul')}
                className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.03] hover:border-cyan-500/40 text-neutral-300 hover:text-cyan-300 transition-colors text-xs cursor-pointer"
              >
                &gt; identity
              </button>
              <button
                onClick={() => onOpenAI('Summarize Rahul in 30 seconds.')}
                className="px-2.5 py-1 rounded border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 transition-colors text-xs cursor-pointer flex items-center gap-1"
              >
                &gt; recruiter-brief
              </button>
              <button
                onClick={() => onOpenAI('What is Rahul\'s backend experience?')}
                className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.03] hover:border-cyan-500/40 text-neutral-300 hover:text-cyan-300 transition-colors text-xs cursor-pointer"
              >
                &gt; backend-audit
              </button>
            </div>

            {/* Interactive command input */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type command or ask R//AI..."
                  className="w-full bg-[#050608] border border-white/15 rounded px-2.5 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <button
                type="submit"
                aria-label="Execute command"
                className="p-1.5 rounded bg-white/[0.06] hover:bg-cyan-500 hover:text-black text-neutral-300 transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
