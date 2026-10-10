import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ShoppingBag, Coffee, HeartPulse, Home, GraduationCap, Sparkles } from 'lucide-react';

const USE_CASES = [
  {
    id: 'olshop',
    label: 'E-Commerce / Olshop',
    icon: ShoppingBag,
    title: 'Konversi chat malam hari jadi pesanan.',
    desc: 'Otomatis cek varian ukuran, warna, stok gudang, dan infokan ongkos kirim ke seluruh kota di Indonesia tanpa admin harus begadang.',
    sampleQuery: 'Min, gamis warna Sage Green ukuran L masih ready gak? Kalau kirim ke Surabaya berapa hari ya?',
    sampleAnswer: 'Halo kak! Gamis Sage Green size L masih ready 12 pcs ya. Pengiriman ke Surabaya estimasi 2-3 hari kerja via J&T/SiCepat. Mau langsung kami buatkan format pesanan kak?',
  },
  {
    id: 'fnb',
    label: 'F&B & Restoran',
    icon: Coffee,
    title: 'Reservasi meja dan informasi menu.',
    desc: 'Bantu tamu kafe mengecek menu halal, promo bundling akhir pekan, dan memesan meja untuk acara keluarga dengan cepat.',
    sampleQuery: 'Halo kafe Senja, malam ini ada live music? Boleh pesan meja smoking area untuk 6 orang jam 19.30?',
    sampleAnswer: 'Halo kak! Malam ini ada acoustic live music mulai pukul 19.00 WIB. Meja smoking untuk 6 orang masih tersedia ya. Boleh minta nama dan nomor telepon untuk kami reservasikan sekarang?',
  },
  {
    id: 'klinik',
    label: 'Klinik & Kesehatan',
    icon: HeartPulse,
    title: 'Jadwal dokter dan pendaftaran pasien.',
    desc: 'Pasien tidak perlu antre telepon. AI dapat memberikan jadwal praktek dokter spesialis dan mencatat jadwal konsultasi.',
    sampleQuery: 'Dokter gigi spesialis anak praktek hari apa saja ya suster? Biaya konsultasinya berapa?',
    sampleAnswer: 'Pagi Bu! Drg. Nadia, Sp.KGA praktek setiap Selasa & Kamis pukul 15.00 - 19.00 WIB. Biaya konsultasi Rp 150.000. Apakah ingin kami bantu daftarkan antrean untuk hari Kamis ini?',
  },
  {
    id: 'properti',
    label: 'Agen Properti',
    icon: Home,
    title: 'Filter prospek pembeli serius.',
    desc: 'Kirimkan e-brosur, denah lantai tipe rumah, dan atur janji temu survei lokasi perumahan dengan marketing representative.',
    sampleQuery: 'Bisa minta brosur tipe 45 Cluster Magnolia? Ada simulasi cicilan DP 0%?',
    sampleAnswer: 'Halo Pak! E-brosur dan price list Cluster Magnolia tipe 45 sudah kami kirimkan ke chat ini ya. Untuk promo DP 0%, cicilan mulai Rp 3,8 jt/bulan. Kapan bapak ada waktu luang untuk kami jadwalkan survei unit contoh?',
  },
  {
    id: 'kursus',
    label: 'Pendidikan / Kursus',
    icon: GraduationCap,
    title: 'Pendaftaran calon peserta didik.',
    desc: 'Jelaskan silabus materi, jadwal kelas, harga pendaftaran, dan kumpulkan data calon siswa baru secara otomatis.',
    sampleQuery: 'Halo kak, untuk bootcamp AI for Business ini kelasnya online atau offline? Materinya apa saja?',
    sampleAnswer: 'Halo! Kelas diselenggarakan full online via Zoom interaktif setiap Sabtu pukul 09.00 - 12.00 WIB. Silabus mencakup prompt engineering, automasi bisnis, dan studi kasus UMKM. Mau kami kirimkan silabus lengkapnya?',
  },
];

export const IndustryUseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState(USE_CASES[0].id);
  const activeCase = USE_CASES.find((c) => c.id === activeTab) || USE_CASES[0];

  return (
    <section id="use-case" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Solusi teruji di berbagai industri.
        </h2>
        <p className="mt-3 text-base text-text-muted font-light">
          Lihat bagaimana asisten Cakap.ai melayani pelanggan dengan gaya bahasa yang pas untuk setiap sektor bisnis.
        </p>
      </div>

      {/* Tabs list (Stadium pills) */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
        {USE_CASES.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`h-10 px-4 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 flex-shrink-0 transition-all ${
                isActive
                  ? 'bg-ink text-on-primary'
                  : 'bg-canvas-soft text-text-muted hover:text-ink hover:bg-field'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Preview */}
      <Card variant="featured" className="p-6 sm:p-10 border border-hairline-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Persona Siap Pakai
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-ink leading-tight">
              {activeCase.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              {activeCase.desc}
            </p>
          </div>

          <div className="lg:col-span-7 bg-canvas rounded-md p-5 border border-hairline-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft text-xs text-text-muted">
              <span className="font-semibold text-ink">Simulasi WhatsApp Live</span>
              <span>Bahasa Indonesia Natural</span>
            </div>

            {/* Customer bubble */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-text-muted mb-1">Pelanggan</span>
              <div className="bg-ink text-on-primary text-xs sm:text-sm p-3.5 rounded-2xl rounded-tr-sm max-w-[90%] leading-relaxed">
                {activeCase.sampleQuery}
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-text-muted mb-1 font-semibold flex items-center gap-1">
                Asisten Cakap (AI)
              </span>
              <div className="bg-canvas-soft border border-hairline-soft text-ink text-xs sm:text-sm p-3.5 rounded-2xl rounded-tl-sm max-w-[90%] leading-relaxed">
                {activeCase.sampleAnswer}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
