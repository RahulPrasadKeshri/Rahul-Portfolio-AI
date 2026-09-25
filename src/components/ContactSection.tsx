import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Globe, Send, Check, Copy, Bot, Terminal, Radio } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/links';
import { PROFILE } from '../data/profile';

interface ContactSectionProps {
  onOpenAI: (prompt?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAI }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest">
          06 //
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
          ESTABLISH CONNECTION
        </h2>
        <div className="flex-1 h-[1px] bg-white/10 ml-4" />
      </div>

      {/* Main Connection Interface */}
      <div className="rounded-xl border border-white/15 bg-[#080A0F] shadow-2xl p-6 sm:p-10 font-mono relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>DIRECT TELECOMMUNICATION CHANNELS</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            Ready to initiate dialogue?
          </h3>

          <p className="text-sm text-neutral-300 font-sans leading-relaxed">
            Rahul is actively available for Software Engineering, Full-Stack, and applied Generative AI opportunities. Direct inquiries and recruiter proposals receive prompt responses.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${SOCIAL_LINKS.email}?subject=Software%20Engineering%20Opportunity%20-%20Rahul%20Prasad%20Keshri`}
              id="initiate-contact-cta"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-cyan-500 text-slate-950 font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>INITIATE CONTACT</span>
            </a>

            <button
              onClick={() => onOpenAI('How can I contact Rahul and schedule an interview?')}
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-lg border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 font-mono text-xs sm:text-sm tracking-wider transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>ASK R//AI</span>
            </button>
          </div>
        </div>

        {/* Verified Connection Nodes */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between gap-3 group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-neutral-400 block uppercase">ELECTRONIC MAIL</span>
                <span className="text-xs text-neutral-200 font-semibold truncate block">
                  {SOCIAL_LINKS.email}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(SOCIAL_LINKS.email, 'email')}
              className="p-2 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Copy Email Address"
              aria-label="Copy Email Address"
            >
              {copiedField === 'email' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* LinkedIn */}
          <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between gap-3 group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-neutral-400 block uppercase">PROFESSIONAL NETWORK</span>
                <span className="text-xs text-neutral-200 font-semibold truncate block">
                  linkedin.com/in/rahulprasadkeshri
                </span>
              </div>
            </div>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Open LinkedIn Profile"
              aria-label="Open LinkedIn Profile"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* GitHub */}
          <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between gap-3 group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded bg-white/[0.05] border border-white/10 text-neutral-200">
                <Github className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-neutral-400 block uppercase">CODE REPOSITORY</span>
                <span className="text-xs text-neutral-200 font-semibold truncate block">
                  github.com/rahulprasadkeshri
                </span>
              </div>
            </div>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Open GitHub Profile"
              aria-label="Open GitHub Profile"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Portfolio System */}
          <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between gap-3 group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-neutral-400 block uppercase">PORTFOLIO DOMAIN</span>
                <span className="text-xs text-neutral-200 font-semibold truncate block">
                  {SOCIAL_LINKS.portfolio}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(SOCIAL_LINKS.portfolio, 'portfolio')}
              className="p-2 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Copy Portfolio URL"
              aria-label="Copy Portfolio URL"
            >
              {copiedField === 'portfolio' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
