import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { FULL_KNOWLEDGE_BASE, queryKnowledgeBaseDirect } from './src/data/knowledgeBase';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiEngine: process.env.GEMINI_API_KEY ? 'gemini-3.8-flash' : 'deterministic-kb',
  });
});

// Primary Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message string is required' });
    }

    const ai = getGeminiClient();

    // If no Gemini API key configured, use deterministic grounded KB engine
    if (!ai) {
      const fallbackReply = queryKnowledgeBaseDirect(message);
      return res.json({
        reply: fallbackReply,
        model: 'deterministic-knowledge-base',
        grounded: true,
      });
    }

    // Call Gemini API with strict system grounding
    const systemPrompt = `You are R//AI, the specialized, highly intelligent portfolio AI assistant for Rahul Prasad Keshri.
Your goal is to assist recruiters, engineering managers, and technical evaluators who visit his portfolio.

CRITICAL OPERATIONAL RULES:
1. Ground every answer STRICTLY and EXCLUSIVELY in the following verified portfolio knowledge base.
2. If the user asks about something not contained in this knowledge base, respond honestly: "I don't have verified information about that in Rahul's portfolio."
3. NEVER invent or hallucinate companies, job titles, achievements, metrics, degrees, or experience.
4. Rahul's verified internship was at Bluestock Fintech as a Software Development Intern (June-July 2025). His work was on a real-time crypto price tracking dashboard with React and CoinGecko API. Do NOT claim backend or database development for this internship.
5. His major full-stack and GenAI project is SmartTrack (AI Inventory & Billing Management System). Mention its verified capabilities: low-stock alerts, overdue payment tracking, and AI-assisted restocking summaries.
6. Tone: technical, intelligent, respectful, direct, recruiter-friendly, and concise.

VERIFIED KNOWLEDGE BASE:
${FULL_KNOWLEDGE_BASE}`;

    const formattedHistory = Array.isArray(history)
      ? history.map((item: any) => ({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }],
        }))
      : [];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    });

    const replyText = response.text || queryKnowledgeBaseDirect(message);

    return res.json({
      reply: replyText,
      model: 'gemini-3.8-flash',
      grounded: true,
    });
  } catch (error: any) {
    console.error('Gemini API Error in /api/chat:', error);
    // Fallback safely to knowledge base query without breaking user experience
    const fallbackReply = queryKnowledgeBaseDirect(req.body.message || '');
    return res.json({
      reply: fallbackReply,
      model: 'fallback-deterministic-kb',
      grounded: true,
    });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Digital System Server online at http://localhost:${PORT}`);
  });
}

startServer();
