export type Role = 'Owner' | 'Admin' | 'Agen' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  planId: 'starter' | 'growth' | 'business' | 'enterprise';
  quotaMessagesLimit: number;
  quotaMessagesUsed: number;
  quotaAgentsLimit: number;
  quotaAgentsUsed: number;
  channelsConnected: number;
}

export type BotTone = 'formal' | 'santai' | 'ramah';

export interface BotConfig {
  id: string;
  name: string;
  avatar: string;
  tone: BotTone;
  language: string;
  systemPrompt: string;
  prohibitedTopics: string[];
  handoffKeywords: string[];
  greetingMessage: string;
  closingMessage: string;
  isActive: boolean;
  version: string;
  updatedAt: string;
  geminiApiKey?: string;
  geminiModel?: string;
  temperature?: number;
}

export type KnowledgeType = 'document' | 'url' | 'faq' | 'catalog';
export type IndexStatus = 'ready' | 'processing' | 'pending' | 'failed';

export interface KnowledgeItem {
  id: string;
  title: string;
  type: KnowledgeType;
  content: string;
  status: IndexStatus;
  updatedAt: string;
  meta?: {
    fileSize?: string;
    url?: string;
    itemCount?: number;
    price?: number;
    stock?: number;
  };
}

export type ChannelType = 'whatsapp' | 'widget' | 'instagram' | 'telegram' | 'messenger';
export type ChannelStatus = 'connected' | 'disconnected' | 'configuring';

export interface Channel {
  id: string;
  type: ChannelType;
  name: string;
  status: ChannelStatus;
  identifier: string; // e.g. Phone number, Widget ID
  lastSyncAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  channel: ChannelType;
  createdAt: string;
  status: 'Baru' | 'Tertarik' | 'Dihubungi' | 'Konversi';
  notes?: string;
}

export type ConversationStatus = 'bot' | 'waiting_agent' | 'agent' | 'resolved';

export interface Message {
  id: string;
  conversationId: string;
  sender: 'customer' | 'bot' | 'agent' | 'system';
  senderName?: string;
  content: string;
  timestamp: string;
  sourceCitations?: string[];
}

export interface Conversation {
  id: string;
  customerName: string;
  customerContact: string;
  channel: ChannelType;
  status: ConversationStatus;
  assignedAgent?: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
  internalNotes?: string[];
  csatScore?: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  priceMonthly: number;
  priceYearlyPerMonth: number;
  description: string;
  features: string[];
  messageLimitText: string;
  agentLimitText: string;
  channelsText: string;
}
