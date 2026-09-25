import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Layout, Database, Code2, Cpu } from 'lucide-react';

interface TechNode {
  id: string;
  label: string;
  category: 'AI' | 'BACKEND' | 'FRONTEND' | 'DATABASE';
  connectedTo: string[];
  relatedProjects: string[];
  role: 'cluster' | 'tech';
}

const TECH_NODES: TechNode[] = [
  // Clusters (Pillars)
  { id: 'c-ai', label: 'APPLIED AI', category: 'AI', connectedTo: ['gemini', 'genai', 'rag'], relatedProjects: ['SmartTrack'], role: 'cluster' },
  { id: 'c-backend', label: 'BACKEND', category: 'BACKEND', connectedTo: ['fastapi', 'nodejs', 'rest'], relatedProjects: ['SmartTrack'], role: 'cluster' },
  { id: 'c-frontend', label: 'FRONTEND', category: 'FRONTEND', connectedTo: ['react', 'typescript', 'tailwind'], relatedProjects: ['SmartTrack', 'Crypto Pulse'], role: 'cluster' },
  { id: 'c-database', label: 'DATABASE', category: 'DATABASE', connectedTo: ['firestore', 'postgres', 'mongo'], relatedProjects: ['SmartTrack'], role: 'cluster' },

  // AI Technologies
  { id: 'gemini', label: 'Gemini API', category: 'AI', connectedTo: ['c-ai', 'genai', 'rag'], relatedProjects: ['SmartTrack'], role: 'tech' },
  { id: 'genai', label: 'Generative AI', category: 'AI', connectedTo: ['c-ai', 'gemini', 'rag'], relatedProjects: ['SmartTrack'], role: 'tech' },
  { id: 'rag', label: 'RAG Systems', category: 'AI', connectedTo: ['c-ai', 'gemini'], relatedProjects: ['SmartTrack'], role: 'tech' },

  // Backend Technologies
  { id: 'fastapi', label: 'FastAPI', category: 'BACKEND', connectedTo: ['c-backend', 'rest', 'nodejs'], relatedProjects: ['SmartTrack'], role: 'tech' },
  { id: 'nodejs', label: 'Node.js', category: 'BACKEND', connectedTo: ['c-backend', 'rest', 'typescript'], relatedProjects: ['SmartTrack'], role: 'tech' },
  { id: 'rest', label: 'REST APIs', category: 'BACKEND', connectedTo: ['c-backend', 'fastapi', 'nodejs'], relatedProjects: ['SmartTrack', 'Crypto Pulse'], role: 'tech' },

  // Frontend Technologies
  { id: 'react', label: 'React.js', category: 'FRONTEND', connectedTo: ['c-frontend', 'typescript', 'tailwind'], relatedProjects: ['SmartTrack', 'Crypto Pulse'], role: 'tech' },
  { id: 'typescript', label: 'TypeScript', category: 'FRONTEND', connectedTo: ['c-frontend', 'react', 'nodejs'], relatedProjects: ['SmartTrack', 'Crypto Pulse'], role: 'tech' },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'FRONTEND', connectedTo: ['c-frontend', 'react'], relatedProjects: ['SmartTrack', 'Crypto Pulse'], role: 'tech' },

  // Database Technologies
  { id: 'firestore', label: 'Firebase / Firestore', category: 'DATABASE', connectedTo: ['c-database', 'postgres'], relatedProjects: ['SmartTrack'], role: 'tech' },
  { id: 'postgres', label: 'PostgreSQL', category: 'DATABASE', connectedTo: ['c-database', 'mongo'], relatedProjects: [], role: 'tech' },
  { id: 'mongo', label: 'MongoDB', category: 'DATABASE', connectedTo: ['c-database', 'postgres'], relatedProjects: [], role: 'tech' },
];

const CATEGORY_COLORS: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  AI: { border: 'border-cyan-500/40', bg: 'bg-cyan-950/30', text: 'text-cyan-300', dot: 'bg-cyan-400' },
  BACKEND: { border: 'border-emerald-500/40', bg: 'bg-emerald-950/30', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  FRONTEND: { border: 'border-indigo-500/40', bg: 'bg-indigo-950/30', text: 'text-indigo-300', dot: 'bg-indigo-400' },
  DATABASE: { border: 'border-amber-500/40', bg: 'bg-amber-950/30', text: 'text-amber-300', dot: 'bg-amber-400' },
};

export const TechDNAGraph: React.FC = () => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeNode = TECH_NODES.find((n) => n.id === hoveredNodeId);
  const highlightedIds = new Set<string>();

  if (activeNode) {
    highlightedIds.add(activeNode.id);
    activeNode.connectedTo.forEach((id) => highlightedIds.add(id));
  }

  return (
    <div className="mb-12 p-6 rounded-2xl border border-white/10 bg-[#080B12] font-mono">
      {/* Title & Telemetry Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold tracking-wider text-white uppercase">
            RAHUL // TECH DNA
          </h3>
          <span className="text-[10px] text-cyan-400/80 px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/20">
            INTERCONNECTED ARCHITECTURE
          </span>
        </div>

        <div className="text-[11px] text-neutral-400">
          {activeNode ? (
            <span className="text-cyan-300">
              HOVERED: <strong className="text-white">{activeNode.label}</strong>
              {activeNode.relatedProjects.length > 0 && (
                <span> ➔ APPLIED IN: {activeNode.relatedProjects.join(', ')}</span>
              )}
            </span>
          ) : (
            <span className="text-neutral-500">HOVER ANY NODE TO TRACE ARCHITECTURAL SIGNALS</span>
          )}
        </div>
      </div>

      {/* Interconnected Tech Network Clusters */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(['AI', 'BACKEND', 'FRONTEND', 'DATABASE'] as const).map((category) => {
          const clusterNode = TECH_NODES.find((n) => n.id === `c-${category.toLowerCase()}`);
          const techChildren = TECH_NODES.filter((n) => n.category === category && n.role === 'tech');
          const style = CATEGORY_COLORS[category];

          const isClusterHighlighted = !activeNode || highlightedIds.has(`c-${category.toLowerCase()}`);

          return (
            <div
              key={category}
              className={`rounded-xl border p-4 transition-all duration-200 ${
                isClusterHighlighted ? `${style.border} ${style.bg}` : 'border-white/5 bg-white/[0.01] opacity-35'
              }`}
            >
              {/* Cluster Root Header */}
              <div
                onMouseEnter={() => clusterNode && setHoveredNodeId(clusterNode.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className="flex items-center justify-between pb-3 border-b border-white/10 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${style.dot} ${isClusterHighlighted ? 'animate-pulse' : ''}`} />
                  <span className={`text-xs font-bold tracking-wider ${style.text}`}>
                    {clusterNode?.label}
                  </span>
                </div>
                <span className="text-[9px] text-neutral-400">
                  {techChildren.length} NODES
                </span>
              </div>

              {/* Connected Child Technology Nodes */}
              <div className="mt-3 space-y-2">
                {techChildren.map((tech) => {
                  const isTechActive = activeNode?.id === tech.id;
                  const isTechConnected = highlightedIds.has(tech.id);
                  const isDimmed = activeNode && !isTechConnected;

                  return (
                    <div
                      key={tech.id}
                      onMouseEnter={() => setHoveredNodeId(tech.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs ${
                        isTechActive
                          ? 'border-cyan-400 bg-cyan-950/50 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-[1.02]'
                          : isTechConnected
                          ? 'border-cyan-500/30 bg-white/[0.04] text-cyan-200'
                          : isDimmed
                          ? 'border-white/5 text-neutral-500 opacity-40'
                          : 'border-white/5 bg-white/[0.02] text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] ${isTechActive ? 'text-cyan-400 font-bold' : 'text-neutral-500'}`}>
                          ›
                        </span>
                        <span className="font-semibold">{tech.label}</span>
                      </div>

                      {tech.relatedProjects.length > 0 && (
                        <span className="text-[9px] text-neutral-400 hidden sm:inline">
                          {tech.relatedProjects[0]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Relational Cross-Stack Bridge Note */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>FULL-STACK COHESION: FASTAPI API ➔ REACT 19 SPA ➔ GEMINI 3 SDK ➔ FIRESTORE TELEMETRY</span>
        </div>
        <span className="hidden sm:inline text-neutral-500">REAL DATA RECONCILED</span>
      </div>
    </div>
  );
};
