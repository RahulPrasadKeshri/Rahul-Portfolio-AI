import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SystemIntro } from './components/SystemIntro';
import { Navbar } from './components/Navbar';
import { SystemStatus } from './components/SystemStatus';
import { Hero } from './components/Hero';
import { IdentitySection } from './components/IdentitySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TechDNASection } from './components/TechDNASection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { HowRahulBuilds } from './components/HowRahulBuilds';
import { GitHubSignal } from './components/GitHubSignal';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { AIFloatingTrigger } from './components/AIFloatingTrigger';
import { RecruiterModeModal } from './components/RecruiterModeModal';
import { AdminModal } from './components/AdminModal';
import { NeuralBackground } from './components/NeuralBackground';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState<boolean>(() => {
    // Check if user already saw intro in current session
    return sessionStorage.getItem('system_initialized') === 'true';
  });

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);
  const [isRecruiterModeOpen, setIsRecruiterModeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    sessionStorage.setItem('system_initialized', 'true');
  };

  const handleOpenAI = (prompt?: string) => {
    setAiInitialPrompt(prompt);
    setIsAIOpen(true);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle R//AI with '/' or Cmd/Ctrl+K when not typing in an input
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (!isInput) {
        if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
          e.preventDefault();
          setIsAIOpen((prev) => !prev);
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          setIsRecruiterModeOpen((prev) => !prev);
        }
      }

      // Close open modals on Escape
      if (e.key === 'Escape') {
        if (isAIOpen) setIsAIOpen(false);
        if (isRecruiterModeOpen) setIsRecruiterModeOpen(false);
        if (isAdminOpen) setIsAdminOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAIOpen, isRecruiterModeOpen, isAdminOpen]);

  return (
    <div className="min-h-screen bg-[#05080D] text-neutral-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background Layer: Deep Navy to Charcoal Base Gradient + Subtle AI Neural Network */}
      <NeuralBackground />

      {/* 1. Cinematic System Initialization Sequence on First Turn */}
      <AnimatePresence>
        {!introCompleted && (
          <SystemIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main Application Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating Minimal Navbar */}
        <Navbar
          onOpenAI={() => handleOpenAI()}
          onOpenRecruiterMode={() => setIsRecruiterModeOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Hero Section (00 / SYSTEM) */}
        <Hero
          onOpenAI={() => handleOpenAI()}
          onOpenRecruiterMode={() => setIsRecruiterModeOpen(true)}
        />

        {/* Live System Status Telemetry Strip */}
        <SystemStatus />

        {/* 01 // IDENTITY (Terminal & CS Degree) */}
        <IdentitySection onOpenAI={handleOpenAI} />

        {/* 02 // SYSTEMS BUILT (SmartTrack & Technical Case Files) */}
        <ProjectsSection onOpenAI={handleOpenAI} />

        {/* Feature 10: GITHUB // SIGNAL */}
        <GitHubSignal />

        {/* 03 // FIELD EXPERIENCE (Bluestock Fintech & Audited Log) */}
        <ExperienceSection onOpenAI={handleOpenAI} />

        {/* 04 // TECH DNA (Clustered competencies) */}
        <TechDNASection onOpenAI={handleOpenAI} />

        {/* Feature 11: HOW RAHUL BUILDS */}
        <HowRahulBuilds />

        {/* 05 // HUMAN DOCUMENT (Resume & ATS Viewer) */}
        <ResumeSection onOpenAI={handleOpenAI} />

        {/* 06 // ESTABLISH CONNECTION (Contact channels) */}
        <ContactSection onOpenAI={handleOpenAI} />

        {/* System Footer */}
        <Footer
          onOpenAI={() => handleOpenAI()}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </div>

      {/* Floating R//AI Trigger */}
      <AIFloatingTrigger
        isOpen={isAIOpen}
        onOpen={() => handleOpenAI()}
      />

      {/* Primary R//AI Conversational Portfolio Assistant */}
      <AIChatbot
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialPrompt={aiInitialPrompt}
      />

      {/* Recruiter Mode Modal */}
      <RecruiterModeModal
        isOpen={isRecruiterModeOpen}
        onClose={() => setIsRecruiterModeOpen(false)}
        onOpenAI={(prompt) => {
          setIsRecruiterModeOpen(false);
          handleOpenAI(prompt);
        }}
      />

      {/* Administrative Gateway Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
