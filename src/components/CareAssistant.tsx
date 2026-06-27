import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { MessageSquare, Search, Send, Loader2, Sparkles, HelpCircle, ExternalLink, RefreshCw } from 'lucide-react';

export default function CareAssistant() {
  const [activeTab, setActiveTab] = useState<'qa' | 'search'>('qa');
  
  // Tab A: Q&A States
  const [qaInput, setQaInput] = useState('');
  const [qaMessages, setQaMessages] = useState<ChatMessage[]>([]);
  const [qaLoading, setQaLoading] = useState(false);

  // Tab B: Search Explorer States
  const [searchInput, setSearchInput] = useState('');
  const [searchMessages, setSearchMessages] = useState<ChatMessage[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const qaEndRef = useRef<HTMLDivElement>(null);
  const searchEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom helper
  useEffect(() => {
    qaEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [qaMessages, qaLoading]);

  useEffect(() => {
    searchEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [searchMessages, searchLoading]);

  // Seed initial system messages
  useEffect(() => {
    setQaMessages([
      {
        id: 'qa_init',
        role: 'model',
        text: "Hello! I am your Nail to Tails Home Care Assistant. Ask me anything about home brushing, matting management, bathing tricks, or claw maintenance!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setSearchMessages([
      {
        id: 'search_init',
        role: 'model',
        text: "Welcome to the Local Pet Explorer! Powered by Google Search, I can track down nearby dog-friendly cafes, off-leash dog parks, seasonal pet festivals, or real-time local animal regulations. Try typing: 'Find dog-friendly spots in Chicago'.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Submit Handler Q&A
  const handleQaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim() || qaLoading) return;

    const userMsg: ChatMessage = {
      id: 'qa_u_' + Date.now(),
      role: 'user',
      text: qaInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setQaMessages((prev) => [...prev, userMsg]);
    setQaInput('');
    setQaLoading(true);

    try {
      // Pass the existing message history as context
      const historyCtx = qaMessages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat-lite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: historyCtx,
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Q&A failed.");
      }

      const modelMsg: ChatMessage = {
        id: 'qa_m_' + Date.now(),
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setQaMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setQaMessages((prev) => [
        ...prev,
        {
          id: 'qa_err_' + Date.now(),
          role: 'model',
          text: "My apologies, I had trouble reaching the salon desk just now. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setQaLoading(false);
    }
  };

  // Submit Handler Search Grounding
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim() || searchLoading) return;

    const userMsg: ChatMessage = {
      id: 'se_u_' + Date.now(),
      role: 'user',
      text: searchInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSearchMessages((prev) => [...prev, userMsg]);
    setSearchInput('');
    setSearchLoading(true);

    try {
      const response = await fetch('/api/chat-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Search grounding failed.");
      }

      const modelMsg: ChatMessage = {
        id: 'se_m_' + Date.now(),
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingSources: data.groundingSources || []
      };

      setSearchMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setSearchMessages((prev) => [
        ...prev,
        {
          id: 'se_err_' + Date.now(),
          role: 'model',
          text: "I had an issue scanning the local search grids. Ensure your internet connection and API keys are functioning.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearChat = () => {
    if (activeTab === 'qa') {
      setQaMessages([
        {
          id: 'qa_init',
          role: 'model',
          text: "History cleared. Ask me another question about home brushing, baths, or paws!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else {
      setSearchMessages([
        {
          id: 'search_init',
          role: 'model',
          text: "Search history cleared. Ask me about local dog events, friendly spots, or parks!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 border-b border-stone-200/50 animate-fade-in" id="assistant-section">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 relative">
        <div className="inline-block bg-[#E6F3F2] text-teal-800 border border-teal-200 text-xs uppercase tracking-widest px-4 py-1.5 rounded rotate-[-1deg] mb-4 font-mono shadow-xs">
          💬 Care Console 💬
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal italic text-charcoal">
          Care Assistant &amp; Local Explorer
        </h2>
        <p className="text-stone-500 font-sans mt-3 text-sm md:text-base">
          Connect with our instant home-maintenance Q&amp;A chatbot, or use Google Search grounded queries to search for local dog venues, cafes, and rules.
        </p>
      </div>

      {/* Main Double Tab Layout Container */}
      <div className="max-w-4xl mx-auto paper-card bg-white rounded-sm overflow-hidden border border-stone-200 shadow-sm">
        
        {/* Tab Headers styled as physical folders */}
        <div className="flex bg-stone-100 border-b border-stone-200 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 border-r border-stone-200/60 cursor-pointer transition-colors ${
              activeTab === 'qa' 
                ? 'bg-white text-sage border-t-2 border-t-sage' 
                : 'text-stone-500 hover:bg-stone-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Instant Pet Care Q&amp;A (Low Latency)</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'search' 
                ? 'bg-white text-terracotta border-t-2 border-t-terracotta' 
                : 'text-stone-500 hover:bg-stone-50'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Local Guides &amp; Explorer (Google Grounded)</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 bg-stone-50/40 min-h-[400px] flex flex-col justify-between">
          
          {/* Header detail with clear action */}
          <div className="flex justify-between items-center border-b border-stone-200 pb-3 mb-4 text-xs font-mono text-stone-400">
            <span>
              {activeTab === 'qa' 
                ? 'DESK: INSTANT HOME BRUSHING & COAT FAQ' 
                : 'DESK: REAL-TIME INTERNET PET SEARCH'}
            </span>
            <button 
              onClick={handleClearChat}
              className="hover:text-terracotta transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Clear History
            </button>
          </div>

          {/* Tab A: Pet Care Q&A Chat */}
          {activeTab === 'qa' && (
            <div className="flex flex-col flex-grow justify-between">
              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 flex-grow mb-6 text-left">
                {qaMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] ${
                      msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className={`p-3.5 rounded-sm text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sage text-white rounded-br-none shadow-sm'
                        : 'bg-white text-stone-700 border border-stone-200 rounded-bl-none shadow-xs'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-stone-400 font-mono mt-1">{msg.timestamp}</span>
                  </div>
                ))}

                {qaLoading && (
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-mono mr-auto bg-white border border-stone-200 p-3 rounded-sm shadow-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-sage" />
                    <span>Stylist typing...</span>
                  </div>
                )}
                <div ref={qaEndRef} />
              </div>

              {/* Form Input */}
              <form onSubmit={handleQaSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={qaInput}
                  onChange={(e) => setQaInput(e.target.value)}
                  placeholder="Ask e.g. 'How often should I bath my poodle?', 'Is human shampoo safe?'"
                  className="flex-1 bg-white border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded-sm px-4 py-3 text-xs outline-none transition-all"
                  disabled={qaLoading}
                />
                <button
                  type="submit"
                  disabled={qaLoading || !qaInput.trim()}
                  className="bg-sage text-white p-3 rounded-sm hover:bg-sage/95 disabled:bg-stone-200 disabled:cursor-not-allowed transition-all btn-stamp flex items-center justify-center cursor-pointer shadow-flat-sage hover:translate-y-[-1px] font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab B: Search Explorer Chat */}
          {activeTab === 'search' && (
            <div className="flex flex-col flex-grow justify-between">
              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 flex-grow mb-6 text-left">
                {searchMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] ${
                      msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className={`p-3.5 rounded-sm text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-terracotta text-white rounded-br-none shadow-sm'
                        : 'bg-white text-stone-700 border border-stone-200 rounded-bl-none shadow-xs whitespace-pre-line'
                    }`}>
                      {msg.text}

                      {/* Display Grounded Search Sources */}
                      {msg.groundingSources && msg.groundingSources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-dashed border-stone-100">
                          <p className="text-[9px] font-mono font-bold tracking-widest text-stone-400 uppercase mb-2">Search Sources &amp; References:</p>
                          <div className="space-y-1.5">
                            {msg.groundingSources.map((source, idx) => (
                              <a 
                                key={idx}
                                href={source.uri}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] text-terracotta hover:underline font-medium bg-orange-50/70 py-1 px-2.5 rounded-sm border border-orange-100 mr-2 max-w-full truncate"
                              >
                                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                <span className="truncate">{source.title || source.uri}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-stone-400 font-mono mt-1">{msg.timestamp}</span>
                  </div>
                ))}

                {searchLoading && (
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-mono mr-auto bg-white border border-stone-200 p-3 rounded-sm shadow-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-terracotta" />
                    <span>Searching Google databases...</span>
                  </div>
                )}
                <div ref={searchEndRef} />
              </div>

              {/* Form Input */}
              <form onSubmit={handleSearchSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Ask e.g. 'Dog friendly coffee shops in Austin', 'Latest dog food safety alerts 2026'"
                  className="flex-1 bg-white border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded-sm px-4 py-3 text-xs outline-none transition-all"
                  disabled={searchLoading}
                />
                <button
                  type="submit"
                  disabled={searchLoading || !searchInput.trim()}
                  className="bg-terracotta text-white p-3 rounded-sm hover:bg-terracotta/95 disabled:bg-stone-200 disabled:cursor-not-allowed transition-all btn-stamp flex items-center justify-center cursor-pointer shadow-flat-terracotta hover:translate-y-[-1px] font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
