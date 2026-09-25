import { ProjectItem } from '../types';

export const PROJECTS: ProjectItem[] = [
  {
    id: "smarttrack",
    name: "SMARTTRACK",
    codename: "SYS-ST-01",
    tagline: "AI Inventory & Billing Management System",
    type: "Full-Stack System with Applied GenAI",
    timeline: "2025",
    problem: "Traditional retail and warehouse inventory software operates on static spreadsheets and passive databases, resulting in unnoticed stock depletion, delayed client billing reconciliations, and missed payment deadlines.",
    solution: "Engineered a reactive AI-assisted management suite that continuously evaluates catalog levels, tracks invoice lifecycles, and triggers contextual alerts powered by Gemini intelligence.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Gemini",
      "Firebase / Firestore"
    ],
    contributions: [
      "Designed full-stack application architecture uniting a React/TypeScript interface with a FastAPI backend",
      "Implemented intelligent low-stock warning logic and due-payment threshold triggers",
      "Integrated Gemini API to ingest ledger telemetry and generate actionable business insights",
      "Structured Firestore schema for real-time inventory updates and invoice state persistence"
    ],
    aiCapabilities: [
      "Low-stock contextual insights & reorder recommendations",
      "Due-payment tracking & receivable prioritization summaries",
      "Priority automated alerts based on invoice ageing",
      "AI-assisted business summary reports"
    ],
    keyFeatures: [
      "Real-time product stock level tracking with automated minimum thresholds",
      "Billing lifecycle management with instant invoice generation",
      "Smart priority alerting for outstanding vendor receivables",
      "Interactive data breakdown dashboard with zero UI bloat"
    ],
    architectureOverview: "Client (React + TS + Tailwind) ➔ RESTful API (FastAPI) ➔ Cloud Persistence (Firestore) + LLM Intelligence Engine (Gemini 3.8 Flash)",
    githubUrl: "https://github.com/rahulprasadkeshri/smarttrack",
    liveUrl: "https://smarttrack-ai.web.app",
    verified: true,
    status: "DEPLOYED"
  },
  {
    id: "crypto-pulse",
    name: "CRYPTO PULSE",
    codename: "SYS-CP-02",
    tagline: "Real-Time Cryptocurrency Market Intelligence Terminal",
    type: "Frontend Engineering Project (Bluestock Fintech)",
    timeline: "2025",
    problem: "Traders and market watchers require sub-second price monitoring, trend visualization, and volume analytics without heavy bloated desktop clients.",
    solution: "Engineered a lightweight, high-performance financial dashboard utilizing CoinGecko REST endpoints, reactive state caching, and responsive trend charting.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "CoinGecko API",
      "Vite"
    ],
    contributions: [
      "Constructed custom price feed polling hooks with stale-time debouncing",
      "Built clean candlestick and line chart visualizations with responsive viewport scaling",
      "Implemented coin search, category filters, and 24h gainers/losers radar",
      "Optimized DOM rendering loops to maintain 60fps performance during continuous price updates"
    ],
    aiCapabilities: [
      "Algorithmic trend momentum indicators and volatility classification"
    ],
    keyFeatures: [
      "Live crypto price ticker covering top 100+ global digital assets",
      "Interactive multi-timeframe price charts (24h, 7d, 30d, 1y)",
      "Instant portfolio tracking simulator with local state persistence",
      "Market cap, volume, and circulating supply telemetry"
    ],
    architectureOverview: "Single-Page Application (React 19 + TypeScript) ➔ CoinGecko Live Market API ➔ Cached Client State Store",
    githubUrl: "https://github.com/rahulprasadkeshri/crypto-pulse-bluestock",
    liveUrl: "https://crypto-pulse-terminal.vercel.app",
    verified: true,
    status: "DEPLOYED"
  },
  {
    id: "r-ai-system",
    name: "R//AI PORTFOLIO INTELLIGENCE",
    codename: "SYS-RAI-00",
    tagline: "Autonomous Developer Knowledge Operating System",
    type: "Full-Stack AI Interface",
    timeline: "2026",
    problem: "Standard static developer resumes are passive, unidimensional, and force recruiters to spend minutes skimming PDFs to find specific technical competencies.",
    solution: "Designed an interactive portfolio operating system powered by a dedicated AI assistant strictly grounded in verified technical accomplishments with zero hallucination.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI / Node",
      "Gemini API",
      "Framer Motion"
    ],
    contributions: [
      "Developed custom terminal-aesthetic interface with micro-interactions and high-contrast dark typography",
      "Implemented deterministic recruiter briefing mode with instant copy-to-clipboard summaries",
      "Engineered strict grounding prompt barrier preventing model fabrication of companies or metrics",
      "Built resilient streaming and fallback architecture ensuring 100% uptime"
    ],
    aiCapabilities: [
      "Strict portfolio factual grounding",
      "Automated 30-second recruiter brief synthesis",
      "Deep technical interrogations on project architecture"
    ],
    keyFeatures: [
      "Conversational portfolio interrogation interface (R//AI)",
      "Instant Recruiter Mode with structured technical briefs",
      "Interactive Tech DNA clustering and verified project case files",
      "Responsive terminal initialization experience"
    ],
    architectureOverview: "React UI ➔ FastAPI / Express Proxy ➔ Strict Knowledge Verification Layer ➔ Gemini API",
    githubUrl: "https://github.com/rahulprasadkeshri/portfolio-ai-os",
    liveUrl: "https://rahulkeshri.dev",
    verified: true,
    status: "DEPLOYED"
  }
];
