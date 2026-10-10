import React from 'react';
import { Card } from '../ui/Card';
import { SquircleIcon } from '../ui/SquircleIcon';
import { Bot, BookOpen, Inbox, UserCheck, BarChart3, Users } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'Bahasa Indonesia natural & slang.',
      desc: 'AI dilatih memahami bahasa santai pelanggan Indonesia (kak, gan, min, cod, diskon ya). Mendukung pilihan gaya bicara formal, santai, maupun ramah.',
      tag: 'LLM Multi-Persona',
    },
    {
      icon: BookOpen,
      title: 'Knowledge base tanpa halusinasi.',
      desc: 'Unggah file PDF, link URL website, FAQ manual, atau katalog produk. AI membatasi jawaban hanya pada fakta yang ada dan menampilkan sumber rujukan.',
      tag: 'RAG Retrieval Akurat',
    },
    {
      icon: Inbox,
      title: 'Kotak masuk omnichannel terpadu.',
      desc: 'Kelola chat dari WhatsApp Business Cloud API dan widget website di satu layar. Pantau status bot, unread chat, dan catatan internal per percakapan.',
      tag: 'WhatsApp + Web',
    },
    {
      icon: UserCheck,
      title: 'Smart handoff ke agen manusia.',
      desc: 'Jika pertanyaan rumit, pelanggan komplain, atau meminta CS langsung, percakapan otomatis dialihkan ke agen manusia tanpa jeda.',
      tag: 'Zero-Friction Transfer',
    },
    {
      icon: BarChart3,
      title: 'Laporan pertanyaan tak terjawab.',
      desc: 'Cakap.ai secara cerdas mengelompokkan pertanyaan pelanggan yang belum ada jawabannya, memudahkan supervisor melengkapi FAQ setiap minggu.',
      tag: 'Continuous Learning',
    },
    {
      icon: Users,
      title: 'Penangkapan prospek otomatis.',
      desc: 'Bot secara alami meminta dan menyimpan nama, email, serta nomor WhatsApp calon pembeli. Siap diekspor ke CSV untuk follow up marketing.',
      tag: 'CRM & Lead Capture',
    },
  ];

  return (
    <section id="fitur" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Dirancang untuk kebutuhan bisnis Indonesia.
        </h2>
        <p className="mt-3 text-base text-text-muted font-light">
          Bukan sekadar bot kaku berbasis pilihan tombol. Ini adalah asisten cerdas yang memahami konteks dan siap membantu tim penjualan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <Card
              key={idx}
              variant="default"
              className="p-6 flex flex-col justify-between hover:border-hairline transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <SquircleIcon size="md" className="bg-canvas-soft text-ink">
                    <Icon className="w-5 h-5" />
                  </SquircleIcon>
                  <span className="text-[11px] font-semibold bg-canvas-soft px-2.5 py-1 rounded-full text-text-muted">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink leading-snug">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs text-text-muted leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
