import React, { useState } from 'react';
import { Workspace } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { INITIAL_PRICING_PLANS } from '../../data/defaultKnowledge';
import { QrCode, Building, Wallet, Download } from 'lucide-react';

interface BillingViewProps {
  workspace: Workspace;
  onUpgradePlan: (planId: 'starter' | 'growth' | 'business' | 'enterprise') => void;
}

export const BillingView: React.FC<BillingViewProps> = ({
  workspace,
  onUpgradePlan,
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'starter' | 'growth' | 'business' | 'enterprise'>('growth');
  const [selectedPayment, setSelectedPayment] = useState<'qris' | 'bca_va' | 'gopay'>('qris');
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState(false);

  const currentPlan = INITIAL_PRICING_PLANS.find((p) => p.id === workspace.planId) || INITIAL_PRICING_PLANS[1];

  const quotaMessagePercent = Math.min(
    100,
    Math.round((workspace.quotaMessagesUsed / workspace.quotaMessagesLimit) * 100)
  );

  const invoices = [
    {
      id: 'INV-2026-0901',
      date: '01 Sep 2026',
      amount: 'Rp 699.000',
      status: 'Lunas',
      method: 'QRIS Gopay',
    },
    {
      id: 'INV-2026-0801',
      date: '01 Agu 2026',
      amount: 'Rp 699.000',
      status: 'Lunas',
      method: 'BCA Virtual Account',
    },
  ];

  const handleProcessPayment = () => {
    onUpgradePlan(selectedPlanId);
    setShowCheckout(false);
    setPaymentSuccessNotice(true);
    setTimeout(() => setPaymentSuccessNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas-soft p-5 rounded-md border border-hairline-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">Langganan & Penagihan (Billing).</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Kelola paket langganan, pantau kuota pesan AI, dan riwayat faktur pembayaran lokal Anda.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {paymentSuccessNotice && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              ✓ Pembayaran Berhasil Diproses!
            </span>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowCheckout(true)}
            className="text-xs"
          >
            Tingkatkan Paket ↗
          </Button>
        </div>
      </div>

      {/* Quota Usage Cards (FR-40) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default" className="p-6 bg-canvas space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span>Kuota Pesan AI Bulanan</span>
            <span className="text-text-muted">
              {workspace.quotaMessagesUsed.toLocaleString('id-ID')} / {workspace.quotaMessagesLimit.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="w-full bg-field h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                quotaMessagePercent > 80 ? 'bg-amber-500' : 'bg-ink'
              }`}
              style={{ width: `${quotaMessagePercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-text-muted">
            <span>Tersisa {workspace.quotaMessagesLimit - workspace.quotaMessagesUsed} pesan</span>
            <span>{quotaMessagePercent}% terpakai</span>
          </div>
        </Card>

        <Card variant="default" className="p-6 bg-canvas space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span>Kursi Agen CS Aktif</span>
            <span className="text-text-muted">
              {workspace.quotaAgentsUsed} / {workspace.quotaAgentsLimit} Agen
            </span>
          </div>
          <div className="w-full bg-field h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-ink rounded-full"
              style={{
                width: `${(workspace.quotaAgentsUsed / workspace.quotaAgentsLimit) * 100}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-text-muted">
            Bisa menambah agen baru kapan saja di menu Tim.
          </p>
        </Card>

        <Card variant="featured" className="p-6 border border-hairline-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-text-muted">Paket Saat Ini</span>
              <Badge variant="popular">Aktif</Badge>
            </div>
            <h3 className="text-xl font-bold text-ink">{currentPlan.name}</h3>
            <p className="text-xs text-text-muted mt-1">
              Rp {currentPlan.priceMonthly.toLocaleString('id-ID')} / bulan
            </p>
          </div>
          <div className="pt-3 border-t border-hairline-soft text-[11px] text-text-muted">
            Diperpanjang otomatis pada: 01 Nov 2026
          </div>
        </Card>
      </div>

      {/* Checkout Drawer / Modal (ex-cart-drawer per DESIGN-mobbin.md) */}
      {showCheckout && (
        <Card variant="featured" className="p-6 border border-hairline animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-hairline-soft">
            <h3 className="text-base font-bold text-ink">Pilih Paket & Metode Pembayaran Lokal (FR-38)</h3>
            <button
              onClick={() => setShowCheckout(false)}
              className="text-xs text-text-muted hover:text-ink font-semibold"
            >
              Batal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1: Select Plan */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-ink uppercase tracking-wider">
                1. Pilih Paket Upgrade:
              </label>
              {(['starter', 'growth', 'business'] as const).map((pid) => {
                const plan = INITIAL_PRICING_PLANS.find((p) => p.id === pid)!;
                const isSelected = selectedPlanId === pid;
                return (
                  <div
                    key={pid}
                    onClick={() => setSelectedPlanId(pid)}
                    className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-canvas border-2 border-ink'
                        : 'bg-canvas/60 border-hairline-soft hover:bg-canvas'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ink">{plan.name}</span>
                        {plan.isPopular && <Badge variant="popular">Populer</Badge>}
                      </div>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        {plan.messageLimitText} • {plan.agentLimitText}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-ink">
                      Rp {plan.priceMonthly.toLocaleString('id-ID')}/bln
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Payment Method */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-ink uppercase tracking-wider">
                2. Metode Pembayaran Lokal Indonesia:
              </label>
              <div className="space-y-2">
                {[
                  { id: 'qris', name: 'QRIS (Semua E-Wallet & Mobile Banking)', icon: QrCode },
                  { id: 'bca_va', name: 'BCA / Mandiri Virtual Account', icon: Building },
                  { id: 'gopay', name: 'GoPay / OVO Instant Checkout', icon: Wallet },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = selectedPayment === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setSelectedPayment(pm.id as any)}
                      className={`p-3 rounded-md border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-canvas border-2 border-ink'
                          : 'bg-canvas/60 border-hairline-soft hover:bg-canvas'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-ink" />
                      <span className="text-xs font-semibold text-ink">{pm.name}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-hairline-soft flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-text-muted block">Total Tagihan:</span>
                  <span className="text-lg font-bold text-ink">
                    Rp {INITIAL_PRICING_PLANS.find((p) => p.id === selectedPlanId)?.priceMonthly.toLocaleString('id-ID')}
                  </span>
                </div>
                <Button variant="primary" size="md" onClick={handleProcessPayment} className="text-xs">
                  Bayar Sekarang ↗
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Invoices List (FR-39) */}
      <Card variant="default" className="p-6 bg-canvas">
        <h4 className="text-sm font-bold text-ink mb-4">Riwayat Faktur & Pembayaran (FR-39)</h4>
        <div className="divide-y divide-hairline-soft text-xs">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-ink">{inv.id}</span>
                <span className="text-text-muted ml-3">{inv.date}</span>
                <span className="text-text-muted ml-3">• {inv.method}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-ink">{inv.amount}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {inv.status}
                </span>
                <button
                  type="button"
                  className="text-text-muted hover:text-ink p-1 rounded-full"
                  title="Unduh faktur"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
