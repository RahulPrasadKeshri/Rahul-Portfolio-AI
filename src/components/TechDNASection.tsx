import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal, Database, Code2, Layout, Wrench, Sparkles } from 'lucide-react';
import { TECH_DNA } from '../data/skills';
import { TechCluster } from '../types';
import { TechDNAGraph } from './TechDNAGraph';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  LANGUAGES: <Code2 className="w-4 h-4 text-cyan-400" />,
  FRONTEND: <Layout className="w-4 h-4 text-indigo-400" />,
  BACKEND: <Terminal className="w-4 h-4 text-emerald-400" />,
  DATABASE: <Database className="w-4 h-4 text-yellow-400" />,
  AI: <Sparkles className="w-4 h-4 text-cyan-300" />,
  TOOLS: <Wrench className="w-4 h-4 text-purple-400" />,
};

interface TechDNASectionProps {
  onOpenAI: (prompt?: string) => void;
}

export const TechDNASection: React.FC<TechDNASectionProps> = ({ onOpenAI }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; context: string; level: string } | null>(null);

  const categories = ['ALL', ...TECH_DNA.map((c) => c.category)];

  const filteredClusters = activeCategory === 'ALL'
    ? TECH_DNA
    : TECH_DNA.filter((c) => c.category === activeCategory);

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest">
          04 //
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
          TECH DNA
        </h2>
        <div className="flex-1 h-[1px] bg-white/10 ml-4" />
      </div>

      {/* Feature 6: Visual Technical DNA Layer */}
      <TechDNAGraph />

      {/* Intro micro-copy */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs text-neutral-400">
        <p className="max-w-xl">
          Deterministic technical competencies. Organized by architecture domain without arbitrary percentage bars.
        </p>

        {/* Category switcher tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-white/10 bg-[#090A0F]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Technology Clusters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClusters.map((cluster) => (
          <div
            key={cluster.category}
            className="rounded-xl border border-white/15 bg-[#080A0F] p-5 font-mono flex flex-col justify-between hover:border-cyan-500/40 transition-colors group"
          >
            <div>
              {/* Cluster Title */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  {CATEGORY_ICONS[cluster.category]}
                  <span className="text-xs font-semibold text-white tracking-wider">
                    {cluster.category}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">
                  {cluster.skills.length} MODULES
                </span>
              </div>

              {/* Skills items list */}
              <div className="mt-4 space-y-2.5">
                {cluster.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="p-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-cyan-950/20 hover:border-cyan-500/30 transition-all cursor-default"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-200 group-hover:text-white">
                        {skill.name}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        skill.level === 'Core'
                          ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30'
                          : 'bg-white/[0.04] text-neutral-400'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-neutral-400 font-sans leading-tight">
                      {skill.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom query trigger */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end">
              <button
                onClick={() => onOpenAI(`What technologies does Rahul use for ${cluster.category}?`)}
                className="text-[10px] text-neutral-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                INTERROGATE {cluster.category} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time telemetry inspector bar */}
      <div className="mt-8 rounded-lg border border-white/10 bg-[#07090E] p-4 font-mono text-xs flex flex-wrap items-center justify-between gap-4 text-neutral-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-neutral-400">STATUS:</span>
          <span>
            {hoveredSkill ? (
              <span className="text-cyan-300 font-semibold">
                {hoveredSkill.name} [{hoveredSkill.level}]: {hoveredSkill.context}
              </span>
            ) : (
              <span className="text-neutral-400">Hover over any competency module for architectural application context.</span>
            )}
          </span>
        </div>

        <button
          onClick={() => onOpenAI('Summarize Rahul\'s backend and GenAI capabilities in depth.')}
          className="text-cyan-400 hover:text-white transition-colors cursor-pointer text-[11px] underline"
        >
          GENERATE FULL STACK REPORT
        </button>
      </div>
    </section>
  );
};
