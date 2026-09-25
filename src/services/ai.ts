import { PORTFOLIO_KNOWLEDGE_BASE } from '../data/knowledgeBase';

export interface ChatRequestPayload {
  prompt: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

export interface ChatResponsePayload {
  reply: string;
  source: 'gemini' | 'fastapi' | 'knowledge_base';
  grounded: boolean;
}

// Deterministic fallback knowledge query engine ensuring 100% verified facts without hallucination
export function queryKnowledgeBaseDirect(prompt: string): string {
  const q = prompt.toLowerCase().trim();

  // Who is Rahul / Introduction
  if (q.includes('who is rahul') || q.includes('about rahul') || q.includes('identity') || q.includes('who are you') || q.includes('background')) {
    return `**Rahul Prasad Keshri** is a Computer Science Engineering graduate focused on software engineering, full-stack development, backend systems, and applied Generative AI.

- **Primary Disciplines**: Full-Stack Web Development, Asynchronous Backend Services, and LLM Intelligence Integration.
- **Philosophy**: Building intelligent digital systems that don't just work — they respond, adapt, and think.
- **Availability**: Actively seeking Software Engineer, Full-Stack Developer, or GenAI roles.`;
  }

  // 30-Second Summary / Recruiter brief
  if (q.includes('30-second') || q.includes('30 second') || q.includes('summarize') || q.includes('recruiter brief') || q.includes('elevator pitch')) {
    return `### 30-Second Recruiter Brief: Rahul Prasad Keshri

- **Profile**: Software Engineer & Full-Stack Developer with deep focus on React, TypeScript, FastAPI, and applied GenAI.
- **Key System**: Designed and engineered **SmartTrack**, an AI-driven inventory & billing suite featuring low-stock warnings, due-payment alerts, and automated business insights powered by Gemini.
- **Field Experience**: Software Development Intern at **Bluestock Fintech** (June–July 2025), building a real-time cryptocurrency telemetry dashboard with live price feeds and trend charts.
- **Core Arsenal**: React, TypeScript, FastAPI, Node.js, Tailwind CSS, PostgreSQL, MongoDB, Gemini API, and Git.
- **Contact**: Available at **rahulprasadkeshri5@gmail.com** for immediate review.`;
  }

  // Strongest projects / Projects
  if (q.includes('strongest project') || q.includes('projects') || q.includes('what has he built') || q.includes('systems built')) {
    const p1 = PORTFOLIO_KNOWLEDGE_BASE.projects[0];
    const p2 = PORTFOLIO_KNOWLEDGE_BASE.projects[1];
    return `Rahul's primary verified systems:

1. **${p1.name}** (${p1.tagline})
   - **Stack**: React, TypeScript, Vite, Tailwind CSS, FastAPI, Gemini API, Firebase/Firestore
   - **Key Features**: Live stock management, invoice billing lifecycle, intelligent low-stock warnings, and due-payment prioritization summaries.
   - **Architecture**: React SPA communicating with FastAPI asynchronous endpoints and Gemini 3.8 Flash.

2. **${p2.name}** (${p2.tagline})
   - **Stack**: React, TypeScript, Tailwind CSS, CoinGecko REST API
   - **Scope**: Built during internship at Bluestock Fintech. Real-time market terminal with interactive price charts, 24h gainers/losers radar, and zero client bloat.`;
  }

  // SmartTrack specific
  if (q.includes('smarttrack') || q.includes('inventory') || q.includes('billing')) {
    const st = PORTFOLIO_KNOWLEDGE_BASE.projects[0];
    return `### SmartTrack: AI Inventory & Billing Management System

- **Problem Addressed**: Legacy spreadsheets and passive databases allow stock depletion to go unnoticed and cause delayed client payment reconciliations.
- **Engineered Solution**: A unified reactive inventory platform that monitors catalog levels and invoice lifecycles with Gemini AI assistance.
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, FastAPI, Gemini API, Firebase/Firestore.
- **Rahul's Contributions**:
  * Designed end-to-end full-stack architecture connecting React UI with FastAPI.
  * Implemented low-stock warning algorithms and due-payment threshold alerts.
  * Integrated Gemini API to synthesize ledger data into actionable recommendations.
  * Structured Firestore schema for invoice tracking and real-time inventory synchronization.
- **AI Capabilities**: Low-stock insights, due-payment tracking, automated priority alerts based on invoice ageing.`;
  }

  // Backend experience
  if (q.includes('backend') || q.includes('server') || q.includes('fastapi') || q.includes('api')) {
    return `### Backend Engineering Competencies

- **FastAPI & Python**: Built asynchronous REST APIs for applications like SmartTrack, handling request validation via Pydantic schemas and bridging external AI services.
- **Node.js & Express.js**: RESTful service design, middleware pipelines, CORS policy control, and proxy layers.
- **Databases**: Relational data modeling with PostgreSQL and MySQL, document stores with MongoDB, and cloud real-time persistence with Firebase Firestore.
- **API Standards**: Strict status code adherence, payload optimization, JWT authentication flows, and streaming SSE endpoints.

*Note: In his internship at Bluestock Fintech, Rahul worked strictly on frontend architecture and external API consumption; backend server architecture was separate.*`;
  }

  // GenAI / AI experience
  if (q.includes('genai') || q.includes('ai') || q.includes('gemini') || q.includes('llm') || q.includes('rag')) {
    return `### Applied Generative AI Experience

- **Gemini SDK Integration**: Implemented Google's official GenAI SDK to synthesize business metrics, inventory telemetry, and structured outputs.
- **SmartTrack AI Engine**: Created automated low-stock warnings, payment due summaries, and priority business alerts powered by Gemini.
- **Portfolio Intelligence (R//AI)**: Built a factual portfolio assistant with strict grounding guardrails preventing model hallucination.
- **RAG & Context Windows**: Structured domain knowledge injection and prompt engineering to keep AI responses accurate to verified specifications.`;
  }

  // Internship / Bluestock / Experience
  if (q.includes('experience') || q.includes('intern') || q.includes('bluestock') || q.includes('work history') || q.includes('job')) {
    const exp = PORTFOLIO_KNOWLEDGE_BASE.experiences[0];
    return `### Field Experience: ${exp.company}
- **Role**: ${exp.role} (${exp.period})
- **Location**: ${exp.location}
- **Stack**: React, Tailwind CSS, JavaScript/TypeScript, CoinGecko API
- **Deliverables**:
  * Engineered a real-time cryptocurrency price tracking dashboard with live updates, 24h trends, and interactive multi-timeframe charts.
  * Integrated CoinGecko REST endpoints for crypto metrics and market capitalization telemetry.
  * Implemented client-side caching to respect API quotas and maintain fluid 60fps UI performance.
- **Verified Scope**: Focused strictly on frontend engineering, reactive state management, and external API consumption. No backend server work was claimed.`;
  }

  // Tech stack / Technologies
  if (q.includes('tech') || q.includes('stack') || q.includes('technolog') || q.includes('skills') || q.includes('languages')) {
    return `### Rahul's Verified Tech DNA:

- **Languages**: C++, JavaScript, TypeScript, Python
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, FastAPI, REST APIs
- **Database**: MongoDB, MySQL, PostgreSQL, Firebase / Firestore
- **AI**: Gemini API, Generative AI, RAG, AI APIs
- **Tools**: Git, GitHub`;
  }

  // Resume
  if (q.includes('resume') || q.includes('cv') || q.includes('pdf') || q.includes('human document')) {
    return `Rahul's resume is available directly in the **05 / HUMAN DOCUMENT** section of this system.

You can inspect the full ATS-optimized document layout or download the clean copy immediately.
Direct contact: **rahulprasadkeshri5@gmail.com**`;
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('linkedin') || q.includes('github')) {
    return `### Establish Connection with Rahul Prasad Keshri:

- **Email**: [rahulprasadkeshri5@gmail.com](mailto:rahulprasadkeshri5@gmail.com)
- **LinkedIn**: [linkedin.com/in/rahulprasadkeshri](https://linkedin.com/in/rahulprasadkeshri)
- **GitHub**: [github.com/rahulprasadkeshri](https://github.com/rahulprasadkeshri)
- **Location**: India (Open to Remote & Relocation)
- **Status**: Available for Software Engineer, Full-Stack, and GenAI roles.`;
  }

  // Education
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('b.tech') || q.includes('study')) {
    const ed = PORTFOLIO_KNOWLEDGE_BASE.education[0];
    return `### Education
- **Degree**: ${ed.degree} in ${ed.major}
- **Timeline**: Graduated 2025
- **Focus Areas**: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), Operating Systems, Web Technologies, and Cloud Computing.`;
  }

  // Fallback if not verified in portfolio
  return `I don't have verified information about that in Rahul's portfolio.

You can query me about:
- Rahul's background and education
- Technical skills and Tech DNA
- SmartTrack and other verified systems
- Software Development Internship at Bluestock Fintech
- Backend and Generative AI capabilities
- Contact channels and resume access`;
}

// Unified client function that calls `/api/chat` (FastAPI or Express) with graceful verified fallback
export async function sendChatMessage(
  prompt: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<ChatResponsePayload> {
  // Use VITE_API_BASE_URL if configured, otherwise default to relative path '/api/chat'
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const endpoint = `${baseUrl}/api/chat`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout for server response

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, history }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return {
          reply: data.reply,
          source: data.source || 'gemini',
          grounded: true,
        };
      }
    }
  } catch (err) {
    // Network / server unavailable — fall back gracefully to verified deterministic portfolio intelligence
    console.debug('API server query failed, falling back to local Portfolio Intelligence engine', err);
  }

  // Fallback to strict factual knowledge base
  const fallbackReply = queryKnowledgeBaseDirect(prompt);
  return {
    reply: fallbackReply,
    source: 'knowledge_base',
    grounded: true,
  };
}
