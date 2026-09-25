import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, ShieldCheck, CornerDownLeft, Trash2, Copy, Check, MessageSquare, Terminal, Minimize2, Maximize2 } from 'lucide-react';
import { sendChatMessage } from '../services/ai';
import { ChatMessage } from '../types';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const SUGGESTED_PROMPTS = [
  "Who is Rahul?",
  "Summarize Rahul in 30 seconds.",
  "Show me Rahul's strongest projects.",
  "What is Rahul's backend experience?",
  "What GenAI work has Rahul done?",
  "Explain SmartTrack.",
  "What technologies does Rahul use?",
  "Show me the resume.",
  "How can I contact Rahul?",
];

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: `I am **R//AI**, the specialized portfolio intelligence assistant for **Rahul Prasad Keshri**.

My knowledge is strictly grounded in Rahul's verified technical dossier, project architecture, field experience, and engineering credentials.

How may I assist your technical evaluation?`,
      timestamp: 'SYSTEM ONLINE',
      groundedInKnowledge: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle initial prompt passed from other sections
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build brief history format
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.content,
      }));

      const res = await sendChatMessage(promptText, historyPayload);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedInKnowledge: res.grounded,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: `I don't have verified information about that in Rahul's portfolio.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedInKnowledge: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        content: `Conversation reset. Ask any question about Rahul's systems, stack, or field experience.`,
        timestamp: 'RESET',
        groundedInKnowledge: true,
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`pointer-events-auto flex flex-col w-full ${
          isMaximized 
            ? 'h-[92vh] max-w-4xl' 
            : 'h-[85vh] sm:h-[650px] sm:max-w-xl'
        } bg-[#080A10]/95 border border-white/20 sm:rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden font-sans transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#0C0F17] flex items-center justify-between text-xs font-mono select-none">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0C0F17]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-white tracking-wider">
                <span>R//AI</span>
                <span className="text-[10px] text-cyan-400 border border-cyan-500/30 px-1.5 py-0.2 rounded font-normal">
                  PORTFOLIO INTELLIGENCE
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                <span className="text-emerald-400">● ONLINE</span>
                <span>— Ask the portfolio.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              title="Reset conversation"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? "Restore window" : "Maximize window"}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden sm:block"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              title="Close R//AI"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Knowledge Guardrail Banner */}
        <div className="px-4 py-1.5 bg-cyan-950/25 border-b border-cyan-500/20 font-mono text-[10px] text-cyan-300/80 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>STRICT GROUNDING: ZERO HALLUCINATED METRICS OR EMPLOYMENT</span>
          </span>
          <span className="hidden sm:inline text-neutral-400">MODEL: GEMINI 3 FLASH</span>
        </div>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-6 h-6 rounded-md bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed relative group ${
                    isAssistant
                      ? 'bg-[#10141F] border border-white/10 text-neutral-200 shadow-md'
                      : 'bg-cyan-500 text-slate-950 font-medium'
                  }`}
                >
                  <div className="whitespace-pre-line break-words leading-relaxed text-xs sm:text-sm">
                    {msg.content}
                  </div>

                  {/* Metadata and copy action */}
                  <div className={`mt-2 pt-1.5 border-t flex items-center justify-between font-mono text-[10px] ${
                    isAssistant ? 'border-white/10 text-neutral-400' : 'border-black/10 text-slate-900'
                  }`}>
                    <span>{msg.timestamp}</span>

                    {isAssistant && (
                      <button
                        onClick={() => handleCopyMessage(msg.content, msg.id)}
                        className="opacity-60 hover:opacity-100 flex items-center gap-1 text-[10px] cursor-pointer"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-6 h-6 rounded-md bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Bot className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-[#10141F] border border-white/10 rounded-xl p-3 text-neutral-400 font-mono text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Interrogating knowledge base...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Horizontal Bar */}
        <div className="px-4 py-2 border-t border-white/5 bg-[#0A0D14] overflow-x-auto scrollbar-none flex items-center gap-2 select-none">
          <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap shrink-0">
            PROMPTS:
          </span>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-500/40 text-neutral-300 hover:text-cyan-300 font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-white/10 bg-[#090C12] flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Rahul's verified portfolio..."
              className="w-full bg-[#05070B] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-cyan-400 font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="px-4 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono shrink-0"
          >
            <span>TRANSMIT</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
