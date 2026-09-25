import React from 'react';
import { FileText, Download, Eye, Bot } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { EXPERIENCES } from '../data/experience';
import { TECH_DNA } from '../data/skills';
import { EDUCATION } from '../data/education';
import { SOCIAL_LINKS } from '../data/links';

interface ResumeSectionProps {
  onOpenAI: (prompt?: string) => void;
}

const RESUME_URL = '/Rahul_Prasad_Keshri_Resume.pdf';

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenAI }) => {

  const handleViewResume = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');

    link.href = RESUME_URL;
    link.download = 'Rahul_Prasad_Keshri_Resume.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest">
          05 //
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
          HUMAN DOCUMENT
        </h2>

        <div className="flex-1 h-[1px] bg-white/10 ml-4" />
      </div>

      {/* Resume Card */}
      <div className="rounded-xl border border-white/15 bg-[#080A0F] shadow-2xl p-6 sm:p-10 font-mono relative overflow-hidden">

        {/* Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-4 relative z-10">

          {/* Resume Label */}
          <div className="text-xs text-cyan-400 tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>STANDARDIZED HUMAN CURRICULUM VITAE</span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            Prefer the traditional interface?
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-300 font-sans leading-relaxed">
            While R//AI provides instantaneous conversational interrogation,
            you can also inspect or download Rahul's verified ATS-compliant
            engineering resume as a PDF.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">

            {/* VIEW RESUME */}
            <button
              onClick={handleViewResume}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-cyan-300 transition-all cursor-pointer shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span>VIEW RESUME</span>
            </button>

            {/* DOWNLOAD RESUME */}
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 bg-white/[0.04] text-white hover:bg-white/10 font-mono text-xs sm:text-sm tracking-wider transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD RESUME</span>
            </button>

            {/* ASK R//AI */}
            <button
              onClick={() =>
                onOpenAI(
                  "Summarize Rahul's resume highlights and key technical qualifications."
                )
              }
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 font-mono text-xs tracking-wider transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>ASK R//AI ABOUT RAHUL</span>
            </button>
          </div>
        </div>

        {/* Resume Metrics */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">

          <div>
            <span className="text-[10px] text-neutral-400 block">
              FORMAT:
            </span>

            <span className="text-neutral-200 font-semibold">
              ATS One-Pager (PDF)
            </span>
          </div>

          <div>
            <span className="text-[10px] text-neutral-400 block">
              STATUS:
            </span>

            <span className="text-emerald-400 font-semibold">
              Active & Verified
            </span>
          </div>

          <div>
            <span className="text-[10px] text-neutral-400 block">
              TARGET ROLE:
            </span>

            <span className="text-neutral-200 font-semibold">
              SWE / Full-Stack
            </span>
          </div>

          <div>
            <span className="text-[10px] text-neutral-400 block">
              LOCATION:
            </span>

            <span className="text-neutral-200 font-semibold">
              {PROFILE.location}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

