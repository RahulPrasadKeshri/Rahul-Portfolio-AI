import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Rahul Prasad Keshri — System Intelligence API",
    description="FastAPI backend powering R//AI Portfolio Intelligence and candidate interrogation",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    reply: str
    grounded: bool = True
    model: str = "gemini-3.8-flash"

SYSTEM_FACTS = """
CANDIDATE PROFILE:
Name: Rahul Prasad Keshri
Roles: Software Engineer | Full-Stack Developer | GenAI Builder
Location: Dhanbad, Jharkhand, India
Education: B.Tech in Computer Science & Engineering (Graduating 2025) from Asansol Engineering College.
Email: rahulprasadkeshri5@gmail.com
LinkedIn: https://linkedin.com/in/rahulprasadkeshri
GitHub: https://github.com/rahulprasadkeshri
Portfolio: https://rahulprasadkeshri.dev

FIELD EXPERIENCE:
Company: Bluestock Fintech
Role: Software Development Intern
Period: June 2025 – July 2025
Location: Pune, Maharashtra, India (Remote/Hybrid)
Audited Work: Built a real-time cryptocurrency price tracking dashboard consuming the CoinGecko API.
Tech Stack: React, Tailwind CSS, CoinGecko API.
SCOPE RESTRICTION: Bluestock was frontend and API consumption only. No backend/database work at Bluestock.

VERIFIED SYSTEMS:
1. SmartTrack: AI Inventory & Billing Management System.
Stack: React, TypeScript, Tailwind CSS, FastAPI, Gemini API, Firebase Firestore.
Features: Inventory ledger, invoice generation, customer accounts, AI low-stock forecasting, due-payment alerts.
2. Bluestock Crypto Pulse: Real-time financial telemetry dashboard with interactive charts and trending cryptos.
3. R//AI Portfolio System: Intelligent digital portfolio system with deterministic grounding.
"""

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "system": "R//SYS FastAPI Core",
        "gemini_configured": bool(os.getenv("GEMINI_API_KEY")),
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not request.message:
        raise HTTPException(status_code=400, detail="Message is required")

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return ChatResponse(
            reply="Rahul Prasad Keshri is a Software Engineer, Full-Stack Developer, and GenAI Builder with a B.Tech in Computer Science & Engineering (2025). He interned at Bluestock Fintech building a real-time crypto dashboard with React, and engineered SmartTrack (an AI Inventory & Billing system using React, FastAPI, and Gemini).",
            grounded=True,
            model="deterministic-fallback",
        )

    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        
        system_instruction = (
            "You are R//AI, the specialized portfolio AI assistant for Rahul Prasad Keshri. "
            "Only answer using the following verified facts. Never invent companies, job titles, or metrics. "
            f"FACTS:\n{SYSTEM_FACTS}"
        )
        
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=request.message,
            config={"system_instruction": system_instruction, "temperature": 0.2},
        )
        
        return ChatResponse(
            reply=response.text or "I don't have verified information about that in Rahul's portfolio.",
            grounded=True,
            model="gemini-3.8-flash",
        )
    except Exception as e:
        return ChatResponse(
            reply="I don't have verified information about that in Rahul's portfolio.",
            grounded=True,
            model="fallback",
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
