export type SystemStatusType = 'ONLINE' | 'STANDBY' | 'DIAGNOSTIC' | 'RESTRICTED';

export interface ProjectItem {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  type: string;
  timeline: string;
  problem: string;
  solution: string;
  technologies: string[];
  contributions: string[];
  aiCapabilities?: string[];
  keyFeatures: string[];
  architectureOverview: string;
  githubUrl: string;
  liveUrl?: string;
  verified: boolean;
  status: 'DEPLOYED' | 'DEVELOPMENT' | 'ARCHIVED';
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  technologies: string[];
  deliverables: string[];
  verifiedScopeNotes: string;
  systemLogId: string;
}

export interface TechCluster {
  category: 'LANGUAGES' | 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'AI' | 'TOOLS';
  title: string;
  skills: {
    name: string;
    level: 'Core' | 'Applied' | 'Proficient';
    context: string;
  }[];
}

export interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  year: string;
  focusAreas: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  isRecruiterBrief?: boolean;
  groundedInKnowledge?: boolean;
}

export interface RecruiterModeView {
  activeTab: 'summary' | 'profile' | 'projects' | 'ai' | 'backend' | 'resume' | 'contact';
}
