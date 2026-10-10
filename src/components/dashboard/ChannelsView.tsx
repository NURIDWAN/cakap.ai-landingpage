import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SquircleIcon } from '../ui/SquircleIcon';
import {
  MessageSquare,
  Globe,
  Instagram,
  Send,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
} from 'lucide-react';

export const ChannelsView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [waConnected, setWaConnected] = useState(true);
  const [showPairModal, setShowPairModal] = useState(false);

  const embedScript = `<script\n  src="https://cdn.cakap.ai/v1/widget.js"\n  data-bot-id="bot_cakap_live_9981"\n  data-position="right"\n  async>\n</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas-soft p-5 rounded-md border border-hairline-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">Integrasi Kanal Percakapan (FR-18 - FR-21).</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Hubungkan bot AI Anda ke WhatsApp Business Platform resmi dan pasang widget chat ke website toko Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WhatsApp Channel Card */}
        <Card variant="default" className="p-6 bg-canvas flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SquircleIcon size="md" className="bg-canvas-soft text-ink">
                  <MessageSquare className="w-5 h-5" />
                </SquircleIcon>
                <div>
                  <h3 className="text-sm font-bold text-ink">WhatsApp Business Cloud API</h3>
                  <p className="text-xs text-text-muted">Koneksi Meta Resmi (FR-19)</p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  waConnected
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-canvas-soft text-text-muted border border-hairline'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {waConnected ? 'Terhubung (Online)' : 'Terputus'}
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              Bot AI aktif membalas seluruh pesan masuk ke nomor bisnis Anda dalam kebijakan jendela 24 jam Meta. Tidak ada risiko nomor diblokir.
            </p>

            <div className="bg-canvas-soft rounded-sm p-3.5 text-xs space-y-2 border border-hairline-soft">
              <div className="flex justify-between">
                <span className="text-text-muted">Nomor Bisnis:</span>
                <span className="font-semibold text-ink">+62 812-8899-2314</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">ID WhatsApp Business:</span>
                <span className="font-mono text-ink">waba_9918231002</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Status Template Pesan:</span>
                <span className="text-emerald-700 font-semibold">12 Approved oleh Meta</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-hairline-soft flex items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowPairModal(true)}
              className="text-xs flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Pasangkan Ulang / Ganti Nomor</span>
            </Button>
            <Button
              size="sm"
              variant={waConnected ? 'soft' : 'primary'}
              onClick={() => setWaConnected(!waConnected)}
              className="text-xs"
            >
              {waConnected ? 'Putuskan Sementara' : 'Hubungkan Kembali'}
            </Button>
          </div>
        </Card>

        {/* Web Widget Snippet Card */}
        <Card variant="default" className="p-6 bg-canvas flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SquircleIcon size="md" className="bg-canvas-soft text-ink">
                  <Globe className="w-5 h-5" />
                </SquircleIcon>
                <div>
                  <h3 className="text-sm font-bold text-ink">Web Chatbot Widget (FR-18)</h3>
                  <p className="text-xs text-text-muted">Satu Baris Kode Script</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Aktif
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              Pasang widget ini ke situs web Anda (WordPress, Shopify, Webflow, React, HTML). Cukup salin kode script di bawah sebelum tag <code className="bg-canvas-soft px-1 rounded">&lt;/body&gt;</code>.
            </p>

            <div className="relative">
              <pre className="bg-ink text-on-primary rounded-sm p-3.5 text-xs font-mono overflow-x-auto leading-relaxed">
                {embedScript}
              </pre>
              <button
                type="button"
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-full text-xs flex items-center gap-1 transition-colors"
                title="Salin script"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-hairline-soft flex items-center justify-between">
            <span className="text-xs text-text-muted">
              {copied ? '✓ Kode berhasil disalin!' : 'Ukuran bundle < 50 KB'}
            </span>
            <Button size="sm" variant="primary" onClick={handleCopy} className="text-xs">
              {copied ? 'Tersalin' : 'Salin Kode Script ↗'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Pairing Modal Mock */}
      {showPairModal && (
        <Card variant="featured" className="p-6 border border-hairline animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Pasangkan Nomor WhatsApp Business Resmi
            </h4>
            <button
              onClick={() => setShowPairModal(false)}
              className="text-xs text-text-muted hover:text-ink font-semibold"
            >
              Tutup
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-xs text-text-muted">
              <p className="font-semibold text-ink">Langkah Cepat &lt; 5 Menit:</p>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>Buka aplikasi WhatsApp Business di smartphone Anda.</li>
                <li>Pilih Menu &gt; Perangkat Tertaut &gt; Tautkan Perangkat.</li>
                <li>Arahkan kamera ke QR Code di samping ini.</li>
                <li>Bot akan aktif seketika setelah Meta Cloud API memverifikasi.</li>
              </ol>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-canvas rounded-md border border-hairline-soft">
              <div className="w-36 h-36 bg-canvas-soft border-2 border-dashed border-ink flex items-center justify-center rounded-sm">
                <QrCode className="w-24 h-24 text-ink" />
              </div>
              <p className="text-[11px] text-text-muted mt-2 font-mono">Kode QR Berlaku: 04:59</p>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  setWaConnected(true);
                  setShowPairModal(false);
                }}
                className="mt-3 text-xs"
              >
                Simulasikan QR Berhasil Discan
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Roadmap Channels (Fase 2) */}
      <Card variant="default" className="p-6 bg-canvas">
        <h4 className="text-sm font-bold text-ink mb-2">Kanal Mendatang (Fase 2)</h4>
        <p className="text-xs text-text-muted mb-4">
          Kami sedang menyelesaikan sertifikasi API untuk kanal berikut. Anda akan diberitahu saat kanal siap digunakan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-canvas-soft p-3 rounded-sm border border-hairline-soft flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <Instagram className="w-4 h-4" /> Instagram DM
            </div>
            <span className="text-[10px] bg-canvas text-text-muted px-2 py-0.5 rounded-full border border-hairline-soft">
              Segera Hadir
            </span>
          </div>
          <div className="bg-canvas-soft p-3 rounded-sm border border-hairline-soft flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <Send className="w-4 h-4" /> Telegram Bot
            </div>
            <span className="text-[10px] bg-canvas text-text-muted px-2 py-0.5 rounded-full border border-hairline-soft">
              Segera Hadir
            </span>
          </div>
          <div className="bg-canvas-soft p-3 rounded-sm border border-hairline-soft flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <ShieldCheck className="w-4 h-4" /> Facebook Messenger
            </div>
            <span className="text-[10px] bg-canvas text-text-muted px-2 py-0.5 rounded-full border border-hairline-soft">
              Segera Hadir
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
