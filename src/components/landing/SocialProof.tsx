import React from 'react';
import { SquircleIcon } from '../ui/SquircleIcon';
import { ShoppingBag, Coffee, HeartPulse, Home, GraduationCap, Sparkles } from 'lucide-react';

const BRANDS = [
  { name: 'Kopi Senja Nusantara', type: 'F&B & Kafe', icon: Coffee },
  { name: 'Batik Danar Official', type: 'Fashion & E-Commerce', icon: ShoppingBag },
  { name: 'Klinik Gigi Sehat Prima', type: 'Layanan Medis', icon: HeartPulse },
  { name: 'Graha Harmoni Realty', type: 'Properti & Residensial', icon: Home },
  { name: 'Akademi Cerdas Digital', type: 'Pendidikan & Kursus', icon: GraduationCap },
  { name: 'Studio Pesona Kreatif', type: 'Agensi Digital', icon: Sparkles },
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-12 border-y border-hairline-soft bg-canvas overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs uppercase tracking-wider font-semibold text-text-muted">
          Dipercaya oleh pemilik bisnis dan UMKM di seluruh Indonesia
        </p>
      </div>

      {/* Marquee row with squircle chips */}
      <div className="flex items-center gap-4 animate-none overflow-x-auto no-scrollbar px-6 max-w-7xl mx-auto justify-start md:justify-center">
        {BRANDS.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 bg-canvas-soft border border-hairline-soft px-4 py-2.5 rounded-full flex-shrink-0 select-none hover:border-hairline transition-colors"
            >
              <SquircleIcon size="sm" className="bg-canvas border border-hairline-soft text-ink">
                <Icon className="w-3.5 h-3.5" />
              </SquircleIcon>
              <div className="text-left">
                <p className="text-xs font-semibold text-ink leading-tight">{b.name}</p>
                <p className="text-[10px] text-text-muted leading-tight">{b.type}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
