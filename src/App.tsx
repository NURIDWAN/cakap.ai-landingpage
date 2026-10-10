import React, { useState } from 'react';
import { Workspace, BotConfig, Conversation, KnowledgeItem, Lead, Message } from './types';
import { INITIAL_CONVERSATIONS } from './data/mockConversations';
import { INITIAL_KNOWLEDGE_ITEMS } from './data/defaultKnowledge';
import { INITIAL_LEADS } from './data/mockLeads';

// Landing Page Components
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { SocialProof } from './components/landing/SocialProof';
import { ProblemSolution } from './components/landing/ProblemSolution';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { HowItWorks } from './components/landing/HowItWorks';
import { ChannelsMarquee } from './components/landing/ChannelsMarquee';
import { IndustryUseCases } from './components/landing/IndustryUseCases';
import { Pricing } from './components/landing/Pricing';
import { Testimonials } from './components/landing/Testimonials';
import { Faq } from './components/landing/Faq';
import { Footer } from './components/landing/Footer';

// Widget Component
import { CakapWidget } from './components/widget/CakapWidget';

// Dashboard Components
import { DashboardLayout, DashboardTab } from './components/dashboard/DashboardLayout';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { InboxView } from './components/dashboard/InboxView';
import { BotBuilderView } from './components/dashboard/BotBuilderView';
import { KnowledgeBaseView } from './components/dashboard/KnowledgeBaseView';
import { LeadsView } from './components/dashboard/LeadsView';
import { ChannelsView } from './components/dashboard/ChannelsView';
import { BillingView } from './components/dashboard/BillingView';
import { WorkspaceView } from './components/dashboard/WorkspaceView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('inbox');

  // Shared Global SaaS State
  const [workspace, setWorkspace] = useState<Workspace>({
    id: 'ws-rina',
    name: 'Toko Rina Official',
    planId: 'growth',
    quotaMessagesLimit: 5000,
    quotaMessagesUsed: 842,
    quotaAgentsLimit: 3,
    quotaAgentsUsed: 2,
    channelsConnected: 2,
  });

  const [botConfig, setBotConfig] = useState<BotConfig>(() => ({
    id: 'bot-1',
    name: 'Asisten Cakap (AI)',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    tone: 'ramah',
    language: 'Bahasa Indonesia',
    systemPrompt:
      'Anda adalah asisten AI toko online profesional di Indonesia. Jawab pertanyaan pelanggan dengan ramah, informasikan ketersediaan stok produk dari katalog kami, dan tawarkan panduan pembelian yang solutif.',
    prohibitedTopics: ['pinjaman online ilegal', 'isu SARA', 'kebijakan internal rahasia'],
    handoffKeywords: ['bicara dengan manusia', 'komplain berat', 'retur uang', 'panggil cs'],
    greetingMessage:
      'Halo kak! Selamat datang di Toko Rina. Ada produk atau promo yang bisa saya bantu cekkan?',
    closingMessage: 'Terima kasih sudah menghubungi kami. Semoga harimu menyenangkan!',
    isActive: true,
    version: '1.2.0',
    updatedAt: '10 Okt 2026',
    geminiApiKey:
      (import.meta.env.VITE_GEMINI_API_KEY as string) ||
      localStorage.getItem('cakap_gemini_api_key') ||
      '',
    geminiModel:
      (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.5-flash',
    temperature: 0.4,
  }));

  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(INITIAL_KNOWLEDGE_ITEMS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);

  // When a lead is captured from the widget, dynamically add to CRM
  const handleLeadCaptured = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  // When a message is logged in widget, register to workspace conversations
  const handleWidgetMessage = (msg: Message) => {
    setConversations((prev) => {
      const widgetThread = prev.find((c) => c.channel === 'widget');
      if (widgetThread) {
        return prev.map((c) =>
          c.id === widgetThread.id
            ? {
                ...c,
                lastMessage: msg.content,
                lastMessageTime: 'Baru saja',
                messages: [...c.messages, msg],
              }
            : c
        );
      }
      return prev;
    });
  };

  // Update conversation when agent takes over or replies
  const handleUpdateConversation = (updated: Conversation) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  // Simulate new incoming WhatsApp conversation for testing
  const handleSimulateIncoming = () => {
    const randomNames = ['Arif Hidayat', 'Mega Safitri', 'Fajar Ramadhan', 'Indah Permata'];
    const randomQuestions = [
      'Halo kak, kalau ambil paket grosir 20 pcs ada potongan harga gak ya?',
      'Pagi min, outlet terdekat dari Stasiun Sudirman ada di mana?',
      'Bisa minta nomor rekening untuk transfer pesanan kemarin kak?',
    ];
    const pickedName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const pickedQuery = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      customerName: pickedName,
      customerContact: `+62 812-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      channel: 'whatsapp',
      status: 'bot',
      unreadCount: 1,
      lastMessage: pickedQuery,
      lastMessageTime: 'Baru saja',
      messages: [
        {
          id: `msg-${Date.now()}`,
          conversationId: `conv-${Date.now()}`,
          sender: 'customer',
          senderName: pickedName,
          content: pickedQuery,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: `msg-${Date.now() + 1}`,
          conversationId: `conv-${Date.now()}`,
          sender: 'bot',
          senderName: botConfig.name,
          content: `Halo ${pickedName}! Terima kasih sudah menghubungi kami. Pertanyaan Anda mengenai "${pickedQuery}" sedang dicek di basis pengetahuan kami.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourceCitations: ['Basis Pengetahuan: Panduan Layanan & Fitur Utama Cakap.ai.pdf'],
        },
      ],
      internalNotes: ['Percakapan baru masuk dari WhatsApp Cloud API.'],
    };

    setConversations((prev) => [newConv, ...prev]);
  };

  const handleAddFaqFromAnalytics = (question: string) => {
    const newFaq: KnowledgeItem = {
      id: `kb-faq-${Date.now()}`,
      title: question,
      type: 'faq',
      content: `Jawaban resmi untuk: "${question}". Informasi lengkap dapat dikonfirmasi ke admin WhatsApp.`,
      status: 'ready',
      updatedAt: 'Baru saja',
    };
    setKnowledgeItems((prev) => [newFaq, ...prev]);
    setDashboardTab('knowledge');
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {currentView === 'landing' ? (
        /* PUBLIC LANDING PAGE */
        <div>
          <Navbar
            onOpenDashboard={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <main>
            <Hero
              onStartTrial={() => {
                setCurrentView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDemoWidget={() => {
                const widgetBtn = document.querySelector('button[title="Tanya Cakap"]') as HTMLButtonElement;
                widgetBtn?.click();
              }}
            />
            <SocialProof />
            <ProblemSolution />
            <FeaturesGrid />
            <HowItWorks />
            <ChannelsMarquee />
            <IndustryUseCases />
            <Pricing
              onSelectPlan={(planId) => {
                setWorkspace((prev) => ({
                  ...prev,
                  planId: planId as any,
                }));
                setCurrentView('dashboard');
                setDashboardTab('billing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <Testimonials />
            <Faq />
          </main>

          <Footer
            onStartTrial={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Interactive Floating Chatbot Widget on Landing Page */}
          <CakapWidget
            botConfig={botConfig}
            knowledgeBase={knowledgeItems}
            onLeadCaptured={handleLeadCaptured}
            onMessageLogged={handleWidgetMessage}
          />
        </div>
      ) : (
        /* SAAS DASHBOARD APPLICATION */
        <DashboardLayout
          currentTab={dashboardTab}
          onSelectTab={setDashboardTab}
          onExitToLanding={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          workspace={workspace}
          unreadCount={conversations.filter((c) => c.status === 'waiting_agent').length}
        >
          {dashboardTab === 'analytics' && (
            <AnalyticsView onAddFaq={handleAddFaqFromAnalytics} />
          )}

          {dashboardTab === 'inbox' && (
            <InboxView
              conversations={conversations}
              onUpdateConversation={handleUpdateConversation}
              onSimulateIncoming={handleSimulateIncoming}
            />
          )}

          {dashboardTab === 'builder' && (
            <BotBuilderView
              botConfig={botConfig}
              knowledgeBase={knowledgeItems}
              onSaveConfig={(updated) => setBotConfig(updated)}
            />
          )}

          {dashboardTab === 'knowledge' && (
            <KnowledgeBaseView
              knowledgeItems={knowledgeItems}
              onAddItem={(item) => setKnowledgeItems((prev) => [item, ...prev])}
              onDeleteItem={(id) =>
                setKnowledgeItems((prev) => prev.filter((i) => i.id !== id))
              }
            />
          )}

          {dashboardTab === 'leads' && (
            <LeadsView
              leads={leads}
              onAddLead={(lead) => setLeads((prev) => [lead, ...prev])}
            />
          )}

          {dashboardTab === 'channels' && <ChannelsView />}

          {dashboardTab === 'billing' && (
            <BillingView
              workspace={workspace}
              onUpgradePlan={(newPlanId) =>
                setWorkspace((prev) => ({ ...prev, planId: newPlanId }))
              }
            />
          )}

          {dashboardTab === 'workspace' && (
            <WorkspaceView
              workspace={workspace}
              onUpdateWorkspaceName={(name) =>
                setWorkspace((prev) => ({ ...prev, name }))
              }
            />
          )}

          {/* Also make widget accessible within dashboard */}
          <CakapWidget
            botConfig={botConfig}
            knowledgeBase={knowledgeItems}
            onLeadCaptured={handleLeadCaptured}
            onMessageLogged={handleWidgetMessage}
          />
        </DashboardLayout>
      )}
    </div>
  );
};

export default App;
