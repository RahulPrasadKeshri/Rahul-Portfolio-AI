import { ExperienceItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "bluestock-fintech",
    company: "Bluestock Fintech",
    role: "Software Development Intern",
    period: "June 2025 – July 2025",
    location: "Remote / Bengaluru, India",
    type: "Internship (Field Experience)",
    summary: "Focused on frontend development and financial telemetry visualization, architecting a real-time cryptocurrency tracking platform.",
    technologies: [
      "React",
      "Tailwind CSS",
      "JavaScript / TypeScript",
      "CoinGecko API",
      "Chart.js / SVG Visualizers",
      "Git / GitHub"
    ],
    deliverables: [
      "Built high-performance, real-time cryptocurrency price tracking dashboard with live pricing, 24h trends, and interactive multi-frame charts",
      "Integrated CoinGecko REST APIs to stream price updates, 24h high/low metrics, and market capitalization stats",
      "Crafted responsive, accessible UI components utilizing Tailwind CSS with high visual fidelity and mobile optimization",
      "Implemented client-side caching to reduce unnecessary API requests and preserve rate-limiting quotas"
    ],
    verifiedScopeNotes: "STRICT SCOPE AUDIT: Frontend development, state management, and financial API integration. Backend server development was handled by external services; no backend architecture claimed.",
    systemLogId: "LOG_BF_2025_06"
  }
];
