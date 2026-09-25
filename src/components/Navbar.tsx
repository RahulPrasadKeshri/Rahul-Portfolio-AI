import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Menu, X, Shield, Lock, Briefcase } from 'lucide-react';
import { RKLogo } from './RKLogo';

interface NavbarProps {
  onOpenAI: () => void;
  onOpenRecruiterMode: () => void;
  onOpenAdmin: () => void;
}

const NAV_ITEMS = [
  { label: 'SYSTEM', href: '#system' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'STACK', href: '#stack' },
  { label: 'RESUME', href: '#resume' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAI,
  onOpenRecruiterMode,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('system');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Track active section
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none flex justify-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`pointer-events-auto transition-all duration-300 rounded-full border ${
          isScrolled
            ? 'bg-[#090A0F]/85 border-white/15 backdrop-blur-xl shadow-2xl py-2 px-4'
            : 'bg-[#090A0F]/60 border-white/10 backdrop-blur-md py-2.5 px-5'
        } flex items-center justify-between gap-4 max-w-5xl w-full`}
      >
        {/* Left Branding / Identity glyph */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <RKLogo onClick={() => {
            const el = document.getElementById('system');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />

          <a
            href="#system"
            onClick={(e) => handleNavClick(e, '#system')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-cyan-300 transition-colors">
              R//SYS
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-neutral-400 border-l border-white/10 pl-2">
              RAHUL KESHRI
            </span>
          </a>
        </div>

        {/* Center Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] tracking-widest text-neutral-400">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white font-medium bg-white/[0.08]'
                    : 'hover:text-neutral-200 hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full border border-cyan-500/30 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions: Recruiter Mode + R//AI Trigger */}
        <div className="flex items-center gap-2">
          {/* Recruiter Mode Button */}
          <button
            onClick={onOpenRecruiterMode}
            id="recruiter-mode-toggle"
            aria-label="Open Recruiter Mode"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-cyan-400/40 text-neutral-200 hover:text-white font-mono text-[11px] tracking-wider transition-all cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">RECRUITER MODE</span>
            <span className="sm:hidden">BRIEF</span>
          </button>

          {/* Dedicated R//AI Assistant Button */}
          <button
            onClick={onOpenAI}
            id="rai-navbar-btn"
            aria-label="Ask R//AI Portfolio Intelligence"
            className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500 text-slate-950 font-mono text-[11px] font-bold tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
            <Bot className="w-3.5 h-3.5" />
            <span>R//AI</span>
          </button>

          {/* Admin discreet trigger */}
          <button
            onClick={onOpenAdmin}
            title="System Admin Gate"
            aria-label="System Admin Gate"
            className="p-1.5 text-neutral-400 hover:text-neutral-300 transition-colors cursor-pointer hidden md:block"
          >
            <Lock className="w-3 h-3" />
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white lg:hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto fixed top-20 left-4 right-4 bg-[#090A0F]/95 border border-white/15 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl z-50 lg:hidden font-mono"
          >
            <div className="flex flex-col gap-3">
              <div className="text-[10px] text-neutral-400 tracking-widest pb-2 border-b border-white/5">
                SYSTEM SECTIONS
              </div>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 py-2 rounded-lg text-sm text-neutral-300 hover:text-cyan-300 hover:bg-white/[0.04] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRecruiterMode();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-neutral-200 text-xs tracking-wider"
                >
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>OPEN RECRUITER MODE</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAI();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold tracking-wider"
                >
                  <Bot className="w-4 h-4" />
                  <span>LAUNCH R//AI CHAT</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
