import { TechCluster } from '../types';

export const TECH_DNA: TechCluster[] = [
  {
    category: "LANGUAGES",
    title: "Core Programming Languages",
    skills: [
      { name: "C++", level: "Core", context: "Data structures, algorithms, object-oriented paradigms, memory-conscious logic" },
      { name: "JavaScript", level: "Core", context: "Modern ES6+, asynchronous event loops, DOM manipulation, functional patterns" },
      { name: "TypeScript", level: "Core", context: "Strict typing, generics, interfaces, scalable enterprise frontend & backend code" },
      { name: "Python", level: "Applied", context: "FastAPI services, AI pipeline integration, scripting, data manipulation" }
    ]
  },
  {
    category: "FRONTEND",
    title: "Client-Side Engineering",
    skills: [
      { name: "React.js", level: "Core", context: "Component lifecycles, custom hooks, context, state orchestration, React 19" },
      { name: "Vite", level: "Core", context: "Rapid HMR builds, bundle optimization, modern ESM tooling" },
      { name: "Tailwind CSS", level: "Core", context: "Utility-first responsive layouts, theme extension, design systems" },
      { name: "Framer Motion", level: "Applied", context: "Hardware-accelerated micro-interactions, layout transitions, keyframes" }
    ]
  },
  {
    category: "BACKEND",
    title: "Server & API Architecture",
    skills: [
      { name: "FastAPI", level: "Applied", context: "High-throughput asynchronous Python endpoints, Pydantic schemas, OpenAPI docs" },
      { name: "Node.js", level: "Core", context: "Runtime environment, non-blocking I/O, server-side modules" },
      { name: "Express.js", level: "Core", context: "Middleware composition, REST routing, CORS configuration, proxy layers" },
      { name: "REST APIs", level: "Core", context: "Resource modeling, idempotency, status codes, JWT authentication flows" }
    ]
  },
  {
    category: "DATABASE",
    title: "Data Persistence & Storage",
    skills: [
      { name: "MongoDB", level: "Applied", context: "Document collections, aggregation pipelines, schema design" },
      { name: "MySQL", level: "Applied", context: "Relational schema design, SQL queries, indexing, foreign keys" },
      { name: "PostgreSQL", level: "Applied", context: "Relational integrity, complex joins, transactional workloads" },
      { name: "Firebase / Firestore", level: "Applied", context: "Real-time document sync, security rules, serverless authentication" }
    ]
  },
  {
    category: "AI",
    title: "Applied Generative AI",
    skills: [
      { name: "Gemini API", level: "Core", context: "Gemini 3 series SDK, multimodal prompts, structured JSON schema output" },
      { name: "Generative AI", level: "Applied", context: "Context window engineering, prompt grounding, zero-shot/few-shot design" },
      { name: "RAG", level: "Applied", context: "Retrieval-Augmented Generation, domain knowledge injection, factual boundaries" },
      { name: "AI APIs", level: "Applied", context: "Streaming completions, SSE responses, model telemetry & latency handling" }
    ]
  },
  {
    category: "TOOLS",
    title: "DevOps & Developer Tooling",
    skills: [
      { name: "Git", level: "Core", context: "Branching strategies, merge conflict resolution, interactive rebase, history audits" },
      { name: "GitHub", level: "Core", context: "CI/CD actions, pull requests, issue tracking, release automation" }
    ]
  }
];
