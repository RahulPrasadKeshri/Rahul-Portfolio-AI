import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Bot, Terminal, ShieldCheck, Sparkles, ChevronRight, Binary } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { NeuralNetworkCore } from './NeuralNetworkCore';
import { HeroGridFloor } from './HeroGridFloor';
import { LocationHUD } from './LocationHUD';
import { AvailabilityIndicator } from './AvailabilityIndicator';
import { RAIQueryPreview } from './RAIQueryPreview';
import { SystemScan } from './SystemScan';
import { SystemTelemetry } from './SystemTelemetry';

interface HeroProps {
  onOpenAI: (prompt?: string) => void;
  onOpenRecruiterMode: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAI, onOpenRecruiterMode }) => {
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="system" 
      className="relative min-h-[94vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle background precision grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Subtle radial ambient gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Midground: Right-side AI Neural Network Core (Desktop) */}
      <div className="hidden lg:block absolute lg:right-[-20px] xl:right-[40px] lg:top-[12%] z-10 opacity-95 select-none">
        <NeuralNetworkCore />
      </div>

      {/* Midground: Scaled Subtle Neural Core on Mobile / Tablet (never obscuring text) */}
      <div className="lg:hidden absolute -right-28 top-20 pointer-events-none z-0 opacity-35 scale-75 select-none">
        <NeuralNetworkCore />
      </div>

      {/* Midground: 3D Futuristic Data-Grid Floor at Bottom */}
      <HeroGridFloor />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Mysterious motto / System Header Tag + Availability Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-cyan-300 uppercase">
              PROTOCOL: {PROFILE.mysteryMotto}
            </span>
          </div>

          <AvailabilityIndicator />
        </motion.div>

        {/* Primary Visual: RAHUL KESHRI */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-sans uppercase">
              RAHUL KESHRI
            </h1>
          </div>

          {/* Role tags */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono text-neutral-300">
            <span className="text-cyan-400 font-medium">Software Engineer</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-100 font-medium">Full-Stack Developer</span>
            <span className="text-neutral-600">/</span>
            <span className="text-cyan-400 font-medium">GenAI Builder</span>
          </div>
        </motion.div>

        {/* Main Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-100 tracking-tight leading-relaxed">
            &ldquo;{PROFILE.primaryStatement}&rdquo;
          </p>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-2xl">
            {PROFILE.secondaryStatement} Combining strict TypeScript architecture, high-throughput FastAPI endpoints, and grounded LLM workflows to build production-grade web systems.
          </p>
        </motion.div>

        {/* Primary & Secondary CTAs + R//AI Query Preview + Scan System */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 space-y-4"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary CTA: ENTER SYSTEM */}
            <button
              onClick={() => handleScrollToSection('about')}
              id="enter-system-hero-btn"
              className="group relative flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-white text-black font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-pointer"
            >
              <span>ENTER SYSTEM</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary CTA: ASK R//AI */}
            <button
              onClick={() => onOpenAI()}
              id="ask-rai-hero-btn"
              className="group relative flex items-center gap-2.5 px-6 py-3.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all hover:border-cyan-400 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>ASK R//AI</span>
              <span className="text-[10px] text-cyan-500/70 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                ASSISTANT
              </span>
            </button>

            {/* Feature 4: System Scan action */}
            <SystemScan onScanComplete={() => handleScrollToSection('about')} />

            {/* Recruiter fast-track button */}
            <button
              onClick={onOpenRecruiterMode}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white font-mono text-xs tracking-wider transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-neutral-400" />
              <span>RECRUITER BRIEF</span>
            </button>
          </div>

          {/* Feature 5: R//AI Rotating Query Preview near ASK R//AI */}
          <div className="flex items-center gap-2 pt-1">
            <RAIQueryPreview onSelectQuery={(q) => onOpenAI(q)} />
          </div>
        </motion.div>

        {/* Feature 3: Live System Telemetry Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10"
        >
          <SystemTelemetry />
        </motion.div>

        {/* Live system status badge cluster */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs"
        >
          {PROFILE.keyStats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-[10px] text-neutral-400 tracking-wider">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-200">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Location Status HUD — Technical Geographical Marker at Bottom-Left */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex items-center justify-between flex-wrap gap-4"
        >
          <LocationHUD />

          <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-neutral-500 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
            <span>NODE_TELEMETRY // GROUNDED</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
