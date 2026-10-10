import React, { useState } from 'react';
import { Workspace } from '../../types';
import { SquircleIcon } from '../ui/SquircleIcon';
import { Button } from '../ui/Button';
import {
  BarChart3,
  Inbox,
  Bot,
  BookOpen,
  Users,
  Share2,
  CreditCard,
  Settings,
  ExternalLink,
  Menu,
  X,
  Building,
} from 'lucide-react';

export type DashboardTab =
  | 'analytics'
  | 'inbox'
  | 'builder'
  | 'knowledge'
  | 'leads'
  | 'channels'
  | 'billing'
  | 'workspace';

interface DashboardLayoutProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onExitToLanding: () => void;
  workspace: Workspace;
  unreadCount?: number;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitToLanding,
  workspace,
  unreadCount = 2,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'analytics' as const, label: 'Ringkasan Analitik', icon: BarChart3 },
    { id: 'inbox' as const, label: 'Kotak Masuk (Inbox)', icon: Inbox, badge: unreadCount },
    { id: 'builder' as const, label: 'Pembuat Bot & Playground', icon: Bot },
    { id: 'knowledge' as const, label: 'Basis Pengetahuan (RAG)', icon: BookOpen },
    { id: 'leads' as const, label: 'Kontak & Prospek (CRM)', icon: Users },
    { id: 'channels' as const, label: 'Integrasi Kanal', icon: Share2 },
    { id: 'billing' as const, label: 'Langganan & Kuota', icon: CreditCard },
    { id: 'workspace' as const, label: 'Pengaturan Tim', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row antialiased text-ink">
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-canvas-soft border-b border-hairline-soft px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <SquircleIcon size="sm" className="bg-ink text-on-primary">
            <span className="text-[10px] font-bold">C</span>
          </SquircleIcon>
          <span className="text-sm font-bold text-ink">Cakap Dasbor</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={onExitToLanding} className="text-xs">
            Beranda ↗
          </Button>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1 rounded-full text-ink hover:bg-canvas"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar: Mobbin ex-app-shell-row specification */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-40 w-64 bg-canvas-soft border-r border-hairline-soft flex flex-col justify-between p-4 transition-transform ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Workspace Selector */}
          <div className="space-y-3 px-2 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <SquircleIcon size="sm" className="bg-ink text-on-primary border-0">
                  <span className="text-xs font-bold">C</span>
                </SquircleIcon>
                <span className="text-base font-bold tracking-tight text-ink">
                  Cakap<span className="text-text-muted">.ai</span>
                </span>
              </div>
              <span className="text-[10px] bg-canvas text-text-muted px-2 py-0.5 rounded-full border border-hairline-soft font-semibold">
                MVP
              </span>
            </div>

            {/* Workspace Chip */}
            <div className="bg-canvas border border-hairline-soft p-2.5 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <Building className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                <span className="text-xs font-bold text-ink truncate">
                  {workspace.name}
                </span>
              </div>
              <span className="text-[9px] bg-accent text-on-primary px-1.5 py-0.2 rounded-full font-semibold uppercase">
                {workspace.planId}
              </span>
            </div>
          </div>

          {/* Navigation Links (Mobbin ex-app-shell-row) */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-ink text-on-primary'
                      : 'text-text-muted hover:text-ink hover:bg-canvas'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-on-primary text-ink'
                          : 'bg-accent text-on-primary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="pt-4 border-t border-hairline space-y-3 px-2">
          {/* Quick Quota Pill */}
          <div className="text-[11px] text-text-muted bg-canvas p-2.5 rounded-sm border border-hairline-soft">
            <div className="flex justify-between font-semibold text-ink mb-1">
              <span>Pesan AI</span>
              <span>{Math.round((workspace.quotaMessagesUsed / workspace.quotaMessagesLimit) * 100)}%</span>
            </div>
            <div className="w-full bg-field h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-ink h-full rounded-full"
                style={{
                  width: `${(workspace.quotaMessagesUsed / workspace.quotaMessagesLimit) * 100}%`,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onExitToLanding}
            className="w-full flex items-center justify-between px-3 py-2 rounded-full text-xs font-medium text-text-muted hover:text-ink hover:bg-canvas transition-colors"
          >
            <span>Lihat Halaman Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
