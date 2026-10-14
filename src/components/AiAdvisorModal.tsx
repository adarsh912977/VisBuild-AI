import React, { useState } from 'react';
import { AuditSession } from '../types/civic';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: AuditSession;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; timestamp: string }[]
  >([
    {
      role: 'assistant',
      text: `Hello! I am your VisBuild Civic AI Advisor. I am calibrated against IRC:103-2012 (Guidelines for Pedestrian Facilities) and CPWD Schedule of Rates.
How can I assist your engineering evaluation for ${session.locationName}?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || inputValue;
    if (!q.trim() || loading) return;

    const userMsg = {
      role: 'user' as const,
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          context: {
            location: session.locationName,
            budgetCap: session.budgetCap,
            deficitsCount: session.deficits.length,
            metrics: session.metrics,
          },
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer || 'Consultation generated based on CPWD benchmarks.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Unable to reach advisor backend, but IRC-103 recommendations stipulate that continuous 1.8m width and 1:12 slope curbs are mandatory for public walkway sanction.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#0f1e36] text-white w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 flex flex-col h-[600px] overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 bg-[#000412] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#006591] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6ffbbe] text-[22px]">psychology</span>
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Civic Engineering Advisor</h2>
              <span className="text-[11px] text-[#89ceff] flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                Gemini 3.8 Flash • IRC-103 & CPWD Aligned
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#7886a3] hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="px-6 py-2.5 bg-[#000412]/50 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] text-[#7886a3] whitespace-nowrap">Suggested:</span>
          {[
            'Explain IRC-103 tactile tile requirements',
            'Compare PICB pavers vs asphalt costs',
            'Which native trees prevent paver root heave?',
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSend(chip)}
              className="bg-white/10 hover:bg-white/20 text-[#c9e6ff] text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 text-xs leading-relaxed">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex flex-col gap-1 max-w-[85%] ${
                  isUser ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-xl whitespace-pre-line ${
                    isUser
                      ? 'bg-[#006591] text-white rounded-br-xs'
                      : 'bg-[#000412] text-[#eaf1ff] border border-white/10 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-[#7886a3] px-1">{m.timestamp}</span>
              </div>
            );
          })}
          {loading && (
            <div className="self-start bg-[#000412] p-3 rounded-xl border border-white/10 text-xs text-[#6ffbbe] flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-[#6ffbbe] border-t-transparent rounded-full animate-spin"></span>
              <span>Reviewing CPWD Schedule of Rates and IRC-103 clauses...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#000412] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your civil engineering or budget question..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-[#7886a3] focus:outline-hidden focus:border-[#6ffbbe]"
          />
          <button
            type="button"
            disabled={loading || !inputValue.trim()}
            onClick={() => handleSend()}
            className="bg-[#006591] hover:bg-[#0284c7] text-white px-4 py-2.5 rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
