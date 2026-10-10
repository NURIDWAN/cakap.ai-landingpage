import React from 'react';
import { Accordion } from '../ui/Accordion';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'Apakah nomor WhatsApp saya aman dari banned / blokir?',
    answer: 'Sangat aman. Cakap.ai terhubung menggunakan WhatsApp Business Platform (Cloud API) resmi dari Meta. Kami tidak menggunakan bot scraping tidak resmi atau WhatsApp web bajakan yang berisiko banned.',
  },
  {
    id: 'faq-2',
    question: 'Apakah AI bisa mengarang jawaban atau berhalusinasi?',
    answer: 'Tidak. Sistem Cakap.ai menerapkan teknologi RAG (Retrieval-Augmented Generation) yang ketat. Bot diwajibkan hanya menjawab berdasarkan dokumen, FAQ, atau katalog yang Anda unggah. Jika informasi tidak ada di basis pengetahuan, bot akan jujur mengakui dan menawarkan bantuan agen manusia.',
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara agen manusia mengambil alih percakapan?',
    answer: 'Di kotak masuk terpadu (inbox), ada tombol "Ambil Alih". Begitu ditekan, AI akan otomatis berhenti membalas pada obrolan tersebut dan agen dapat langsung mengetik jawaban manual. Kapan saja agen dapat mengembalikan percakapan ke AI.',
  },
  {
    id: 'faq-4',
    question: 'Apakah data saya aman dan mematuhi UU PDP Indonesia?',
    answer: 'Ya, seluruh infrastruktur Cakap.ai mematuhi Undang-Undang Pelindungan Data Pribadi (UU PDP). Data setiap bisnis dienkripsi (TLS 1.3 & AES-256) serta diisolasi secara multi-tenant. Data Anda tidak pernah digunakan untuk melatih model publik.',
  },
  {
    id: 'faq-5',
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami mendukung pembayaran lokal Indonesia terlengkap: QRIS, Virtual Account bank BCA, Mandiri, BNI, BRI, serta e-wallet (GoPay, OVO, ShopeePay) melalui payment gateway resmi.',
  },
  {
    id: 'faq-6',
    question: 'Berapa lama proses setup sampai bot mulai menjawab?',
    answer: 'Rata-rata pengguna baru menyelesaikan setup dalam waktu kurang dari 15 menit. Anda cukup daftar, unggah 1 dokumen FAQ atau link toko, lalu aktifkan widget atau hubungkan nomor WhatsApp.',
  },
];

export const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Pertanyaan yang sering diajukan.
        </h2>
        <p className="mt-2 text-sm text-text-muted font-light">
          Segala hal yang perlu Anda ketahui tentang implementasi Cakap.ai untuk bisnis Anda.
        </p>
      </div>

      <Accordion items={FAQ_ITEMS} />
    </section>
  );
};
