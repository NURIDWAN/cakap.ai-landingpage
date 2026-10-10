import React, { useState } from 'react';
import { Conversation, Message } from '../../types';
import { cleanBotOutput } from '../../services/geminiService';
import { Button } from '../ui/Button';
import { SquircleIcon } from '../ui/SquircleIcon';
import {
  MessageSquare,
  Globe,
  UserCheck,
  RotateCcw,
  CheckCircle2,
  Send,
  Plus,
  StickyNote,
  Info,
} from 'lucide-react';

interface InboxViewProps {
  conversations: Conversation[];
  onUpdateConversation: (updated: Conversation) => void;
  onSimulateIncoming: () => void;
}

export const InboxView: React.FC<InboxViewProps> = ({
  conversations,
  onUpdateConversation,
  onSimulateIncoming,
}) => {
  const [selectedId, setSelectedId] = useState<string>(conversations[0]?.id || '');
  const [channelFilter, setChannelFilter] = useState<'all' | 'whatsapp' | 'widget'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [replyText, setReplyText] = useState('');
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');

  const selectedConv = conversations.find((c) => c.id === selectedId) || conversations[0];

  const filteredConversations = conversations.filter((c) => {
    if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  const handleTakeover = () => {
    if (!selectedConv) return;
    const systemMsg: Message = {
      id: `sys-${Date.now()}`,
      conversationId: selectedConv.id,
      sender: 'system',
      content: 'Agen (Raka) telah mengambil alih percakapan dari AI Bot.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated: Conversation = {
      ...selectedConv,
      status: 'agent',
      assignedAgent: 'Raka (Admin)',
      messages: [...selectedConv.messages, systemMsg],
    };
    onUpdateConversation(updated);
  };

  const handleReturnToBot = () => {
    if (!selectedConv) return;
    const systemMsg: Message = {
      id: `sys-${Date.now()}`,
      conversationId: selectedConv.id,
      sender: 'system',
      content: 'Percakapan dikembalikan ke penanganan AI Bot.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated: Conversation = {
      ...selectedConv,
      status: 'bot',
      messages: [...selectedConv.messages, systemMsg],
    };
    onUpdateConversation(updated);
  };

  const handleResolve = () => {
    if (!selectedConv) return;
    const updated: Conversation = {
      ...selectedConv,
      status: 'resolved',
    };
    onUpdateConversation(updated);
  };

  const handleSendAgentReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConv) return;

    const agentMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConv.id,
      sender: 'agent',
      senderName: 'Raka (CS)',
      content: replyText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated: Conversation = {
      ...selectedConv,
      status: 'agent',
      lastMessage: agentMsg.content,
      lastMessageTime: 'Baru saja',
      messages: [...selectedConv.messages, agentMsg],
    };

    onUpdateConversation(updated);
    setReplyText('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedConv) return;
    const currentNotes = selectedConv.internalNotes || [];
    const updated: Conversation = {
      ...selectedConv,
      internalNotes: [...currentNotes, newNote.trim()],
    };
    onUpdateConversation(updated);
    setNewNote('');
  };

  return (
    <div className="bg-canvas border border-hairline-soft rounded-md overflow-hidden flex flex-col h-[740px]">
      {/* Top Toolbar */}
      <div className="bg-canvas-soft border-b border-hairline-soft p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Channel Filters */}
          <div className="bg-canvas p-1 rounded-full border border-hairline-soft inline-flex items-center text-xs">
            <button
              onClick={() => setChannelFilter('all')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                channelFilter === 'all' ? 'bg-ink text-on-primary' : 'text-text-muted hover:text-ink'
              }`}
            >
              Semua Kanal
            </button>
            <button
              onClick={() => setChannelFilter('whatsapp')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                channelFilter === 'whatsapp' ? 'bg-ink text-on-primary' : 'text-text-muted hover:text-ink'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setChannelFilter('widget')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                channelFilter === 'widget' ? 'bg-ink text-on-primary' : 'text-text-muted hover:text-ink'
              }`}
            >
              Web Widget
            </button>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-canvas text-ink border border-hairline-soft rounded-full px-3 py-1.5 outline-none font-medium"
          >
            <option value="all">Semua Status</option>
            <option value="bot">Bot Menangani</option>
            <option value="waiting_agent">Menunggu Agen</option>
            <option value="agent">Ditangani Agen</option>
            <option value="resolved">Selesai</option>
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onSimulateIncoming}
          className="text-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Simulasi Chat WhatsApp Masuk</span>
        </Button>
      </div>

      {/* Main Inbox Workspace: Split Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
        {/* Left Conversation List (4 cols) */}
        <div className="md:col-span-4 border-r border-hairline-soft overflow-y-auto no-scrollbar bg-canvas">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-text-muted">
              Tidak ada percakapan dengan filter ini.
            </div>
          ) : (
            <div className="divide-y divide-hairline-soft">
              {filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedConv?.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`p-4 cursor-pointer transition-colors text-left ${
                      isSelected ? 'bg-canvas-soft border-l-4 border-ink' : 'hover:bg-canvas-soft/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-ink truncate">
                        {conv.customerName}
                      </span>
                      <span className="text-[10px] text-text-muted flex-shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-xs text-text-muted truncate mb-2">
                      {cleanBotOutput(conv.lastMessage)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-semibold bg-canvas-soft border border-hairline px-2 py-0.5 rounded-full text-ink flex items-center gap-1">
                          {conv.channel === 'whatsapp' ? (
                            <>
                              <MessageSquare className="w-2.5 h-2.5" /> WA
                            </>
                          ) : (
                            <>
                              <Globe className="w-2.5 h-2.5" /> Web
                            </>
                          )}
                        </span>
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                            conv.status === 'bot'
                              ? 'bg-emerald-100 text-emerald-800'
                              : conv.status === 'waiting_agent'
                              ? 'bg-amber-100 text-amber-900 animate-pulse'
                              : conv.status === 'agent'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-canvas-soft text-text-muted'
                          }`}
                        >
                          {conv.status === 'bot'
                            ? 'Bot Menangani'
                            : conv.status === 'waiting_agent'
                            ? 'Menunggu Agen'
                            : conv.status === 'agent'
                            ? 'Ditangani Agen'
                            : 'Selesai'}
                        </span>
                      </div>

                      {conv.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-accent text-on-primary text-[10px] font-bold flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Chat Pane & Thread (8 cols) */}
        {selectedConv ? (
          <div className="md:col-span-8 flex flex-col justify-between bg-canvas overflow-hidden">
            {/* Thread Header */}
            <div className="p-4 border-b border-hairline-soft flex flex-wrap items-center justify-between gap-3 bg-canvas">
              <div className="flex items-center gap-3">
                <SquircleIcon size="sm" className="bg-canvas-soft text-ink">
                  {selectedConv.channel === 'whatsapp' ? (
                    <MessageSquare className="w-4 h-4" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                </SquircleIcon>
                <div>
                  <h3 className="text-sm font-bold text-ink">
                    {selectedConv.customerName}
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    {selectedConv.customerContact} • Kanal: {selectedConv.channel.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Handoff and Action Controls */}
              <div className="flex items-center gap-2">
                {selectedConv.status !== 'agent' ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleTakeover}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Ambil Alih Percakapan</span>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={handleReturnToBot}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Kembalikan ke Bot</span>
                  </Button>
                )}

                {selectedConv.status !== 'resolved' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleResolve}
                    className="text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tandai Selesai</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Middle Section: Chat Tabs (Messages vs Internal Notes) */}
            <div className="border-b border-hairline-soft px-4 flex gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`py-2 border-b-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-ink text-ink font-bold'
                    : 'border-transparent text-text-muted hover:text-ink'
                }`}
              >
                Percakapan ({selectedConv.messages.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'notes'
                    ? 'border-ink text-ink font-bold'
                    : 'border-transparent text-text-muted hover:text-ink'
                }`}
              >
                <StickyNote className="w-3.5 h-3.5" />
                <span>Catatan Internal ({selectedConv.internalNotes?.length || 0})</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            {activeTab === 'chat' ? (
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-canvas-soft/30">
                {selectedConv.messages.map((msg) => {
                  const isCustomer = msg.sender === 'customer';
                  const isSystem = msg.sender === 'system';
                  const isAgent = msg.sender === 'agent';

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="flex justify-center my-2">
                        <span className="text-[11px] bg-canvas-soft border border-hairline-soft text-text-muted px-3 py-1 rounded-full">
                          {msg.content} • {msg.timestamp}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] text-text-muted">
                          {isCustomer
                            ? selectedConv.customerName
                            : isAgent
                            ? `Agen: ${msg.senderName || 'CS'}`
                            : 'AI Asisten'}
                        </span>
                        <span className="text-[10px] text-text-faint">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[80%] text-xs sm:text-sm p-3.5 leading-relaxed ${
                          isCustomer
                            ? 'bg-canvas border border-hairline text-ink rounded-2xl rounded-tl-sm'
                            : isAgent
                            ? 'bg-ink text-on-primary rounded-2xl rounded-tr-sm'
                            : 'bg-canvas-soft text-ink rounded-2xl rounded-tr-sm border border-hairline-soft'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{cleanBotOutput(msg.content)}</p>

                        {msg.sourceCitations && msg.sourceCitations.length > 0 && (
                          <div className="mt-2 pt-1.5 border-t border-hairline-soft flex items-center gap-1 text-[10px] text-text-muted">
                            <Info className="w-3 h-3 flex-shrink-0" />
                            <span>Rujukan: {cleanBotOutput(msg.sourceCitations[0])}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Internal Team Notes (FR-26) */
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-canvas">
                <div className="space-y-2">
                  {selectedConv.internalNotes && selectedConv.internalNotes.length > 0 ? (
                    selectedConv.internalNotes.map((note, nIdx) => (
                      <div
                        key={nIdx}
                        className="bg-amber-50 border border-amber-200 text-amber-950 p-3 rounded-sm text-xs leading-relaxed"
                      >
                        <p className="font-semibold text-[11px] text-amber-900 mb-0.5">
                          Catatan CS #{nIdx + 1}
                        </p>
                        <p>{note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-text-muted text-center py-6">
                      Belum ada catatan internal untuk percakapan ini.
                    </p>
                  )}
                </div>

                <form onSubmit={handleAddNote} className="pt-3 border-t border-hairline-soft flex gap-2">
                  <input
                    type="text"
                    placeholder="Tambahkan catatan untuk rekan agen lainnya..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
                  />
                  <Button type="submit" size="sm" variant="primary" className="text-xs">
                    Simpan Catatan
                  </Button>
                </form>
              </div>
            )}

            {/* Bottom Reply Box for Agent */}
            <div className="p-3 bg-canvas border-t border-hairline-soft">
              {selectedConv.status === 'bot' && (
                <div className="mb-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] py-1 px-3 rounded-full flex items-center justify-between">
                  <span>🤖 Bot AI saat ini menangani percakapan ini secara otomatis.</span>
                  <button
                    type="button"
                    onClick={handleTakeover}
                    className="font-bold underline ml-2"
                  >
                    Ambil Alih Sekarang
                  </button>
                </div>
              )}

              <form onSubmit={handleSendAgentReply} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ketik balasan agen ke pelanggan..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-ink border-0"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  disabled={!replyText.trim()}
                  className="h-10 px-4 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="md:col-span-8 flex items-center justify-center p-8 text-text-muted text-xs">
            Pilih percakapan di sebelah kiri untuk melihat pesan.
          </div>
        )}
      </div>
    </div>
  );
};
