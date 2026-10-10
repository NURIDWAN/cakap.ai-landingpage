import React from 'react';
import { Button } from '../ui/Button';
import { SquircleIcon } from '../ui/SquircleIcon';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onStartTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartTrial }) => {
  return (
    <footer className="mt-20">
      {/* Pre-footer Call to Action */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 text-center">
        <div className="bg-canvas-soft border border-hairline-soft rounded-md p-10 sm:p-14">
          <h2 className="text-3xl sm:text-5xl font-bold text-ink tracking-tight max-w-2xl mx-auto leading-tight">
            Mulai layani pelanggan 24/7 hari ini juga.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-muted font-light max-w-xl mx-auto">
            Daftar dalam 2 menit. Dapatkan free trial 14 hari penuh tanpa kartu kredit dan rasakan ringannya otomasi obrolan bisnis Anda.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onStartTrial}
              className="w-full sm:w-auto font-semibold"
            >
              Coba Gratis 14 Hari ↗
            </Button>
            <a href="#harga">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Lihat Skema Harga
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Mobbin Polarity Inverted Band: Full-bleed ink black #141414 with 24px rounded top corners */}
      <div className="bg-ink text-on-primary rounded-t-md px-6 sm:px-12 pt-16 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <SquircleIcon size="sm" className="bg-canvas text-ink border-0">
                  <span className="text-xs font-bold">C</span>
                </SquircleIcon>
                <span className="text-xl font-bold tracking-tight text-on-primary">
                  Cakap<span className="text-text-faint">.ai</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-faint max-w-sm leading-relaxed font-light">
                Platform chatbot AI omnichannel untuk bisnis di Indonesia. Otomasi layanan pelanggan, penjualan, dan penangkapan prospek di WhatsApp & Web.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-faint pt-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Kepatuhan Penuh UU Pelindungan Data Pribadi (UU PDP)</span>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-semibold text-on-primary uppercase tracking-wider">
                Produk
              </p>
              <ul className="space-y-2 text-xs text-text-faint">
                <li><a href="#fitur" className="hover:text-on-primary transition-colors">Chatbot AI</a></li>
                <li><a href="#fitur" className="hover:text-on-primary transition-colors">Knowledge Base RAG</a></li>
                <li><a href="#fitur" className="hover:text-on-primary transition-colors">Omnichannel Inbox</a></li>
                <li><a href="#fitur" className="hover:text-on-primary transition-colors">Smart Handoff CS</a></li>
                <li><a href="#harga" className="hover:text-on-primary transition-colors">Paket & Harga</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-semibold text-on-primary uppercase tracking-wider">
                Integrasi
              </p>
              <ul className="space-y-2 text-xs text-text-faint">
                <li><span className="text-white">WhatsApp Business API</span></li>
                <li><span className="text-white">Web Widget Pop-up</span></li>
                <li><span className="text-text-faint">Instagram DM (Fase 2)</span></li>
                <li><span className="text-text-faint">Telegram Bot (Fase 2)</span></li>
                <li><span className="text-text-faint">API & Webhooks</span></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-semibold text-on-primary uppercase tracking-wider">
                Dukungan & Legal
              </p>
              <ul className="space-y-2 text-xs text-text-faint">
                <li><a href="#faq" className="hover:text-on-primary transition-colors">Pusat Bantuan / FAQ</a></li>
                <li><a href="#faq" className="hover:text-on-primary transition-colors">Kebijakan Privasi (UU PDP)</a></li>
                <li><a href="#faq" className="hover:text-on-primary transition-colors">Syarat & Ketentuan Layanan</a></li>
                <li><span className="text-text-faint">Hubungi: halo@cakap.ai</span></li>
                <li><span className="text-text-faint">Jakarta Selatan, Indonesia</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-faint gap-4">
            <p>© 2026 Cakap.ai. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="flex items-center gap-1">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" /> untuk memajukan UMKM Indonesia.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
