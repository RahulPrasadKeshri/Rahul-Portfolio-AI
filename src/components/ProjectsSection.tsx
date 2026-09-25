import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Cpu, Layers, ShieldCheck, ChevronRight, X, AlertCircle, Sparkles, Check } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onOpenAI: (prompt?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenAI }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest">
          02 //
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
          SYSTEMS BUILT
        </h2>
        <div className="flex-1 h-[1px] bg-white/10 ml-4" />
      </div>

      <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-2xl mb-10">
        Technical case files of engineered architectures. Designed for real-world telemetry, resilient data state, and applied generative intelligence.
      </p>

      {/* Case Files Technical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => {
          const isFeatured = project.id === 'smarttrack';
          return (
            <div
              key={project.id}
              className={`rounded-xl border ${
                isFeatured 
                  ? 'border-cyan-500/40 bg-gradient-to-b from-[#0B0F19] to-[#07090E] shadow-[0_0_25px_rgba(6,182,212,0.08)]' 
                  : 'border-white/15 bg-[#080A0F]'
              } p-6 flex flex-col justify-between transition-all duration-200 hover:border-cyan-400/50 group relative overflow-hidden`}
            >
              {/* Top Accent line */}
              {isFeatured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              )}

              <div>
                {/* Header Dossier Metadata */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10 text-[11px] font-mono">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {project.codename}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider bg-white/[0.04] text-neutral-300 border border-white/5 uppercase">
                    {project.status}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <div className="mt-5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                      {project.name}
                    </h3>
                    {project.aiCapabilities && project.aiCapabilities.length > 0 && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-950/30 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        <span>AI CORE</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-neutral-400">
                    {project.tagline}
                  </p>
                </div>

                {/* Problem Statement snippet */}
                <div className="mt-5 space-y-2">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    PROBLEM CONTEXT
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed font-sans">
                    {project.problem}
                  </p>
                </div>

                {/* Solution snippet */}
                <div className="mt-4 space-y-2">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    ENGINEERED SOLUTION
                  </div>
                  <p className="text-xs text-neutral-200 line-clamp-3 leading-relaxed font-sans">
                    {project.solution}
                  </p>
                </div>

                {/* AI Features if applicable */}
                {project.aiCapabilities && (
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 font-mono text-[11px]">
                    <div className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      <span>VERIFIED AI CAPABILITIES</span>
                    </div>
                    <ul className="space-y-1 text-neutral-300">
                      {project.aiCapabilities.slice(0, 2).map((cap, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs">
                          <span className="text-cyan-400 select-none">›</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {project.technologies.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-cyan-300 hover:text-white font-medium transition-colors cursor-pointer py-1"
                >
                  <span>CASE FILE // INSPECT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors"
                      title="Inspect Source on GitHub"
                      aria-label={`${project.name} GitHub Repository`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 transition-colors"
                      title="Visit Live Deployment"
                      aria-label={`${project.name} Live Deployment`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case File Deep Inspection Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/20 bg-[#090C14] p-6 sm:p-8 shadow-2xl relative font-sans text-neutral-200"
            >
              {/* Modal close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Case File Header */}
              <div className="space-y-1 font-mono">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-cyan-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>PROJECT // {selectedProject.codename}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 font-semibold">
                    STATUS // COMPLETED & DEPLOYED
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans pt-1">
                  {selectedProject.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* PROBLEM & SOLUTION */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                  <div className="font-mono text-[11px] text-neutral-400 uppercase font-semibold">
                    PROBLEM
                  </div>
                  <p className="text-neutral-300 leading-relaxed font-sans">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                  <div className="font-mono text-[11px] text-cyan-400 uppercase font-semibold">
                    SOLUTION
                  </div>
                  <p className="text-neutral-300 leading-relaxed font-sans">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* ARCHITECTURE */}
              <div className="mt-5 p-4 rounded-xl border border-white/10 bg-white/[0.02] font-mono text-xs space-y-1.5">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  ARCHITECTURE
                </div>
                <div className="text-cyan-300 font-semibold leading-relaxed">
                  {selectedProject.architectureOverview}
                </div>
              </div>

              {/* KEY FEATURES */}
              <div className="mt-5 space-y-2">
                <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  KEY FEATURES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01] text-xs text-neutral-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-mono font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MY CONTRIBUTION */}
              <div className="mt-5 space-y-2">
                <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                  MY CONTRIBUTION
                </div>
                <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-950/10 space-y-2">
                  {selectedProject.contributions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECH STACK */}
              <div className="mt-5 space-y-2">
                <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  TECH STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/10 bg-white/[0.03] text-neutral-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Capabilities if present */}
              {selectedProject.aiCapabilities && (
                <div className="mt-5 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/15 space-y-2 font-mono">
                  <div className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI CAPABILITIES</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {selectedProject.aiCapabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* LINKS & Footer actions */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenAI(`Explain ${selectedProject.name} in technical depth.`);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-950/60 transition-colors cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>ASK R//AI ABOUT THIS SYSTEM</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-400 uppercase mr-1">LINKS:</span>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GITHUB REPO</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
