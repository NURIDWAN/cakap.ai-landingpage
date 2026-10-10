import React, { useState } from 'react';
import { BotConfig, BotTone, KnowledgeItem } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SquircleIcon } from '../ui/SquircleIcon';
import {
  buildSystemInstruction,
  generateGeminiChat,
  testGeminiApiKey,
  cleanBotOutput,
} from '../../services/geminiService';
import {
  Bot,
  Sparkles,
  Send,
  Check,
  ShieldAlert,
  Sliders,
  Eye,
  EyeOff,
  Cpu,
  FileCode,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface BotBuilderViewProps {
  botConfig: BotConfig;
  knowledgeBase: KnowledgeItem[];
  onSaveConfig: (updated: BotConfig) => void;
}

export const BotBuilderView: React.FC<BotBuilderViewProps> = ({
  botConfig,
  knowledgeBase,
  onSaveConfig,
}) => {
  const [form, setForm] = useState<BotConfig>(() => ({
    ...botConfig,
    geminiApiKey:
      botConfig.geminiApiKey ||
      (import.meta.env.VITE_GEMINI_API_KEY as string) ||
      localStorage.getItem('cakap_gemini_api_key') ||
      '',
    geminiModel:
      botConfig.geminiModel ||
      (import.meta.env.VITE_GEMINI_MODEL as string) ||
      'gemini-1.5-flash',
    temperature: botConfig.temperature ?? 0.4,
  }));

  const [showApiKey, setShowApiKey] = useState(false);
  const [testApiStatus, setTestApiStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  const [prohibitedInput, setProhibitedInput] = useState('');
  const [handoffInput, setHandoffInput] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [showCommandPreview, setShowCommandPreview] = useState(false);

  // Playground state
  const [testMessages, setTestMessages] = useState<
    Array<{ sender: 'user' | 'bot'; text: string; modelTag?: string }>
  >([
    {
      sender: 'bot',
      text: form.greetingMessage || 'Halo! Ada yang bisa saya bantu hari ini?',
      modelTag: form.geminiApiKey ? 'Gemini AI' : 'Simulasi',
    },
  ]);
  const [testInput, setTestInput] = useState('');
  const [isBotResponding, setIsBotResponding] = useState(false);

  const INDUSTRY_TEMPLATES = [
    {
      name: 'E-Commerce / Olshop',
      prompt:
        'Anda adalah asisten penjualan toko online ramah di Indonesia. Selalu bantu cek variasi stok baju, estimasi ongkir ke kota pelanggan, dan tawarkan pembuatan format order cepat.',
    },
    {
      name: 'F&B / Kafe & Resto',
      prompt:
        'Anda adalah asisten reservasi kafe & restoran. Berikan informasi menu terlaris, promo bundling mingguan, dan catat nama serta jumlah tamu untuk reservasi meja.',
    },
    {
      name: 'Klinik & Kesehatan',
      prompt:
        'Anda adalah resepsionis klinik medis. Berikan informasi jadwal praktek dokter spesialis, tarif konsultasi umum, dan jadwalkan antrean pasien dengan bahasa yang santun dan empati.',
    },
  ];

  const handleSave = () => {
    if (form.geminiApiKey) {
      localStorage.setItem('cakap_gemini_api_key', form.geminiApiKey.trim());
    }
    onSaveConfig(form);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleTestApiKey = async () => {
    const keyToTest = form.geminiApiKey || '';
    if (!keyToTest.trim()) {
      setTestApiStatus({
        loading: false,
        success: false,
        message: 'Silakan masukkan Gemini API Key terlebih dahulu.',
      });
      return;
    }

    setTestApiStatus({ loading: true });
    const result = await testGeminiApiKey(keyToTest, form.geminiModel);
    setTestApiStatus({
      loading: false,
      success: result.success,
      message: result.message,
    });
  };

  const handleAddProhibited = () => {
    if (!prohibitedInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      prohibitedTopics: [...prev.prohibitedTopics, prohibitedInput.trim()],
    }));
    setProhibitedInput('');
  };

  const handleRemoveProhibited = (index: number) => {
    setForm((prev) => ({
      ...prev,
      prohibitedTopics: prev.prohibitedTopics.filter((_, i) => i !== index),
    }));
  };

  const handleAddHandoff = () => {
    if (!handoffInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      handoffKeywords: [...prev.handoffKeywords, handoffInput.trim()],
    }));
    setHandoffInput('');
  };

  const handleRemoveHandoff = (index: number) => {
    setForm((prev) => ({
      ...prev,
      handoffKeywords: prev.handoffKeywords.filter((_, i) => i !== index),
    }));
  };

  const handleTestSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim() || isBotResponding) return;

    const userText = testInput.trim();
    setTestMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setTestInput('');
    setIsBotResponding(true);

    try {
      const response = await generateGeminiChat({
        message: userText,
        botConfig: form,
        knowledgeBase,
        apiKey: form.geminiApiKey,
        model: form.geminiModel,
      });

      setTestMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.text,
          modelTag: response.modelUsed,
        },
      ]);
    } catch {
      setTestMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Maaf, terjadi kendala saat memproses respons.',
          modelTag: 'Error',
        },
      ]);
    } finally {
      setIsBotResponding(false);
    }
  };

  const liveSystemInstruction = buildSystemInstruction(form, knowledgeBase);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas-soft p-5 rounded-md border border-hairline-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">
            Pembuat Bot & Pengaturan Gemini AI.
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Atur koneksi Google Gemini API, susun Command System (System Instruction), dan uji di Playground interaktif.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isSavedNotice && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Konfigurasi Disimpan
            </span>
          )}
          <Button variant="primary" size="sm" onClick={handleSave}>
            Simpan Perubahan ↗
          </Button>
        </div>
      </div>

      {/* Two Column Layout: Editor (Left) & Live Playground (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Gemini API Key & Model Configuration Card */}
          <Card variant="featured" className="p-6 border border-hairline space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-ink" />
                <h3 className="text-sm font-bold text-ink">
                  Koneksi Google Gemini API & Model
                </h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-canvas border border-hairline text-ink">
                {form.geminiApiKey ? 'API Key Terisi' : 'Mode Fallback Lokal'}
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              Masukkan Google Gemini API Key Anda. Jika kosong, sistem otomatis menggunakan mode simulasi lokal tanpa error. Dapatkan API Key gratis di{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="underline font-semibold text-ink"
              >
                Google AI Studio ↗
              </a>
            </p>

            {/* API Key Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-ink flex items-center justify-between">
                <span>Gemini API Key</span>
                <span className="text-[11px] text-text-muted font-normal">
                  Disimpan di .env / browser
                </span>
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="AIzaSy..."
                  value={form.geminiApiKey || ''}
                  onChange={(e) => setForm({ ...form, geminiApiKey: e.target.value })}
                  className="w-full bg-field text-ink placeholder:text-text-faint rounded-sm px-4 py-2.5 pr-20 text-xs font-mono outline-none border-0 focus:ring-2 focus:ring-ink"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-1 text-text-muted hover:text-ink text-xs"
                    title={showApiKey ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <Button
                    type="button"
                    size="sm"
                    variant="primary"
                    disabled={testApiStatus.loading}
                    onClick={handleTestApiKey}
                    className="h-7 px-2.5 text-[10px] font-semibold"
                  >
                    {testApiStatus.loading ? 'Menguji...' : 'Uji Koneksi'}
                  </Button>
                </div>
              </div>

              {testApiStatus.message && (
                <div
                  className={`p-2.5 rounded-sm text-xs flex items-center gap-2 mt-2 ${
                    testApiStatus.success
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-red-50 text-red-900 border border-red-200'
                  }`}
                >
                  {testApiStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-700 flex-shrink-0" />
                  )}
                  <span>{testApiStatus.message}</span>
                </div>
              )}
            </div>

            {/* Model & Temperature Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Model Gemini
                </label>
                <select
                  value={form.geminiModel || 'gemini-2.5-flash'}
                  onChange={(e) => setForm({ ...form, geminiModel: e.target.value })}
                  className="w-full bg-field text-ink rounded-sm px-3 py-2 text-xs outline-none font-medium border-0 focus:ring-2 focus:ring-ink"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Direkomendasikan: Super Cepat & Faktual)</option>
                  <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Ultra Cepat)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Penalaran Mendalam)</option>
                  <option value="gemini-flash-latest">gemini-flash-latest (Versi Terbaru)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-ink mb-1.5">
                  <span>Temperature (Kreativitas)</span>
                  <span className="font-mono text-text-muted">{form.temperature ?? 0.4}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={form.temperature ?? 0.4}
                  onChange={(e) =>
                    setForm({ ...form, temperature: parseFloat(e.target.value) })
                  }
                  className="w-full accent-ink cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-text-faint">
                  <span>0.0 (Presisi/Faktual)</span>
                  <span>1.0 (Kreatif)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Identity & Persona Card */}
          <Card variant="default" className="p-6 bg-canvas space-y-4">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Bot className="w-4 h-4 text-ink" /> Identitas & Gaya Bicara
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Bot Asisten"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Bahasa Utama"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-ink mb-2">
                Gaya Persona (Tone)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['ramah', 'santai', 'formal'] as BotTone[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, tone: t })}
                    className={`py-2 px-3 rounded-full text-xs font-medium capitalize border transition-all ${
                      form.tone === t
                        ? 'bg-ink text-on-primary border-ink'
                        : 'bg-canvas text-ink border-hairline hover:bg-canvas-soft'
                    }`}
                  >
                    {t === 'ramah'
                      ? '😊 Ramah & Empatis'
                      : t === 'santai'
                      ? '⚡ Gaul & Santai'
                      : '👔 Profesional / Formal'}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* System Prompt & Industry Templates */}
          <Card variant="default" className="p-6 bg-canvas space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                <Sliders className="w-4 h-4 text-ink" /> Prompt Sistem Khusus Bisnis
              </h3>
              <span className="text-[11px] text-text-muted">Template:</span>
            </div>

            {/* Quick Template Buttons */}
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setForm({ ...form, systemPrompt: tmpl.prompt })}
                  className="text-xs bg-canvas-soft hover:bg-field border border-hairline px-3 py-1 rounded-full text-ink font-medium transition-colors"
                >
                  + {tmpl.name}
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              value={form.systemPrompt}
              onChange={(e) => setForm({ ...form, systemPrompt: e.target.value })}
              className="w-full bg-field text-ink rounded-sm p-3 text-xs leading-relaxed outline-none focus:ring-2 focus:ring-ink border-0"
              placeholder="Instruksikan bagaimana bot harus bersikap dan menjawab pelanggan..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Kalimat Pembuka (Greeting)"
                value={form.greetingMessage}
                onChange={(e) => setForm({ ...form, greetingMessage: e.target.value })}
              />
              <Input
                label="Kalimat Penutup"
                value={form.closingMessage}
                onChange={(e) => setForm({ ...form, closingMessage: e.target.value })}
              />
            </div>
          </Card>

          {/* Explicit Rules & Prohibited Topics (FR-8) */}
          <Card variant="default" className="p-6 bg-canvas space-y-4">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-ink" /> Aturan Eksplisit & Handoff
            </h3>

            {/* Prohibited Topics */}
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Topik yang Dilarang Diberitahu
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Ketik topik terlarang lalu tekan Tambah..."
                  value={prohibitedInput}
                  onChange={(e) => setProhibitedInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddProhibited())}
                  className="flex-1 bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
                />
                <Button size="sm" variant="outline" onClick={handleAddProhibited} className="text-xs">
                  Tambah
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {form.prohibitedTopics.map((top, idx) => (
                  <span
                    key={idx}
                    className="bg-red-50 text-red-900 border border-red-200 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5"
                  >
                    <span>{top}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProhibited(idx)}
                      className="text-red-700 hover:text-red-950 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Handoff Trigger Keywords */}
            <div className="pt-2 border-t border-hairline-soft">
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Kata Kunci Pemicu Handoff ke CS Manusia
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Ketik kata kunci lalu tekan Tambah..."
                  value={handoffInput}
                  onChange={(e) => setHandoffInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHandoff())}
                  className="flex-1 bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
                />
                <Button size="sm" variant="outline" onClick={handleAddHandoff} className="text-xs">
                  Tambah
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {form.handoffKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-50 text-amber-900 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHandoff(idx)}
                      className="text-amber-700 hover:text-amber-950 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Command System Live Preview (System Instruction Prompt) */}
          <Card variant="default" className="p-6 bg-canvas space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-ink" />
                <h3 className="text-sm font-bold text-ink">
                  Pratinjau Command System (Prompt Instruksi ke Gemini)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCommandPreview(!showCommandPreview)}
                className="text-xs font-semibold text-ink underline"
              >
                {showCommandPreview ? 'Sembunyikan' : 'Lihat Teks Prompt ↗'}
              </button>
            </div>

            <p className="text-xs text-text-muted">
              Ini adalah instruksi sistem yang dikirimkan secara otomatis ke Google Gemini di balik layar setiap kali pengguna mengirim pesan, mencakup seluruh aturan dan basis pengetahuan aktif.
            </p>

            {showCommandPreview && (
              <pre className="bg-canvas-soft border border-hairline-soft rounded-sm p-4 text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-ink max-h-72 overflow-y-auto no-scrollbar">
                {liveSystemInstruction}
              </pre>
            )}
          </Card>
        </div>

        {/* Right: Live Playground Simulator with Gemini AI (5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-[760px] bg-canvas border border-hairline-soft rounded-md overflow-hidden sticky top-6">
          {/* Playground Header */}
          <div className="p-4 bg-canvas-soft border-b border-hairline-soft flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SquircleIcon size="sm" className="bg-ink text-on-primary border-0">
                <Sparkles className="w-3.5 h-3.5" />
              </SquircleIcon>
              <div>
                <h4 className="text-xs font-bold text-ink">Playground Uji Coba Langsung</h4>
                <p className="text-[10px] text-text-muted">
                  Model: {form.geminiApiKey ? form.geminiModel : 'Simulasi Cerdas Lokal'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                setTestMessages([
                  {
                    sender: 'bot',
                    text: form.greetingMessage || 'Halo! Ada yang bisa saya bantu hari ini?',
                    modelTag: form.geminiApiKey ? 'Gemini AI' : 'Simulasi',
                  },
                ])
              }
              className="text-[11px] text-text-muted hover:text-ink font-semibold underline"
            >
              Reset Chat
            </button>
          </div>

          {/* Playground Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-canvas-soft/30 no-scrollbar">
            {testMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] text-text-muted font-medium">
                    {msg.sender === 'user' ? 'Anda (Tester)' : form.name}
                  </span>
                  {msg.modelTag && (
                    <span className="text-[9px] bg-canvas-soft border border-hairline text-text-muted px-1.5 py-0.2 rounded-full">
                      {msg.modelTag}
                    </span>
                  )}
                </div>
                <div
                  className={`text-xs p-3.5 leading-relaxed max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-ink text-on-primary rounded-2xl rounded-tr-sm'
                      : 'bg-canvas border border-hairline text-ink rounded-2xl rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{cleanBotOutput(msg.text)}</p>
                </div>
              </div>
            ))}

            {isBotResponding && (
              <div className="flex flex-col items-start">
                <div className="bg-canvas border border-hairline-soft text-ink rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Playground Input */}
          <form onSubmit={handleTestSend} className="p-3 bg-canvas border-t border-hairline-soft flex gap-2">
            <input
              type="text"
              placeholder={
                isBotResponding
                  ? 'Menunggu respons model Gemini...'
                  : 'Ketik pertanyaan untuk menguji bot...'
              }
              disabled={isBotResponding}
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              className="flex-1 bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
            />
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={!testInput.trim() || isBotResponding}
              className="h-9 px-3"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
