import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MessageSquare, Bot, UserCheck, Clock, ThumbsUp, AlertCircle, PlusCircle } from 'lucide-react';

interface AnalyticsViewProps {
  onAddFaq: (question: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onAddFaq }) => {
  const stats = [
    {
      label: 'Total Percakapan',
      value: '1.248',
      change: '+18% bln ini',
      icon: MessageSquare,
    },
    {
      label: 'Resolusi Otomatis AI',
      value: '87.4%',
      change: '1.091 chat selesai otomatis',
      icon: Bot,
    },
    {
      label: 'Handoff ke Agen CS',
      value: '12.6%',
      change: '157 dialihkan ke manusia',
      icon: UserCheck,
    },
    {
      label: 'Waktu Respon Rata-rata',
      value: '1.4 dtk',
      change: 'Token pertama < 2 dtk',
      icon: Clock,
    },
    {
      label: 'Skor Kepuasan (CSAT)',
      value: '4.8 / 5.0',
      change: 'Berdasarkan 412 rating',
      icon: ThumbsUp,
    },
  ];

  const unansweredQueries = [
    {
      query: 'Apakah ada cabang baru di kawasan PIK 2 Jakarta?',
      occurrences: 14,
      lastAsked: 'Hari ini, 09:12',
    },
    {
      query: 'Bisa split bill / bayar terpisah dengan dua kartu kredit?',
      occurrences: 9,
      lastAsked: 'Kemarin, 19:40',
    },
    {
      query: 'Apakah menyediakan pengiriman instan via Lalamove van?',
      occurrences: 7,
      lastAsked: '08 Okt 2026',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas-soft p-5 rounded-md border border-hairline-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">Ringkasan Analitik Performa.</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Pantau efisiensi bot AI, waktu tanggap percakapan, dan kepuasan pelanggan secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-muted bg-canvas px-3 py-1.5 rounded-full border border-hairline-soft">
            Periode: 30 Hari Terakhir
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} variant="default" className="p-4 flex flex-col justify-between bg-canvas">
              <div>
                <div className="flex items-center justify-between text-text-muted mb-2">
                  <span className="text-xs font-medium">{s.label}</span>
                  <Icon className="w-4 h-4 text-ink" />
                </div>
                <div className="text-2xl font-bold text-ink tracking-tight">
                  {s.value}
                </div>
              </div>
              <p className="text-[11px] text-text-muted mt-3 font-medium">
                {s.change}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Unresolved Questions Section (FR-34) */}
      <Card variant="default" className="p-6 bg-canvas">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-ink" />
            <div>
              <h3 className="text-sm font-bold text-ink">
                Pertanyaan Belum Terjawab (FR-34)
              </h3>
              <p className="text-xs text-text-muted">
                Pertanyaan yang sering ditanyakan pelanggan namun belum ada di basis pengetahuan. Tambahkan untuk meningkatkan akurasi bot.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-hairline-soft">
          {unansweredQueries.map((item, i) => (
            <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-ink">
                  "{item.query}"
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Ditanyakan sebanyak <span className="font-bold text-ink">{item.occurrences}x</span> • Terakhir: {item.lastAsked}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAddFaq(item.query)}
                className="text-xs flex items-center gap-1.5 flex-shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Tambahkan ke FAQ ↗</span>
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
