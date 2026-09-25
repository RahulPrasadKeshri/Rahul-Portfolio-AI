import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, GitCommit, Calendar, MapPin, CheckCircle, ExternalLink, Terminal } from 'lucide-react';
import { EXPERIENCES } from '../data/experience';

interface ExperienceSectionProps {
  onOpenAI: (prompt?: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenAI }) => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest">
          03 //
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
          FIELD EXPERIENCE
        </h2>
        <div className="flex-1 h-[1px] bg-white/10 ml-4" />
      </div>

      <div className="rounded-xl border border-white/15 bg-[#080A0F] shadow-2xl p-6 sm:p-8 font-mono">
        {/* Audit header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span className="font-semibold tracking-wider">EMPLOYMENT_AUDIT_TRAIL.LOG</span>
          </div>
          <span className="text-[11px] text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
            RECORD_COUNT: {EXPERIENCES.length}
          </span>
        </div>

        {/* Timeline Log */}
        <div className="mt-8 relative border-l-2 border-white/10 pl-6 sm:pl-8 space-y-12">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[#050608] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.4)]" />

              {/* Log Entry Header */}
              <div className="space-y-2 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">{exp.systemLogId}</span>
                    <span className="text-neutral-400">/</span>
                    <span className="text-xs font-semibold text-cyan-300">{exp.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {exp.company}
                  </h3>
                  <span className="text-sm font-semibold text-neutral-300">
                    — {exp.role}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-4 text-sm text-neutral-300 font-sans leading-relaxed">
                {exp.summary}
              </p>

              {/* Key Deliverables */}
              <div className="mt-5 space-y-2.5 font-sans">
                <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  AUDITED DELIVERABLES
                </div>
                <div className="space-y-2">
                  {exp.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <span className="text-cyan-400 font-mono mt-0.5 select-none">›</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Scope Boundary note */}
              <div className="mt-5 p-3.5 rounded-lg border border-cyan-500/20 bg-cyan-950/15 text-xs font-mono text-cyan-200/90 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{exp.verifiedScopeNotes}</span>
              </div>

              {/* Technologies chip row */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/5 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenAI('Detail Rahul\'s work during his Bluestock Fintech internship.')}
                  className="text-xs text-cyan-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>ASK R//AI ABOUT THIS EXPERIENCE</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
