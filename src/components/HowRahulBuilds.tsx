import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Workflow, ChevronRight, CheckCircle2, Terminal, Layers, ArrowRight } from 'lucide-react';

interface WorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  evidence: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "UNDERSTAND",
    subtitle: "Problem Definition & Constraints",
    description: "Analyze core system constraints, data lifecycles, and operational bottlenecks (such as untracked inventory depletion, manual billing reconciliations, or market data stale rates).",
    technologies: ["Domain Modeling", "Telemetry Mapping", "Functional Boundaries"],
    evidence: "Problem context established for SmartTrack & Crypto Pulse systems.",
  },
  {
    step: "02",
    title: "DESIGN",
    subtitle: "Strict Contracts & Architecture",
    description: "Architect end-to-end data schemas and API contracts before touching UI. Define strict TypeScript types, Pydantic request models, and database document structures.",
    technologies: ["TypeScript Interfaces", "Pydantic Schemas", "Firestore Document Design"],
    evidence: "Structured data contracts across React client and FastAPI endpoints.",
  },
  {
    step: "03",
    title: "BUILD",
    subtitle: "Full-Stack Core Implementation",
    description: "Write clean, modular code with strict component lifecycles, custom hooks, and non-blocking asynchronous server endpoints for resilient throughput.",
    technologies: ["React 19", "FastAPI", "Node.js", "Tailwind CSS"],
    evidence: "Reactive inventory catalog and real-time financial ticker rendering loops.",
  },
  {
    step: "04",
    title: "INTEGRATE",
    subtitle: "Applied AI & External Telemetry",
    description: "Ground AI pipelines with structured prompts and strict schema returns. Wire external market APIs and document synchronization with debouncing and graceful fallbacks.",
    technologies: ["Gemini 3 SDK", "CoinGecko API", "Firestore Sync"],
    evidence: "Contextual low-stock reorder insights and crypto market momentum classifications.",
  },
  {
    step: "05",
    title: "TEST",
    subtitle: "Validation & Edge Verification",
    description: "Audit edge conditions, token boundary limits, rate-limit thresholds, and state synchronization glitches to prevent UI inconsistencies.",
    technologies: ["Payload Validation", "Error Boundaries", "Safe Fallbacks"],
    evidence: "Zero hallucination boundaries on R//AI and guarded API proxies.",
  },
  {
    step: "06",
    title: "DEPLOY",
    subtitle: "Continuous Shipping & Health Checks",
    description: "Bundle optimized client-side assets and configure containerized server runtime environments with live telemetry and health endpoints.",
    technologies: ["Vite ESM", "Cloud Run / Vercel", "Health Checks"],
    evidence: "Live verified deployments for portfolio, SmartTrack, and Crypto Pulse.",
  },
];

export const HowRahulBuilds: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest">
          05 //
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
          HOW RAHUL BUILDS
        </h2>
        <div className="flex-1 h-[1px] bg-white/10 ml-4" />
      </div>

      <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-2xl mb-10">
        A disciplined engineering methodology from problem formulation to verified production deployment.
      </p>

      {/* Horizontal / Grid Step Sequence */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 font-mono">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative group ${
                isActive
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'border-white/10 bg-[#080B12] hover:border-white/25 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className={isActive ? 'text-cyan-300 font-bold' : 'text-neutral-500'}>
                  {step.step} //
                </span>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <span className="text-neutral-600 group-hover:text-neutral-400 hidden lg:inline">
                    ➔
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-white tracking-wider">
                {step.title}
              </div>
              <div className="text-[10px] text-neutral-400 mt-1 line-clamp-1">
                {step.subtitle}
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Box for Active Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-[#080C14] font-mono shadow-xl relative overflow-hidden"
        >
          {/* Subtle accent corner glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 blur-[80px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1">
                <span>PHASE {WORKFLOW_STEPS[activeStep].step}</span>
                <span className="text-neutral-600">/</span>
                <span>{WORKFLOW_STEPS[activeStep].subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
                {WORKFLOW_STEPS[activeStep].title}
              </h3>
            </div>

            {/* Step Selector Controls */}
            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed text-xs transition-colors cursor-pointer"
              >
                PREV PHASE
              </button>
              <button
                disabled={activeStep === WORKFLOW_STEPS.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs transition-colors cursor-pointer"
              >
                NEXT PHASE
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Description */}
            <div className="lg:col-span-2 space-y-3">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                ENGINEERING SPECIFICATION
              </div>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                {WORKFLOW_STEPS[activeStep].description}
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-sans">
                  <strong>Practical Evidence:</strong> {WORKFLOW_STEPS[activeStep].evidence}
                </span>
              </div>
            </div>

            {/* Core Technologies for this step */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
              <div className="text-[11px] text-cyan-400 uppercase tracking-wider font-semibold">
                APPLIED TOOLS & PATTERNS
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {WORKFLOW_STEPS[activeStep].technologies.map((tech, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-cyan-400 select-none">›</span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
