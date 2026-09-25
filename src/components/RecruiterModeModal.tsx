import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Briefcase,
  Sparkles,
  Copy,
  Check,
  FileText,
  Cpu,
  Mail,
  ExternalLink,
} from 'lucide-react';

import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { TECH_DNA } from '../data/skills';
import { SOCIAL_LINKS } from '../data/links';

interface RecruiterModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAI: (prompt?: string) => void;
}

type TabType =
  | 'summary'
  | 'profile'
  | 'projects'
  | 'ai'
  | 'backend'
  | 'resume'
  | 'contact';

/*
|--------------------------------------------------------------------------
| Resume configuration
|--------------------------------------------------------------------------
| Put your actual PDF here:
|
| public/
|   Rahul_Prasad_Keshri_Resume.pdf
|
| Then this URL becomes:
| /Rahul_Prasad_Keshri_Resume.pdf
|--------------------------------------------------------------------------
*/

const RESUME_URL = '/Rahul_Prasad_Keshri_Resume.pdf';

const RESUME_FILE_NAME = 'Rahul_Prasad_Keshri_Resume.pdf';

export const RecruiterModeModal: React.FC<RecruiterModeModalProps> = ({
  isOpen,
  onClose,
  onOpenAI,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  /*
  |--------------------------------------------------------------------------
  | Resume actions
  |--------------------------------------------------------------------------
  */

  const handleViewResume = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');

    link.href = RESUME_URL;
    link.download = RESUME_FILE_NAME;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /*
  |--------------------------------------------------------------------------
  | Contact actions
  |--------------------------------------------------------------------------
  */

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL_LINKS.email);
      setCopiedEmail(true);

      setTimeout(() => {
        setCopiedEmail(false);
      }, 2500);
    } catch {
      console.error('Unable to copy email.');
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Recruiter Brief
  |--------------------------------------------------------------------------
  */

  const recruiterBriefText = `RECRUITER BRIEF: RAHUL PRASAD KESHRI

ROLE:
Software Engineer | Full-Stack Developer | GenAI Builder

EDUCATION:
B.Tech in Computer Science & Engineering (2026)
Bengal College of Engineering and Technology (BCET), Durgapur

SUMMARY:
Computer Science Engineering graduate with hands-on experience across React.js, TypeScript, Node.js, Express.js, FastAPI, REST APIs, databases, and applied Generative AI.

Experienced in building full-stack applications, AI-assisted business systems, real-time data dashboards, and API-driven applications.

CORE COMPETENCIES:
- Languages: C++, JavaScript, TypeScript, Python
- Frontend: React.js, HTML5, CSS3, Tailwind CSS, Vite
- Backend: Node.js, Express.js, FastAPI, REST APIs
- Databases: MongoDB, PostgreSQL, MySQL, Firebase / Firestore
- AI / GenAI: Gemini API, RAG concepts, AI-powered application workflows
- Fundamentals: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks
- Tools: Git, GitHub

FIELD EXPERIENCE:
- Bluestock Fintech — Software Development Intern, June-July 2025
  Built a real-time Cryptocurrency Price Tracking Dashboard using React.js, Tailwind CSS and CoinGecko API.

VERIFIED SYSTEMS:
- SmartTrack — AI Inventory & Billing Management System
  React + TypeScript + FastAPI + Gemini + Firestore

PORTFOLIO:
AI-powered developer portfolio with R//AI recruiter assistant and verified knowledge-base responses.

CONTACT:
Email: ${SOCIAL_LINKS.email}
LinkedIn: ${SOCIAL_LINKS.linkedin}
GitHub: ${SOCIAL_LINKS.github}`;

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(recruiterBriefText);

      setCopiedBrief(true);

      setTimeout(() => {
        setCopiedBrief(false);
      }, 2500);
    } catch {
      console.error('Unable to copy recruiter brief.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl max-h-[88vh] flex flex-col rounded-2xl border border-white/20 bg-[#090C14] shadow-2xl overflow-hidden font-mono"
      >
        {/* ================================================================
            HEADER
        ================================================================= */}

        <div className="px-6 py-4 border-b border-white/10 bg-[#0D101A] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <Briefcase className="w-4 h-4" />

            <span className="font-bold tracking-wider text-white">
              RECRUITER MODE
            </span>

            <span className="text-neutral-400 hidden sm:inline">
              ────────────────────
            </span>

            <span className="text-[11px] text-neutral-400 hidden sm:inline">
              HIGH-VELOCITY EVALUATION
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Recruiter Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ================================================================
            TAB NAVIGATION
        ================================================================= */}

        <div className="px-6 pt-3 pb-2 border-b border-white/10 bg-[#07090F] flex flex-wrap gap-2 text-xs">
          {[
            { id: 'summary', label: '[ 30-SECOND SUMMARY ]' },
            { id: 'profile', label: '[ TECHNICAL PROFILE ]' },
            { id: 'projects', label: '[ PROJECT EVIDENCE ]' },
            { id: 'ai', label: '[ AI / GENAI EXPERIENCE ]' },
            { id: 'backend', label: '[ BACKEND EXPERIENCE ]' },
            { id: 'resume', label: '[ RESUME ]' },
            { id: 'contact', label: '[ CONTACT ]' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-3 py-1.5 rounded text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================================
            CONTENT BODY
        ================================================================= */}

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-neutral-200 font-sans">

          {/* ==============================================================
              TAB: 30-SECOND SUMMARY
          ============================================================== */}

          {activeTab === 'summary' && (
            <div className="space-y-6">

              {/* Candidate Overview */}

              <div className="p-5 rounded-2xl border border-cyan-500/30 bg-[#080E1A] font-mono space-y-4">

                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>CANDIDATE OVERVIEW</span>
                  </div>

                  <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/20">
                    STATUS: OPEN TO OPPORTUNITIES
                  </span>
                </div>

                {/* Role */}

                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    ROLE
                  </div>

                  <div className="text-sm sm:text-base font-bold text-white font-sans mt-0.5">
                    Software Engineer | Full-Stack Developer | GenAI Builder
                  </div>
                </div>

                {/* Core Strengths / Projects */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">

                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                    <div className="text-[11px] text-cyan-400 uppercase font-semibold">
                      CORE STRENGTHS
                    </div>

                    <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">

                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Full-stack application development</span>
                      </li>

                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>REST API development and integration</span>
                      </li>

                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Applied AI / GenAI application workflows</span>
                      </li>

                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>DSA and software engineering fundamentals</span>
                      </li>

                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">

                    <div className="text-[11px] text-emerald-400 uppercase font-semibold">
                      PROJECTS TO REVIEW
                    </div>

                    <ol className="space-y-2 text-xs text-neutral-300 font-sans">

                      <li className="p-2 rounded border border-white/5 bg-white/[0.01]">
                        <div className="font-bold text-white font-mono">
                          1. SmartTrack
                        </div>

                        <div className="text-[11px] text-neutral-400">
                          AI Inventory & Billing Management System
                        </div>

                        <div className="text-[10px] text-neutral-500 mt-1">
                          React + TypeScript + FastAPI + Gemini + Firestore
                        </div>
                      </li>

                      <li className="p-2 rounded border border-white/5 bg-white/[0.01]">
                        <div className="font-bold text-white font-mono">
                          2. Crypto Pulse
                        </div>

                        <div className="text-[11px] text-neutral-400">
                          Real-Time Cryptocurrency Price Tracking Dashboard
                        </div>

                        <div className="text-[10px] text-neutral-500 mt-1">
                          Bluestock Fintech Internship
                        </div>
                      </li>

                    </ol>
                  </div>

                </div>

                {/* Interview Questions */}

                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">

                  <div className="text-[11px] text-cyan-300 uppercase font-semibold">
                    RECOMMENDED INTERVIEW QUESTIONS
                  </div>

                  <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">

                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">›</span>
                      <span>Architecture and implementation of SmartTrack</span>
                    </li>

                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">›</span>
                      <span>How real-time crypto data was consumed and displayed</span>
                    </li>

                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">›</span>
                      <span>How Gemini was integrated into an application workflow</span>
                    </li>

                  </ul>

                </div>

                {/* Quick Actions */}

                <div className="pt-2">

                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">
                    QUICK ACTIONS
                  </div>

                  <div className="flex flex-wrap gap-2.5">

                    <button
                      onClick={handleDownloadResume}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Resume</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('resume');
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 text-xs transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </button>

                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 text-xs transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Mail className="w-3.5 h-3.5" />
                      )}

                      <span>
                        {copiedEmail ? 'Email Copied!' : 'Copy Email'}
                      </span>
                    </button>

                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 text-xs transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open LinkedIn</span>
                    </a>

                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 text-xs transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open GitHub</span>
                    </a>

                  </div>
                </div>

              </div>

              {/* Instant Recruiter Dossier */}

              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20">

                <div className="space-y-1">

                  <div className="font-mono text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>INSTANT RECRUITER DOSSIER</span>
                  </div>

                  <p className="text-xs text-neutral-300 font-sans">
                    Everything you need to evaluate Rahul quickly, based on verified portfolio information.
                  </p>

                </div>

                <button
                  onClick={handleCopyBrief}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-slate-950 font-mono text-xs font-bold hover:bg-cyan-300 transition-colors cursor-pointer shrink-0"
                >
                  {copiedBrief ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}

                  <span>
                    {copiedBrief
                      ? 'COPIED TO CLIPBOARD'
                      : 'COPY RECRUITER BRIEF'}
                  </span>
                </button>

              </div>

              {/* Candidate Essentials */}

              <div className="space-y-4 text-sm leading-relaxed">

                <div>
                  <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    CANDIDATE ESSENTIALS
                  </h4>

                  <p className="text-white font-medium">
                    Rahul Prasad Keshri is a Computer Science Engineering graduate with hands-on experience in full-stack development, APIs, databases, and applied Generative AI.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2">

                    <span className="font-mono text-xs text-cyan-400 font-semibold block">
                      PRIMARY CAPABILITIES
                    </span>

                    <ul className="text-xs space-y-1 text-neutral-300">

                      <li>• React.js + TypeScript</li>
                      <li>• Node.js + Express.js</li>
                      <li>• FastAPI + Python</li>
                      <li>• REST API development</li>
                      <li>• MongoDB / PostgreSQL / MySQL / Firestore</li>
                      <li>• Gemini-powered application workflows</li>

                    </ul>

                  </div>

                  <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2">

                    <span className="font-mono text-xs text-emerald-400 font-semibold block">
                      HIGHLIGHTED SYSTEMS
                    </span>

                    <ul className="text-xs space-y-1 text-neutral-300">

                      <li>
                        • <strong>SmartTrack:</strong> AI Inventory & Billing Management System
                      </li>

                      <li>
                        • <strong>Crypto Pulse:</strong> Real-time Cryptocurrency Price Tracking Dashboard
                      </li>

                      <li>
                        • <strong>R//AI:</strong> Portfolio AI assistant with verified knowledge-base responses
                      </li>

                    </ul>

                  </div>

                </div>

                <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-1 text-xs">

                  <span className="font-mono text-xs text-neutral-400 block uppercase">
                    HIRING TIMELINE & AVAILABILITY
                  </span>

                  <p className="text-neutral-200">
                    {PROFILE.availability}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ==============================================================
              TAB: TECHNICAL PROFILE
          ============================================================== */}

          {activeTab === 'profile' && (
            <div className="space-y-6 text-sm">

              <div className="space-y-2">

                <h4 className="font-mono text-xs text-cyan-400 uppercase font-semibold">
                  ENGINEERING CAPABILITY MATRIX
                </h4>

                <p className="text-neutral-300 leading-relaxed">
                  Rahul's technical profile spans frontend engineering,
                  backend/API development, database integration, software
                  engineering fundamentals, and applied AI/GenAI workflows.
                </p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {TECH_DNA.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2"
                  >

                    <div className="flex items-center justify-between font-mono text-xs">

                      <span className="font-bold text-white">
                        {cat.category}
                      </span>

                      <span className="text-neutral-400 text-[10px]">
                        {cat.skills.length} MODULES
                      </span>

                    </div>

                    <div className="flex flex-wrap gap-1 font-mono text-[11px]">

                      {cat.skills.map((s) => (
                        <span
                          key={s.name}
                          className="px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/5"
                        >
                          {s.name}
                        </span>
                      ))}

                    </div>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* ==============================================================
              TAB: PROJECT EVIDENCE
          ============================================================== */}

          {activeTab === 'projects' && (
            <div className="space-y-4 text-xs sm:text-sm">

              <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                DOCUMENTED PROJECT EVIDENCE
              </div>

              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2"
                >

                  <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono">

                    <h5 className="font-bold text-white text-base">
                      {proj.name}
                    </h5>

                    <span className="text-cyan-400 text-xs">
                      {proj.type}
                    </span>

                  </div>

                  <p className="text-neutral-300 text-xs">
                    {proj.solution}
                  </p>

                  <div className="text-neutral-400 text-xs font-mono">
                    Stack: {proj.technologies.join(', ')}
                  </div>

                  <div className="pt-2 flex gap-3 font-mono text-xs">

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Source Code</span>
                        →
                      </a>
                    )}

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline flex items-center gap-1"
                      >
                        <span>Live Preview</span>
                        ↗
                      </a>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

          {/* ==============================================================
              TAB: AI / GENAI EXPERIENCE
          ============================================================== */}

          {activeTab === 'ai' && (
            <div className="space-y-4 text-xs sm:text-sm">

              <div className="font-mono text-xs text-cyan-400 uppercase font-semibold">
                APPLIED GENERATIVE AI ENGINEERING
              </div>

              <p className="text-neutral-300 leading-relaxed">
                AI is integrated into practical application workflows rather
                than presented only as a standalone demonstration.
              </p>

              <div className="space-y-3">

                <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-950/15 space-y-1.5">

                  <div className="font-mono font-bold text-cyan-300 text-xs">
                    1. SMARTTRACK INVENTORY INTELLIGENCE
                  </div>

                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Uses Gemini-powered workflows to assist with inventory
                    intelligence, including low-stock alerts, due-payment
                    insights, prioritization, and business-oriented summaries.
                  </p>

                </div>

                <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-950/15 space-y-1.5">

                  <div className="font-mono font-bold text-cyan-300 text-xs">
                    2. R//AI PORTFOLIO INTELLIGENCE
                  </div>

                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Portfolio assistant designed around verified portfolio
                    information and grounded responses to reduce unsupported
                    claims.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ==============================================================
              TAB: BACKEND EXPERIENCE
          ============================================================== */}

          {activeTab === 'backend' && (
            <div className="space-y-4 text-xs sm:text-sm">

              <div className="font-mono text-xs text-emerald-400 uppercase font-semibold">
                BACKEND ARCHITECTURE & DATA SYSTEMS
              </div>

              <p className="text-neutral-300 leading-relaxed">
                Backend work is demonstrated through application APIs,
                FastAPI services, Node.js/Express development, and database
                integration.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">

                <div className="p-3.5 rounded border border-white/10 bg-white/[0.02] space-y-1">

                  <span className="text-white font-bold block">
                    FastAPI & Python
                  </span>

                  <p className="text-neutral-400 font-sans text-xs">
                    API services, request handling, validation, and AI
                    integration workflows.
                  </p>

                </div>

                <div className="p-3.5 rounded border border-white/10 bg-white/[0.02] space-y-1">

                  <span className="text-white font-bold block">
                    Node.js & Express
                  </span>

                  <p className="text-neutral-400 font-sans text-xs">
                    REST API development, middleware, server-side logic,
                    and application integration.
                  </p>

                </div>

                <div className="p-3.5 rounded border border-white/10 bg-white/[0.02] space-y-1">

                  <span className="text-white font-bold block">
                    Databases & Firestore
                  </span>

                  <p className="text-neutral-400 font-sans text-xs">
                    Experience with MongoDB, PostgreSQL, MySQL and
                    Firebase/Firestore-based application data.
                  </p>

                </div>

                <div className="p-3.5 rounded border border-white/10 bg-white/[0.02] space-y-1">

                  <span className="text-white font-bold block">
                    Experience Scope
                  </span>

                  <p className="text-neutral-400 font-sans text-xs">
                    Bluestock internship focused on frontend development and
                    API consumption; backend engineering is demonstrated
                    through projects including SmartTrack.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ==============================================================
              TAB: RESUME
          ============================================================== */}

          {activeTab === 'resume' && (
            <div className="space-y-5 text-xs sm:text-sm">

              <div className="font-mono text-xs text-cyan-400 uppercase font-semibold">
                CURRICULUM VITAE ACCESS
              </div>

              <p className="text-neutral-300 leading-relaxed">
                Rahul's current one-page ATS-optimized resume is available
                as the official PDF document below.
              </p>

              {/* Resume Card */}

              <div className="p-5 rounded-xl border border-cyan-500/20 bg-cyan-950/10">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                  {/* File Information */}

                  <div className="flex items-start gap-3">

                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">

                      <FileText className="w-5 h-5 text-cyan-400" />

                    </div>

                    <div className="space-y-1">

                      <span className="text-white font-bold block text-sm font-mono">
                        {RESUME_FILE_NAME}
                      </span>

                      <span className="text-neutral-400 text-xs block">
                        Standard ATS-Optimized Single Page
                      </span>

                      <span className="text-emerald-400 text-[10px] font-mono">
                        ● VERIFIED DOCUMENT
                      </span>

                    </div>

                  </div>

                  {/* Resume Actions */}

                  <div className="flex flex-wrap gap-2 shrink-0">

                    <button
                      onClick={handleViewResume}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-white font-mono text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />

                      <span>
                        VIEW PDF
                      </span>
                    </button>

                    <button
                      onClick={handleDownloadResume}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-300 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />

                      <span>
                        DOWNLOAD PDF
                      </span>
                    </button>

                  </div>

                </div>

              </div>

              {/* Document Status */}

              <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">

                <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-3">
                  DOCUMENT STATUS
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">

                  <div>
                    <span className="text-neutral-500 block">
                      FORMAT
                    </span>

                    <span className="text-neutral-200">
                      PDF / ATS
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block">
                      TYPE
                    </span>

                    <span className="text-neutral-200">
                      One Page Resume
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block">
                      ACCESS
                    </span>

                    <span className="text-emerald-400">
                      Direct PDF
                    </span>
                  </div>

                </div>

              </div>

              {/* Important note */}

              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">

                <p className="text-[11px] text-amber-300 leading-relaxed font-sans">
                  VIEW PDF opens the actual resume document in a new browser
                  tab. DOWNLOAD PDF downloads the same document directly.
                </p>

              </div>

            </div>
          )}

          {/* ==============================================================
              TAB: CONTACT
          ============================================================== */}

          {activeTab === 'contact' && (
            <div className="space-y-4 text-xs sm:text-sm">

              <div className="font-mono text-xs text-neutral-400 uppercase font-semibold">
                DIRECT CHANNELS FOR HIRING TEAMS
              </div>

              <div className="space-y-2 font-mono text-xs">

                {/* Email */}

                <div className="p-3 rounded border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                  <span className="text-neutral-400">
                    EMAIL:
                  </span>

                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className="text-cyan-300 font-bold hover:underline break-all"
                  >
                    {SOCIAL_LINKS.email}
                  </a>

                </div>

                {/* LinkedIn */}

                <div className="p-3 rounded border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                  <span className="text-neutral-400">
                    LINKEDIN:
                  </span>

                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline break-all"
                  >
                    {SOCIAL_LINKS.linkedin}
                  </a>

                </div>

                {/* GitHub */}

                <div className="p-3 rounded border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                  <span className="text-neutral-400">
                    GITHUB:
                  </span>

                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline break-all"
                  >
                    {SOCIAL_LINKS.github}
                  </a>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* ================================================================
            MODAL FOOTER
        ================================================================= */}

        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0D101A] flex flex-wrap items-center justify-between gap-3 text-xs">

          <button
            onClick={() => {
              onClose();

              onOpenAI(
                'Give me a 30-second factual summary of Rahul Prasad Keshri based only on verified portfolio information.'
              );
            }}
            className="flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors cursor-pointer font-mono"
          >
            <Cpu className="w-3.5 h-3.5" />

            <span>
              ASK R//AI TO INTERROGATE CANDIDATE DOSSIER
            </span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white font-mono transition-colors cursor-pointer"
          >
            CLOSE BRIEF
          </button>

        </div>

      </motion.div>
    </div>
  );
};