import React from 'react';
import { SquircleIcon } from '../ui/SquircleIcon';
import { MessageSquare, Globe, Instagram, Send, Facebook } from 'lucide-react';

export const ChannelsMarquee: React.FC = () => {
  const channels = [
    {
      name: 'WhatsApp Business',
      desc: 'Meta Cloud API Resmi • Aktif di MVP',
      icon: MessageSquare,
      status: 'Aktif',
      isLive: true,
    },
    {
      name: 'Web Widget Pop-up',
      desc: '1 Baris Script Asinkron • Aktif di MVP',
      icon: Globe,
      status: 'Aktif',
      isLive: true,
    },
    {
      name: 'Instagram DM',
      desc: 'Balas pesan & story mention',
      icon: Instagram,
      status: 'Fase 2',
      isLive: false,
    },
    {
      name: 'Telegram Bot',
      desc: 'Kanal komunitas & broadcast',
      icon: Send,
      status: 'Fase 2',
      isLive: false,
    },
    {
      name: 'Facebook Messenger',
      desc: 'Integrasi halaman bisnis FB',
      icon: Facebook,
      status: 'Fase 2',
      isLive: false,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto text-center border-t border-hairline-soft">
      <div className="max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Satu AI, terhubung ke seluruh kanal favorit pelanggan.
        </h2>
        <p className="mt-2 text-sm text-text-muted font-light">
          Pelanggan bebas chat dari WhatsApp atau website toko Anda, semua pesan bermuara di satu dasbor rapi.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {channels.map((ch, idx) => {
          const Icon = ch.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-md border text-left transition-all ${
                ch.isLive
                  ? 'bg-canvas border-hairline hover:border-ink'
                  : 'bg-canvas-soft/70 border-hairline-soft opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <SquircleIcon size="sm" className="bg-canvas-soft text-ink">
                  <Icon className="w-4 h-4" />
                </SquircleIcon>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    ch.isLive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-canvas text-text-muted border border-hairline-soft'
                  }`}
                >
                  {ch.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-ink">{ch.name}</h3>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                {ch.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
