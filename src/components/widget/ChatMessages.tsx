import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import { cleanBotOutput } from '../../services/geminiService';
import { Info, Sparkles, User } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onQuickReply: (query: string) => void;
  showQuickReplies: boolean;
}

const QUICK_REPLIES = [
  'Berapa harga paket Cakap.ai?',
  'Bagaimana cara konek WhatsApp?',
  'Apakah ada trial gratis?',
  'Bisa bicara dengan agen manusia?',
];

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  onQuickReply,
  showQuickReplies,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3.5 no-scrollbar">
      {messages.map((msg) => {
        const isCustomer = msg.sender === 'customer';
        const isSystem = msg.sender === 'system';
        const isAgent = msg.sender === 'agent';

        if (isSystem) {
          return (
            <div key={msg.id} className="flex justify-center my-2">
              <span className="text-[11px] bg-canvas-soft border border-hairline-soft text-text-muted px-3 py-1 rounded-full text-center max-w-[85%]">
                {msg.content}
              </span>
            </div>
          );
        }

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              {isCustomer ? (
                <span className="text-[10px] text-text-muted font-medium">Anda</span>
              ) : isAgent ? (
                <span className="text-[10px] text-ink font-semibold flex items-center gap-1">
                  <User className="w-3 h-3" /> {msg.senderName || 'Agen CS'}
                </span>
              ) : (
                <span className="text-[10px] text-ink font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-ink" /> Asisten Cakap
                </span>
              )}
              <span className="text-[10px] text-text-faint">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[88%] text-xs sm:text-sm leading-relaxed p-3.5 ${
                isCustomer
                  ? 'bg-ink text-on-primary rounded-2xl rounded-tr-sm'
                  : isAgent
                  ? 'bg-canvas-soft border border-hairline text-ink rounded-2xl rounded-tl-sm'
                  : 'bg-canvas-soft text-ink rounded-2xl rounded-tl-sm border border-hairline-soft'
              }`}
            >
              <p className="whitespace-pre-wrap">{cleanBotOutput(msg.content)}</p>

              {msg.sourceCitations && msg.sourceCitations.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-hairline-soft flex items-center gap-1 text-[10px] text-text-muted">
                  <Info className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Sumber: {cleanBotOutput(msg.sourceCitations[0])}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="flex flex-col items-start">
          <div className="bg-canvas-soft border border-hairline-soft text-ink rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-bounce" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-bounce"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      )}

      {showQuickReplies && !isTyping && (
        <div className="pt-2">
          <p className="text-[11px] text-text-muted font-medium mb-2">
            Pertanyaan cepat:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((query, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onQuickReply(query)}
                className="bg-canvas text-ink border border-hairline hover:bg-canvas-soft text-xs font-medium px-3 py-1.5 rounded-full transition-all text-left"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
