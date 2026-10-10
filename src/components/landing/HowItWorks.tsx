import React from 'react';
import { Card } from '../ui/Card';
import { UploadCloud, Link2, MessageSquareText } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: 'Unggah Sumber Pengetahuan.',
      desc: 'Masukkan dokumen PDF brosur, link website produk, atau ketik daftar tanya-jawab (FAQ) toko Anda. Sistem memprosesnya dalam hitungan detik.',
    },
    {
      num: '02',
      icon: Link2,
      title: 'Hubungkan Kanal Bisnis.',
      desc: 'Koneksikan nomor WhatsApp Business Platform resmi dengan beberapa klik, atau salin 1 baris kode script ke situs web Anda.',
    },
    {
      num: '03',
      icon: MessageSquareText,
      title: 'Bot Aktif Melayani 24/7.',
      desc: 'Bot langsung menjawab chat pelanggan secara instan. Tim agen manusia Anda dapat memantau dan mengambil alih kapan saja.',
    },
  ];

  return (
    <section id="cara-kerja" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="bg-canvas-soft rounded-md p-8 sm:p-12 border border-hairline-soft">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
            Setup Kilat &lt; 15 Menit
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Tiga langkah mudah menuju otomasi chat.
          </h2>
          <p className="mt-3 text-sm text-text-muted font-light">
            Tidak butuh kemampuan programming. Siapapun di tim Anda bisa menyiapkannya hari ini juga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <Card key={i} variant="default" className="p-6 relative bg-canvas">
                <span className="text-3xl font-extrabold text-hairline block mb-4">
                  {st.num}
                </span>
                <div className="w-10 h-10 rounded-full bg-canvas-soft border border-hairline-soft flex items-center justify-center text-ink mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-ink leading-snug mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {st.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
