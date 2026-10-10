import React from 'react';
import { Card } from '../ui/Card';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'Dulu saya harus bangun jam 12 malam cuma buat balas tanya ukuran baju di WhatsApp. Sejak pakai Cakap.ai, bot langsung melayani dengan sopan dan penjualan malam naik 40%.',
    name: 'Rina Sasmita',
    role: 'Owner Toko Busana Muslim',
    company: 'Jakarta Timur',
  },
  {
    quote: 'Fitur handoff-nya juara. Saat ada pasien komplain atau butuh dokter gigi tindakan khusus, bot langsung lempar ke admin klinik kami. Gak ada lagi chat yang nyangkut.',
    name: 'drg. Hendra Setiawan',
    role: 'Direktur Operasional',
    company: 'Klinik Senyum Indah, Bandung',
  },
  {
    quote: 'Setup beneran selesai dalam 12 menit. Cukup upload PDF katalog dan scan WhatsApp Cloud API, asisten AI langsung pintar menjawab stok kopi dan jam outlet.',
    name: 'Budi Hartono',
    role: 'Founder Kopi Senja',
    company: 'Surabaya',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-hairline-soft">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Cerita nyata dari pemilik bisnis.
        </h2>
        <p className="mt-2 text-sm text-text-muted font-light">
          Lihat bagaimana UMKM hingga perusahaan menengah menghemat waktu dan meningkatkan kepuasan pelanggan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <Card key={i} variant="default" className="p-6 flex flex-col justify-between bg-canvas">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-current text-ink" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed font-normal">
                "{t.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline-soft flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-canvas-soft border border-hairline-soft flex items-center justify-center font-bold text-xs text-ink">
                {t.name[0]}
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink leading-tight">{t.name}</h4>
                <p className="text-[11px] text-text-muted leading-tight mt-0.5">
                  {t.role} • {t.company}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
