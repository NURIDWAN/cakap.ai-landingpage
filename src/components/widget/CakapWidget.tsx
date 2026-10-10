import React, { useState, useEffect } from 'react';
import { Message, Lead, BotConfig, KnowledgeItem } from '../../types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { LeadCaptureModal } from './LeadCaptureModal';
import { generateGeminiChat } from '../../services/geminiService';
import { INITIAL_KNOWLEDGE_ITEMS } from '../../data/defaultKnowledge';
import { Send, MessageSquare } from 'lucide-react';
import { SquircleIcon } from '../ui/SquircleIcon';

interface CakapWidgetProps {
  onLeadCaptured?: (lead: Lead) => void;
  onMessageLogged?: (msg: Message) => void;
  botConfig?: BotConfig;
  knowledgeBase?: KnowledgeItem[];
}

export const CakapWidget: React.FC<CakapWidgetProps> = ({
  onLeadCaptured,
  onMessageLogged,
  botConfig,
  knowledgeBase = INITIAL_KNOWLEDGE_ITEMS,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [activeModelName, setActiveModelName] = useState<string>('Google Gemini AI');

  // Default bot config fallback if not supplied from parent
  const activeBotConfig: BotConfig = botConfig || {
    id: 'bot-widget-default',
    name: 'Asisten Cakap (AI)',
    avatar: '',
    tone: 'ramah',
    language: 'Bahasa Indonesia',
    systemPrompt:
      'Anda adalah asisten AI resmi Cakap.ai. Bantu jelaskan fitur chatbot AI, integrasi WhatsApp Business, dan paket harga kami secara ramah dan profesional.',
    prohibitedTopics: ['pinjaman online', 'isu SARA'],
    handoffKeywords: ['bicara dengan agen', 'manusia', 'panggil cs', 'komplain'],
    greetingMessage:
      'Halo! Selamat datang di Cakap.ai 👋\nSaya asisten AI yang siap menjawab semua pertanyaan seputar fitur chatbot, koneksi WhatsApp, dan harga paket.',
    closingMessage: 'Terima kasih telah berkunjung ke Cakap.ai!',
    isActive: true,
    version: '1.2.0',
    updatedAt: '10 Okt 2026',
    geminiApiKey:
      (import.meta.env.VITE_GEMINI_API_KEY as string) ||
      localStorage.getItem('cakap_gemini_api_key') ||
      '',
    geminiModel:
      (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.5-flash',
  };

  const initialGreeting: Message = {
    id: 'w-msg-1',
    conversationId: 'widget-session',
    sender: 'bot',
    senderName: activeBotConfig.name,
    content:
      activeBotConfig.greetingMessage ||
      'Halo! Selamat datang di Cakap.ai 👋\nAda yang bisa saya bantu cekkan hari ini?',
    timestamp: 'Baru saja',
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('cakap_widget_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore error
    }
    return [initialGreeting];
  });

  useEffect(() => {
    try {
      localStorage.setItem('cakap_widget_messages', JSON.stringify(messages));
    } catch {
      // ignore error
    }
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `w-msg-${Date.now()}`,
      conversationId: 'widget-session',
      sender: 'customer',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    onMessageLogged?.(userMsg);

    // If currently in human agent takeover mode
    if (isAgentMode) {
      setIsTyping(true);
      setTimeout(() => {
        const agentReply: Message = {
          id: `w-msg-${Date.now() + 1}`,
          conversationId: 'widget-session',
          sender: 'agent',
          senderName: 'Raka (CS Agent)',
          content:
            'Terima kasih telah menunggu! Pesan Anda sudah diterima oleh tim CS kami. Ada yang bisa kami bantu jelaskan lebih lanjut kak?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, agentReply]);
        onMessageLogged?.(agentReply);
      }, 1000);
      return;
    }

    // Call Gemini AI
    setIsTyping(true);
    try {
      const response = await generateGeminiChat({
        message: text,
        history: messages,
        botConfig: activeBotConfig,
        knowledgeBase,
        apiKey: activeBotConfig.geminiApiKey,
        model: activeBotConfig.geminiModel,
      });

      setActiveModelName(response.modelUsed);

      if (response.triggerHandoff) {
        setIsAgentMode(true);
      }

      const botReply: Message = {
        id: `w-msg-${Date.now() + 1}`,
        conversationId: 'widget-session',
        sender: 'bot',
        senderName: activeBotConfig.name,
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceCitations: response.sourceCitation ? [response.sourceCitation] : undefined,
      };

      setMessages((prev) => [...prev, botReply]);
      onMessageLogged?.(botReply);
    } catch (err: any) {
      const fallbackReply: Message = {
        id: `w-msg-${Date.now() + 1}`,
        conversationId: 'widget-session',
        sender: 'bot',
        senderName: activeBotConfig.name,
        content: 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba kembali atau hubungi CS kami.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleHandoff = () => {
    setIsAgentMode(true);
    const systemMsg: Message = {
      id: `w-msg-${Date.now()}`,
      conversationId: 'widget-session',
      sender: 'system',
      content: 'Percakapan berhasil dialihkan ke antrean CS manusia.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const agentHello: Message = {
      id: `w-msg-${Date.now() + 1}`,
      conversationId: 'widget-session',
      sender: 'agent',
      senderName: 'Raka (CS)',
      content:
        'Halo! Saya Raka dari tim Customer Support Cakap.ai. Senang bisa terhubung langsung dengan Anda. Ada kendala atau pertanyaan yang bisa saya bantu jawabkan?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, systemMsg, agentHello]);
  };

  const handleReset = () => {
    setMessages([initialGreeting]);
    setIsAgentMode(false);
    try {
      localStorage.removeItem('cakap_widget_messages');
    } catch {
      // ignore
    }
  };

  const handleLeadCapture = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      status: 'Baru',
      createdAt: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    onLeadCaptured?.(newLead);
    setLeadCaptured(true);
    setShowLeadForm(false);

    const thanksMsg: Message = {
      id: `w-msg-${Date.now()}`,
      conversationId: 'widget-session',
      sender: 'system',
      content: `Terima kasih Kak ${newLead.name}! Kontak Anda berhasil tersimpan.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, thanksMsg]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Proactive Balloon if closed */}
      {!isOpen && hasUnread && (
        <div
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          className="mb-3 bg-canvas border border-hairline p-3 rounded-2xl cursor-pointer max-w-[260px] text-xs text-ink transition-all hover:bg-canvas-soft select-none flex items-start gap-2.5"
        >
          <SquircleIcon size="sm" className="bg-ink text-on-primary">
            <span className="text-[10px] font-bold">C</span>
          </SquircleIcon>
          <div>
            <p className="font-semibold text-xs">Tanya Gemini AI</p>
            <p className="text-text-muted text-[11px] mt-0.5">
              Tanyakan harga, fitur, atau stok produk ke asisten pintar kami.
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHasUnread(false);
            }}
            className="text-text-faint hover:text-ink text-xs p-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating launcher stadium pill */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          className="h-14 px-5 bg-ink text-on-primary rounded-full flex items-center gap-2.5 hover:bg-ink-soft transition-all active:scale-95 group select-none border-0"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-on-primary" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-ink" />
            )}
          </div>
          <span className="text-sm font-semibold tracking-tight">Tanya Cakap</span>
        </button>
      ) : (
        /* Expanded Chat Panel */
        <div className="w-[92vw] sm:w-[380px] h-[540px] max-h-[85vh] bg-canvas border border-hairline rounded-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <ChatHeader
            onClose={() => setIsOpen(false)}
            onReset={handleReset}
            onHandoff={handleHandoff}
            isAgentMode={isAgentMode}
            modelName={activeModelName}
          />

          {showLeadForm && !leadCaptured ? (
            <LeadCaptureModal
              onCapture={handleLeadCapture}
              onSkip={() => setShowLeadForm(false)}
            />
          ) : !leadCaptured && messages.length > 2 ? (
            <div className="bg-canvas-soft px-4 py-2 border-b border-hairline-soft flex items-center justify-between text-xs">
              <span className="text-text-muted">Mau follow-up otomatis?</span>
              <button
                type="button"
                onClick={() => setShowLeadForm(true)}
                className="text-xs font-semibold text-ink underline"
              >
                Isi Kontak
              </button>
            </div>
          ) : null}

          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            onQuickReply={(q) => handleSendMessage(q)}
            showQuickReplies={messages.length <= 3 && !isAgentMode}
          />

          {/* Chat Input Field */}
          <div className="p-3 bg-canvas border-t border-hairline-soft">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={
                  isAgentMode ? 'Ketik pesan ke CS kami...' : 'Tanyakan apa saja ke Gemini AI...'
                }
                disabled={isTyping}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-ink transition-all border-0"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-ink text-on-primary disabled:opacity-40 hover:bg-ink-soft flex items-center justify-center transition-all flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
