import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../data/site';
import { WhatsAppLogo } from './BrandLogo';

interface ChatMessage {
  role: 'agent' | 'user';
  text: string;
}

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'agent',
      text: 'Assalam-o-Alaikum! Main HexaHive Tech ka AI assistant hoon. Hum 10 specialized AI solutions banate hain (Voice Receptionist, WhatsApp Sales, Real Estate AI, HR, SafeHer B2B, Restaurant, E-Commerce, Education, Legal, aur AI Websites). Aap kis baare mein poochna chahenge?',
    },
  ]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text:
            data.reply ||
            'Hum 72 ghanton mein free prototype demo banate hain. Aap WhatsApp par rabta kar sakte hain!',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text: 'Network error — aap seedha WhatsApp button click kar ke hamari Karachi team se baat kar sakte hain.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'All 10 services?',
    'Real Estate AI?',
    'PKR Pricing?',
  ];

  return (
    <>
      {/* Floating Official WhatsApp Logo Button (Bottom Left) */}
      <a
        href={getWhatsAppUrl('Assalam-o-Alaikum HexaHive Tech! I want to book a free AI agent demo.')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 z-40 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-[#FFFFFF] shadow-lg hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppLogo className="w-6 h-6" />
      </a>

      {/* Corner AI Chat Widget ("Ask our agent") */}
      <div className="fixed bottom-4 right-4 z-50">
        {isOpen ? (
          <div
            role="dialog"
            aria-label="HexaHive AI Agent Chat"
            className="w-[330px] sm:w-[370px] bg-[#FFFFFF] dark:bg-[#122220] border-2 border-[#0E3B3A] dark:border-[#F2A900] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0E3B3A] text-[#F1F5F3] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2A900]" />
                <div>
                  <p className="font-display font-bold text-sm leading-none">
                    HexaHive Demo Agent
                  </p>
                  <p className="text-[11px] text-[#F1F5F3]/75 font-mono-tabular mt-0.5">
                    Karachi · Roman Urdu & EN
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-[#F1F5F3]/80 hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Close AI chat widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="p-3.5 space-y-3 max-h-[290px] overflow-y-auto bg-[#F1F5F3]/60 dark:bg-[#0B1514]/60 text-xs sm:text-sm">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#0E3B3A] text-[#F1F5F3]'
                        : 'bg-[#FFFFFF] dark:bg-[#122220] text-[#12211F] dark:text-[#F1F5F3] border border-[#CFDAD6] dark:border-[#1F3835]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-xs font-mono-tabular text-[#12211F]/60 dark:text-[#F1F5F3]/60 px-2">
                  HexaHive Agent is typing...
                </div>
              )}
            </div>

            {/* Quick Prompt Buttons */}
            <div className="px-3 py-2 bg-[#FFFFFF] dark:bg-[#122220] border-t border-[#CFDAD6] dark:border-[#1F3835] flex flex-wrap gap-1.5">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#F1F5F3] dark:bg-[#0B1514] text-[#12211F] dark:text-[#F1F5F3] hover:bg-[#F2A900] hover:text-[#12211F] transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-2.5 bg-[#FFFFFF] dark:bg-[#122220] border-t border-[#CFDAD6] dark:border-[#1F3835] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English or Roman Urdu..."
                aria-label="Message our AI agent"
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#F1F5F3] dark:bg-[#0B1514] text-[#12211F] dark:text-[#F1F5F3] border border-[#CFDAD6] dark:border-[#1F3835]"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2 rounded-lg bg-[#F2A900] text-[#12211F] hover:bg-[#d99700] transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#0E3B3A] text-[#F1F5F3] dark:bg-[#F2A900] dark:text-[#12211F] font-display font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer border border-[#F2A900]"
          >
            <Sparkles className="w-4 h-4 text-[#F2A900] dark:text-[#12211F]" />
            <span>Ask our agent</span>
            <MessageSquare className="w-4 h-4 opacity-80" />
          </button>
        )}
      </div>
    </>
  );
};
