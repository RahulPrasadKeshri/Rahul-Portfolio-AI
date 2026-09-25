import React from 'react';
import { ShieldCheck, Heart, Terminal, Bot, ArrowUp, Lock } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SOCIAL_LINKS } from '../data/links';

interface FooterProps {
  onOpenAI: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAI, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#05060A] text-neutral-400 font-mono text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Identity & Concept */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-white font-bold text-sm tracking-wider uppercase font-sans">
                {PROFILE.name}
              </span>
            </div>
            <p className="text-neutral-300 font-sans text-xs max-w-md">
              {PROFILE.roles.join(' • ')}
            </p>
            <p className="text-[11px] text-cyan-300/80 italic font-mono">
              &ldquo;{PROFILE.mysteryMotto}&rdquo;
            </p>
            <p className="text-[11px] text-neutral-400">
              Until you ask the right question. Then the system responds.
            </p>
          </div>

          {/* Core System Navigation */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-[11px] tracking-wider uppercase">
              SYSTEM NODES
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#about" className="hover:text-cyan-300 transition-colors">01 // IDENTITY</a></li>
              <li><a href="#projects" className="hover:text-cyan-300 transition-colors">02 // SYSTEMS BUILT</a></li>
              <li><a href="#experience" className="hover:text-cyan-300 transition-colors">03 // FIELD EXPERIENCE</a></li>
              <li><a href="#stack" className="hover:text-cyan-300 transition-colors">04 // TECH DNA</a></li>
              <li><a href="#resume" className="hover:text-cyan-300 transition-colors">05 // HUMAN DOCUMENT</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">06 // CONNECTION</a></li>
            </ul>
          </div>

          {/* Intelligence & Protocols */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-[11px] tracking-wider uppercase">
              INTELLIGENCE CORE
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={onOpenAI}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Launch R//AI Chatbot</span>
                </button>
              </li>
              <li className="text-neutral-400">
                Grounding: Deterministic Portfolio KB
              </li>
              <li className="text-neutral-400">
                Engine: Gemini 3 Flash / FastAPI
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-300 transition-colors text-[10px] cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Administrative Gateway</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Verification and Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Factually Grounded • Zero Hallucinated Experience</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Designed & Built for Production</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              title="Return to top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
