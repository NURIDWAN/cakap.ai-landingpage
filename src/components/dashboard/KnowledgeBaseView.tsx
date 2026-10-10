import React, { useState } from 'react';
import { KnowledgeItem, KnowledgeType } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FileText, Globe, HelpCircle, ShoppingBag, Plus, Upload, Trash2, CheckCircle } from 'lucide-react';

interface KnowledgeBaseViewProps {
  knowledgeItems: KnowledgeItem[];
  onAddItem: (item: KnowledgeItem) => void;
  onDeleteItem: (id: string) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  knowledgeItems,
  onAddItem,
  onDeleteItem,
}) => {
  const [activeTab, setActiveTab] = useState<KnowledgeType | 'all'>('all');
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  // FAQ Form State
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // URL Importer State
  const [urlInput, setUrlInput] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);

  const filteredItems = knowledgeItems.filter(
    (item) => activeTab === 'all' || item.type === activeTab
  );

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;

    const newItem: KnowledgeItem = {
      id: `kb-faq-${Date.now()}`,
      title: faqQuestion.trim(),
      type: 'faq',
      content: faqAnswer.trim(),
      status: 'ready',
      updatedAt: 'Baru saja',
    };

    onAddItem(newItem);
    setFaqQuestion('');
    setFaqAnswer('');
    setShowAddFaq(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice.trim()) return;

    const newItem: KnowledgeItem = {
      id: `kb-prod-${Date.now()}`,
      title: prodName.trim(),
      type: 'catalog',
      content: `Produk: ${prodName}. Harga: Rp ${prodPrice}. Stok: ${prodStock || 0} unit. Keterangan: ${prodDesc}`,
      status: 'ready',
      updatedAt: 'Baru saja',
      meta: {
        price: parseInt(prodPrice, 10) || 0,
        stock: parseInt(prodStock, 10) || 0,
      },
    };

    onAddItem(newItem);
    setProdName('');
    setProdPrice('');
    setProdStock('');
    setProdDesc('');
    setShowAddProduct(false);
  };

  const handleCrawlUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsCrawling(true);
    setTimeout(() => {
      const newItem: KnowledgeItem = {
        id: `kb-url-${Date.now()}`,
        title: urlInput.trim(),
        type: 'url',
        content: `Konten berhasil diindeks dari ${urlInput}. Mencakup informasi beranda, jam operasional, dan halaman FAQ resmi.`,
        status: 'ready',
        updatedAt: 'Baru saja',
        meta: { url: urlInput.trim() },
      };
      onAddItem(newItem);
      setUrlInput('');
      setIsCrawling(false);
    }, 1500);
  };

  const handleMockUploadFile = () => {
    const dummyNames = [
      'Brosur_Produk_Terbaru_2026.pdf',
      'Kebijakan_Garansi_dan_Retur.docx',
      'Daftar_Pertanyaan_Pelanggan.csv',
    ];
    const picked = dummyNames[Math.floor(Math.random() * dummyNames.length)];
    const newItem: KnowledgeItem = {
      id: `kb-doc-${Date.now()}`,
      title: picked,
      type: 'document',
      content: `Isi dokumen dari ${picked}. Memuat informasi detail layanan dan panduan pengguna.`,
      status: 'ready',
      updatedAt: 'Baru saja',
      meta: { fileSize: '1.8 MB' },
    };
    onAddItem(newItem);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas-soft p-5 rounded-md border border-hairline-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">Basis Pengetahuan (Knowledge Base).</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Sumber acuan jawaban AI. AI hanya akan menjawab fakta dari data yang ada di sini (tanpa mengarang).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleMockUploadFile}
            className="text-xs flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Dokumen (PDF)</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddProduct(true)}
            className="text-xs flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>+ Katalog Produk</span>
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowAddFaq(true)}
            className="text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ FAQ Manual</span>
          </Button>
        </div>
      </div>

      {/* URL Crawler Card */}
      <Card variant="default" className="p-4 bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Globe className="w-4 h-4 text-ink flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-ink">Impor Otomatis dari URL Website (FR-12)</h4>
            <p className="text-[11px] text-text-muted">Masukkan tautan toko atau website Anda untuk diindeks otomatis oleh AI.</p>
          </div>
        </div>
        <form onSubmit={handleCrawlUrl} className="flex gap-2 w-full sm:w-auto">
          <input
            type="url"
            placeholder="https://tokoanda.com/faq"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            required
            className="bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-1.5 text-xs outline-none focus:ring-2 focus:ring-ink flex-1 sm:w-64"
          />
          <Button type="submit" size="sm" variant="primary" disabled={isCrawling} className="text-xs">
            {isCrawling ? 'Mengindeks...' : 'Impor URL'}
          </Button>
        </form>
      </Card>

      {/* Add FAQ Modal / Drawer */}
      {showAddFaq && (
        <Card variant="featured" className="p-5 border border-hairline animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-ink flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Tambah FAQ Baru (Tanya - Jawab)
            </h4>
            <button
              onClick={() => setShowAddFaq(false)}
              className="text-xs text-text-muted hover:text-ink"
            >
              Batal
            </button>
          </div>
          <form onSubmit={handleSaveFaq} className="space-y-3">
            <Input
              label="Pertanyaan yang Sering Diajukan"
              placeholder="Contoh: Berapa lama waktu pengiriman ke luar Jawa?"
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
              required
            />
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Jawaban Resmi yang Harus Diberikan AI
              </label>
              <textarea
                rows={3}
                placeholder="Tulis jawaban lengkap dan faktual..."
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
                required
                className="w-full bg-field text-ink rounded-sm p-3 text-xs outline-none focus:ring-2 focus:ring-ink border-0"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowAddFaq(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" variant="primary">
                Simpan ke Basis Pengetahuan
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <Card variant="featured" className="p-5 border border-hairline animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-ink flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Tambah Produk ke Katalog AI
            </h4>
            <button
              onClick={() => setShowAddProduct(false)}
              className="text-xs text-text-muted hover:text-ink"
            >
              Batal
            </button>
          </div>
          <form onSubmit={handleSaveProduct} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Nama Produk / Menu"
                placeholder="Kopi Susu Gula Aren"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                required
              />
              <Input
                label="Harga (Rp)"
                placeholder="18000"
                type="number"
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                required
              />
              <Input
                label="Stok Tersedia"
                placeholder="50"
                type="number"
                value={prodStock}
                onChange={(e) => setProdStock(e.target.value)}
              />
            </div>
            <Input
              label="Keterangan / Varian"
              placeholder="Varian less sugar, opsi oat milk +5rb"
              value={prodDesc}
              onChange={(e) => setProdDesc(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowAddProduct(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" variant="primary">
                Simpan Produk
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Filters by Type */}
      <div className="flex items-center gap-2 border-b border-hairline-soft pb-2 overflow-x-auto text-xs font-semibold">
        {(
          [
            { id: 'all', label: `Semua (${knowledgeItems.length})` },
            { id: 'document', label: 'Dokumen' },
            { id: 'faq', label: 'FAQ Tanya-Jawab' },
            { id: 'catalog', label: 'Katalog Produk' },
            { id: 'url', label: 'URL Website' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              activeTab === tab.id
                ? 'bg-ink text-on-primary'
                : 'text-text-muted hover:text-ink hover:bg-canvas-soft'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Knowledge Items Table / List */}
      <div className="bg-canvas border border-hairline-soft rounded-md divide-y divide-hairline-soft overflow-hidden">
        {filteredItems.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-canvas-soft/40 transition-colors">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-canvas-soft flex items-center justify-center text-ink flex-shrink-0 mt-0.5">
                {item.type === 'document' && <FileText className="w-4 h-4" />}
                {item.type === 'faq' && <HelpCircle className="w-4 h-4" />}
                {item.type === 'catalog' && <ShoppingBag className="w-4 h-4" />}
                {item.type === 'url' && <Globe className="w-4 h-4" />}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-ink truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] bg-canvas-soft border border-hairline px-2 py-0.2 rounded-full font-medium text-text-muted">
                    {item.type.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                  {item.content}
                </p>

                <div className="mt-2 flex items-center gap-4 text-[10px] text-text-faint">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle className="w-3 h-3" /> Status: Siap Digunakan
                  </span>
                  <span>Diperbarui: {item.updatedAt}</span>
                  {item.meta?.fileSize && <span>Ukuran: {item.meta.fileSize}</span>}
                  {item.meta?.stock !== undefined && (
                    <span className="text-ink font-semibold">
                      Stok: {item.meta.stock} pcs • Rp {item.meta.price?.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDeleteItem(item.id)}
              className="text-text-faint hover:text-red-500 p-2 rounded-full transition-colors flex-shrink-0"
              title="Hapus dari basis pengetahuan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
