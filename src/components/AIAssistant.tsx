import React, { useState, useEffect, useRef } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ChatMessage } from '../types/restaurant';
import {
  Sparkles,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Calendar,
  Utensils,
  ArrowRight,
  RefreshCw,
  Tag
} from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const {
    isAIChatOpen,
    closeAIChat,
    openAIChat,
    aiInitialPrompt,
    openReservationModal,
    navigateTo,
  } = useRestaurant();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: "Hello! I'm AIRA, your dining assistant at L'Aura Bistro & Artisan Roastery. How can I assist you with your table reservation, chef specials, or dietary preferences today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'What should I order?',
        'Show vegetarian dishes under ₹400',
        'Book a table for tonight',
        'What are today’s offers?',
        'Do you have valet parking?',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceAvailable(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          sendMessage(transcript);
        }
        setIsVoiceActive(false);
      };

      recog.onerror = () => {
        setIsVoiceActive(false);
      };

      recog.onend = () => {
        setIsVoiceActive(false);
      };

      recognitionRef.current = recog;
    }
  }, []);

  // Handle incoming initial prompt
  useEffect(() => {
    if (aiInitialPrompt && isAIChatOpen) {
      sendMessage(aiInitialPrompt);
    }
  }, [aiInitialPrompt, isAIChatOpen]);

  // Auto-scroll chat
  useEffect(() => {
    if (isAIChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAIChatOpen]);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isVoiceActive) {
      recognitionRef.current.stop();
      setIsVoiceActive(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsVoiceActive(true);
      } catch (err) {
        setIsVoiceActive(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput('');
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!res.ok) {
        throw new Error('Server response error');
      }

      const data = await res.json();
      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: data.reply || "I'd be pleased to help you further with our menu or reservations.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions,
        action: data.action,
      };

      setMessages((prev) => [...prev, agentMsg]);
      speakText(agentMsg.text);
    } catch (error) {
      // Local graceful fallback
      const fallbackMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: "I am ready to assist you! For reservations, dinner tables are available tonight from 7:00 PM. Our most popular dishes are the Truffle Tagliolini (₹490) and Wild Mushroom Risotto (₹540). Valet parking is complimentary.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Book a table', 'View full menu', 'Call restaurant'],
        action: { type: 'reserve', label: 'Book a Table' },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: any) => {
    if (action.type === 'reserve') {
      closeAIChat();
      openReservationModal();
    } else if (action.type === 'order' || action.type === 'view_menu') {
      closeAIChat();
      navigateTo('/menu');
    } else if (action.type === 'offer') {
      closeAIChat();
      navigateTo('/offers');
    }
  };

  return (
    <>
      {/* Floating AI Button at Bottom Right */}
      {!isAIChatOpen && (
        <button
          onClick={() => openAIChat()}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 p-1.5 pl-3 pr-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-semibold shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-400/40 cursor-pointer"
          aria-label="Open AIRA Dining Assistant"
        >
          {/* Animated Sparkling Orb */}
          <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-60" />
            <Sparkles className="w-4 h-4 text-amber-700 animate-pulse" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wider uppercase font-serif">
                AIRA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
            </div>
            <span className="text-[10px] text-stone-900 font-medium block -mt-0.5">
              Dining Assistant
            </span>
          </div>
        </button>
      )}

      {/* Slide-in AI Chat Drawer / Panel */}
      {isAIChatOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-[#0f1015] border-l border-zinc-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-950" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base flex items-center gap-2">
                  AIRA
                  <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    AI Concierge
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  L&apos;Aura Bistro Dining Guide &bull; Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              {/* Text-to-Speech Toggle */}
              <button
                onClick={() => setTtsEnabled(!ttsEnabled)}
                className={`p-2 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors ${
                  ttsEnabled ? 'text-amber-400' : 'text-zinc-500'
                }`}
                title={ttsEnabled ? 'Disable Voice Playback' : 'Enable Voice Playback'}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={closeAIChat}
                className="p-2 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  <span className="text-[10px] text-zinc-500 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Embedded Action Button */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action)}
                      className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 max-w-[90%]">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(suggestion)}
                          className="px-2.5 py-1 rounded-full text-xs bg-zinc-900/90 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/30 transition-colors text-left"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>AIRA is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Voice Controls */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-950/90">
            {isVoiceActive && (
              <div className="mb-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Listening... Speak your order or question</span>
                </div>
                <button
                  onClick={toggleVoice}
                  className="text-xs font-semibold text-rose-400 underline cursor-pointer"
                >
                  Stop
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for dishes, table booking, offers..."
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                />

                {voiceAvailable && (
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isVoiceActive
                        ? 'text-rose-400 bg-rose-500/20 animate-pulse'
                        : 'text-zinc-400 hover:text-amber-400'
                    }`}
                    title="Speak to AIRA"
                  >
                    {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[10px] text-zinc-500 text-center mt-2">
              AIRA is grounded in actual L&apos;Aura menu, prices, and policies.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
