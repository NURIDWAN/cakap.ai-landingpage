import React from 'react';
import { Card } from '../ui/Card';
import { Moon, RefreshCw, LayoutList, ArrowRight, Check } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  const points = [
    {
      icon: Moon,
      problemTitle: 'Chat di luar jam kerja tak terbalas',
      problemDesc: 'Pelanggan chat pukul 22.00 dan menunggu sampai besok pagi. 70% prospek berpindah ke kompetitor.',
      solutionTitle: 'Balas instan 24/7 dalam hitungan detik.',
      solutionDesc: 'AI aktif melayani kapan saja. Menjawab pertanyaan, cek stok, dan menangkap data kontak otomatis.',
    },
    {
      icon: RefreshCw,
      problemTitle: 'Pertanyaan repetitif menguras waktu',
      problemDesc: 'Tim CS menghabiskan 80% energi hanya menjawab harga, ongkir, jam buka, dan ketersediaan stok.',
      solutionTitle: 'AI menjawab dari knowledge base akurat.',
      solutionDesc: 'Cukup unggah dokumen, katalog, atau link toko. AI menjawab persis fakta tanpa halusinasi.',
    },
    {
      icon: LayoutList,
      problemTitle: 'Chat tercecer di banyak handphone',
      problemDesc: 'Admin repot memantau WhatsApp Web berbeda, nomor pribadi karyawan, dan pesan widget situs.',
      solutionTitle: 'Satu kotak masuk omnichannel terpadu.',
      solutionDesc: 'Seluruh percakapan WhatsApp & Web masuk ke satu dashboard. Handoff ke agen manusia dengan 1 klik.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Masalah lama, cara baru melayani pelanggan.
        </h2>
        <p className="mt-3 text-base text-text-muted font-light">
          Tinggalkan cara manual yang lambat. Ubah obrolan biasa menjadi penjualan yang terotomasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {points.map((pt, i) => {
          const Icon = pt.icon;
          return (
            <Card key={i} variant="default" className="flex flex-col justify-between p-6">
              <div>
                <div className="w-10 h-10 rounded-full bg-canvas-soft border border-hairline-soft flex items-center justify-center text-ink mb-5">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Problem */}
                <div className="pb-4 mb-4 border-b border-hairline-soft">
                  <span className="text-[11px] font-semibold text-text-faint uppercase tracking-wider block mb-1">
                    Masalah
                  </span>
                  <h3 className="text-base font-bold text-ink leading-snug">
                    {pt.problemTitle}
                  </h3>
                  <p className="mt-1.5 text-xs text-text-muted leading-relaxed">
                    {pt.problemDesc}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Solusi Cakap.ai
                  </span>
                  <h4 className="text-sm font-bold text-ink leading-snug">
                    {pt.solutionTitle}
                  </h4>
                  <p className="mt-1.5 text-xs text-text-muted leading-relaxed">
                    {pt.solutionDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-hairline-soft flex items-center text-xs font-semibold text-ink group cursor-pointer">
                <span>Pelajari kemudahan setup</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
