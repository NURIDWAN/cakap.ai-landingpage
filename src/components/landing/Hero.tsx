import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SquircleIcon } from '../ui/SquircleIcon';
import { MessageSquare, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onStartTrial: () => void;
  onOpenDemoWidget?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTrial, onOpenDemoWidget }) => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Top Eyebrow Chip */}
      <div className="inline-flex items-center gap-2 mb-6">
        <Badge variant="neutral" className="gap-1.5 py-1 px-3.5 text-xs">
          <Zap className="w-3.5 h-3.5 text-ink" />
          <span>Solusi Chatbot AI Omnichannel Lokal Indonesia</span>
        </Badge>
      </div>

      {/* Main Headline: Mobbin 652 weight + terminal period */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink max-w-4xl mx-auto leading-[1.05]">
        Layani pelanggan 24/7, tanpa nambah tim.
      </h1>

      {/* Hero Subtitle: Mobbin 300 light weight */}
      <p className="mt-6 text-lg sm:text-xl font-light text-text-muted max-w-2xl mx-auto leading-relaxed">
        Platform asisten AI untuk bisnis di Indonesia. Balas otomatis di WhatsApp & Web dengan Bahasa Indonesia natural, kumpulkan data prospek, dan serahkan ke CS manusia tanpa kode.
      </p>

      {/* Dual CTA Pills */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={onStartTrial}
          className="w-full sm:w-auto text-sm sm:text-base font-semibold"
        >
          Coba Gratis 14 Hari ↗
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onOpenDemoWidget}
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          Uji Demo Bot Langsung
        </Button>
      </div>

      {/* Guarantees */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted font-medium">
        <span className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-ink" /> Tanpa kartu kredit
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-ink" /> Setup <span className="font-semibold text-ink">&lt; 15 menit</span>
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-ink" /> Kepatuhan UU PDP Indonesia
        </span>
      </div>

      {/* Real Product UI Mockup (Omnichannel Inbox + Chat Preview) */}
      <div className="mt-14 max-w-5xl mx-auto">
        <Card variant="featured" className="p-3 sm:p-5 text-left border border-hairline-soft">
          {/* Mockup Window Chrome */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline-soft px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-hairline" />
              <span className="w-3 h-3 rounded-full bg-hairline" />
              <span className="w-3 h-3 rounded-full bg-hairline" />
              <span className="ml-2 text-xs font-semibold text-text-muted">
                app.cakap.ai/inbox — Kotak Masuk Omnichannel
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-text-muted font-medium hidden sm:inline">
                Status: WhatsApp Official Connected
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Inbox Layout Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-canvas rounded-md p-3 sm:p-4 border border-hairline-soft">
            {/* Left Thread List (4 cols) */}
            <div className="hidden md:block md:col-span-4 border-r border-hairline-soft pr-3 space-y-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold text-ink">Percakapan Aktif</span>
                <span className="text-[10px] bg-canvas-soft px-2 py-0.5 rounded-full font-medium">
                  3 Menunggu
                </span>
              </div>

              <div className="p-2.5 rounded-sm bg-canvas-soft border border-hairline">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-ink">Dewi Lestari</span>
                  <span className="text-[10px] text-text-muted">10:42</span>
                </div>
                <p className="text-[11px] text-text-muted truncate">
                  Halo kak, stok Kopi Susu Gula Aren masih ada...
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[9px] bg-ink text-on-primary px-1.5 py-0.2 rounded-full font-medium">
                    WhatsApp
                  </span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-medium">
                    AI Menjawab
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-sm hover:bg-canvas-soft/60 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-ink">Bambang Prasetyo</span>
                  <span className="text-[10px] text-text-muted">10:38</span>
                </div>
                <p className="text-[11px] text-text-muted truncate">
                  Bisa tolong bicara dengan CS manusia?
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[9px] bg-ink text-on-primary px-1.5 py-0.2 rounded-full font-medium">
                    WhatsApp
                  </span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-medium">
                    Menunggu Agen
                  </span>
                </div>
              </div>
            </div>

            {/* Right Chat Thread (8 cols) */}
            <div className="col-span-12 md:col-span-8 flex flex-col justify-between h-[300px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-hairline-soft">
                <div className="flex items-center gap-2.5">
                  <SquircleIcon size="sm" className="bg-canvas-soft text-ink">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </SquircleIcon>
                  <div>
                    <h4 className="text-xs font-semibold text-ink">Dewi Lestari (+62 812-8899-2314)</h4>
                    <p className="text-[10px] text-text-muted">WhatsApp Business • Resolusi Otomatis AI</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onStartTrial}
                  className="text-xs font-medium text-ink bg-canvas-soft hover:bg-field px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                >
                  <span>Ambil Alih Percakapan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Messages preview */}
              <div className="space-y-3 py-3 overflow-y-auto pr-1">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-text-muted mb-0.5">Dewi (Pelanggan) • 10:42</span>
                  <div className="bg-ink text-on-primary text-xs p-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                    Halo kak, stok Kopi Susu Gula Aren masih ada untuk order 10 cup?
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-text-muted mb-0.5 flex items-center gap-1">
                    <span className="font-semibold text-ink">Asisten Cakap (AI)</span> • 10:42
                  </span>
                  <div className="bg-canvas-soft border border-hairline-soft text-ink text-xs p-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                    Halo Kak Dewi! Stok Kopi Susu Gula Aren kami saat ini tersedia 50 cup kak, jadi aman banget untuk order 10 cup ya. Mau kami bantu buatkan pesanan untuk diantar sekarang atau ambil di outlet?
                    <div className="mt-2 pt-1.5 border-t border-hairline-soft text-[10px] text-text-muted flex items-center gap-1">
                      <span>✓ Rujukan: Katalog Produk (Kopi Susu Gula Aren: 50 Cup)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input disabled placeholder */}
              <div className="pt-2 border-t border-hairline-soft flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Bot sedang menangani secara otomatis. CS dapat intervensi kapan saja.
                </span>
                <span className="text-[11px] underline cursor-pointer" onClick={onStartTrial}>
                  Lihat Dasbor Lengkap ↗
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
