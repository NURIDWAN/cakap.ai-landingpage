import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SegmentedControl } from '../ui/SegmentedControl';
import { INITIAL_PRICING_PLANS } from '../../data/defaultKnowledge';
import { Check } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingPeriod, setBillingPeriod] = useState('yearly'); // default yearly to highlight commercial signal

  const isYearly = billingPeriod === 'yearly';

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="harga" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Pilihan paket transparan, tanpa biaya tersembunyi.
        </h2>
        <p className="mt-3 text-base text-text-muted font-light">
          Mulai dengan uji coba gratis 14 hari. Upgrade atau batalkan langganan kapan saja tanpa ikatan kontrak.
        </p>

        {/* Mobbin segmented-control: stadium track with commercial accent tag */}
        <div className="mt-8 flex justify-center">
          <SegmentedControl
            activeId={billingPeriod}
            onChange={setBillingPeriod}
            options={[
              { id: 'monthly', label: 'Tagihan Bulanan' },
              { id: 'yearly', label: 'Tahunan', badge: 'Hemat 20%' },
            ]}
          />
        </div>
      </div>

      {/* 4-tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INITIAL_PRICING_PLANS.map((plan) => {
          const isFeatured = plan.isPopular;
          const displayPrice = isYearly ? plan.priceYearlyPerMonth : plan.priceMonthly;

          return (
            <Card
              key={plan.id}
              variant={isFeatured ? 'featured' : 'default'}
              className={`flex flex-col justify-between relative transition-all ${
                isFeatured ? 'border-2 border-ink' : 'hover:border-hairline'
              }`}
            >
              <div>
                {/* Popular Badge (Electric blue commercial signal per DESIGN-mobbin.md) */}
                <div className="flex items-center justify-between min-h-[28px] mb-3">
                  <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
                  {isFeatured && (
                    <Badge variant="popular">
                      {plan.badge || 'Paling Populer'}
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-text-muted min-h-[36px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Lockup */}
                <div className="my-6 pt-4 border-t border-hairline-soft">
                  {plan.priceMonthly > 0 ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-ink tracking-tight">
                          {formatRupiah(displayPrice)}
                        </span>
                        <span className="text-xs text-text-muted font-medium">/bln</span>
                      </div>
                      <p className="text-[11px] text-text-muted mt-1">
                        {isYearly ? 'Ditagih tahunan (hemat 20%)' : 'Ditagih per bulan'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl font-extrabold text-ink tracking-tight">
                        Hubungi Kami
                      </span>
                      <p className="text-[11px] text-text-muted mt-1">
                        Kebutuhan korporasi & agensi
                      </p>
                    </div>
                  )}
                </div>

                {/* Main Quotas */}
                <div className="bg-canvas rounded-sm p-3 mb-5 border border-hairline-soft space-y-1.5 text-xs font-semibold text-ink">
                  <div>⚡ {plan.messageLimitText}</div>
                  <div>👥 {plan.agentLimitText}</div>
                  <div>🔗 {plan.channelsText}</div>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                    Termasuk di paket:
                  </p>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-ink">
                      <Check className="w-3.5 h-3.5 text-ink flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-hairline-soft">
                <Button
                  variant={isFeatured ? 'primary' : 'outline'}
                  size="md"
                  onClick={() => onSelectPlan(plan.id)}
                  className="w-full text-xs sm:text-sm font-semibold"
                >
                  {plan.priceMonthly > 0 ? 'Pilih Paket Ini ↗' : 'Konsultasi Sales'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Comparison Table (compare-table per DESIGN-mobbin.md) */}
      <div className="mt-16 bg-canvas border border-hairline-soft rounded-md p-6 sm:p-8 overflow-x-auto">
        <h3 className="text-xl font-bold text-ink mb-6 text-center">
          Tabel Perbandingan Fitur Lengkap.
        </h3>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-hairline">
              <th className="py-3 px-3 font-bold text-ink w-2/5">Fitur & Kapasitas</th>
              <th className="py-3 px-3 font-semibold text-ink text-center">Starter</th>
              <th className="py-3 px-3 font-bold text-ink text-center bg-canvas-soft rounded-t-lg">Growth</th>
              <th className="py-3 px-3 font-semibold text-ink text-center">Business</th>
              <th className="py-3 px-3 font-semibold text-ink text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline-soft text-text-muted">
            <tr>
              <td className="py-3 px-3 font-medium text-ink">Batas Pesan AI per Bulan</td>
              <td className="py-3 px-3 text-center">1.000</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">5.000</td>
              <td className="py-3 px-3 text-center">15.000</td>
              <td className="py-3 px-3 text-center">Kustom</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-ink">WhatsApp Business Cloud API</td>
              <td className="py-3 px-3 text-center">Opsional</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">✓ Termasuk</td>
              <td className="py-3 px-3 text-center">✓ Termasuk</td>
              <td className="py-3 px-3 text-center">✓ Termasuk</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-ink">Widget Web Pop-up</td>
              <td className="py-3 px-3 text-center">✓</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-ink">Jumlah Akun Agen CS</td>
              <td className="py-3 px-3 text-center">1 Agen</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">3 Agen</td>
              <td className="py-3 px-3 text-center">8 Agen</td>
              <td className="py-3 px-3 text-center">Tanpa Batas</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-ink">Sumber Dokumen & URL</td>
              <td className="py-3 px-3 text-center">Maks 10 Dokumen</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">Tanpa Batas</td>
              <td className="py-3 px-3 text-center">Tanpa Batas</td>
              <td className="py-3 px-3 text-center">Tanpa Batas</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-ink">Katalog Produk & Stok</td>
              <td className="py-3 px-3 text-center">—</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-ink">Handoff Agen & Catatan Internal</td>
              <td className="py-3 px-3 text-center">✓</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-ink">Kepatuhan UU PDP Indonesia</td>
              <td className="py-3 px-3 text-center">✓</td>
              <td className="py-3 px-3 text-center font-bold text-ink bg-canvas-soft">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
              <td className="py-3 px-3 text-center">✓</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
