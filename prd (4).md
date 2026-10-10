# PRD — Cakap.ai

**Produk:** Cakap.ai, platform SaaS chatbot AI untuk layanan pelanggan, penjualan, dan otomasi percakapan bisnis
**Versi dokumen:** 0.1 (draft)
**Tanggal:** 10 Oktober 2026
**Status:** Draft untuk review
**Pemilik:** [Nama Product Owner]

> Catatan: angka target, harga, dan klaim kompetitor di dokumen ini adalah **hipotesis awal** dan ditandai `[TBD]` atau `[VERIFIKASI]`. Semuanya perlu divalidasi sebelum dipakai di materi publik.

---

## 1. Ringkasan Produk

Cakap.ai adalah platform chatbot AI berbasis SaaS yang memungkinkan bisnis di Indonesia membuat asisten AI yang menjawab pelanggan secara otomatis di WhatsApp, Instagram, Messenger, Telegram, dan widget website, tanpa perlu menulis kode.

Bisnis cukup mengunggah sumber pengetahuan (dokumen, FAQ, katalog, URL website), mengatur gaya bahasa dan aturan, lalu menghubungkan kanal. AI menjawab dalam Bahasa Indonesia yang natural, mengumpulkan data prospek, dan menyerahkan percakapan ke agen manusia saat diperlukan.

**Tagline kandidat:** "Layani pelanggan 24/7, tanpa nambah tim."

## 2. Latar Belakang dan Masalah

| Masalah | Dampak bagi bisnis |
|---|---|
| Pelanggan chat di luar jam kerja dan tidak dibalas | Prospek hilang, kepuasan turun |
| Pertanyaan yang sama berulang (harga, stok, jam buka, status pesanan) | Tim CS habis waktu untuk hal repetitif |
| Chat tersebar di banyak kanal dan banyak akun | Tidak ada satu tampilan terpadu, sulit dipantau |
| Chatbot berbasis aturan kaku | Pengalaman buruk, tidak paham bahasa sehari-hari dan slang |
| Biaya menambah tim CS tinggi | UMKM sulit skala |

**Peluang:** Adopsi WhatsApp Business dan social commerce di Indonesia tinggi, sementara LLM kini cukup baik untuk Bahasa Indonesia informal. Ada ruang untuk produk yang lokal, mudah dipakai, dan terjangkau. `[VERIFIKASI: ukuran pasar]`

## 3. Tujuan dan Metrik Keberhasilan

### Tujuan produk
1. Pengguna baru bisa membuat chatbot yang berfungsi dan terhubung ke minimal satu kanal **dalam < 15 menit**.
2. AI menyelesaikan mayoritas pertanyaan umum tanpa intervensi manusia.
3. Menjadi alternatif lokal yang kompetitif terhadap platform seperti Cekat AI dalam hal harga, kemudahan, dan kualitas Bahasa Indonesia.

### Metrik utama (target awal `[TBD]`)
| Metrik | Definisi | Target 6 bulan pertama |
|---|---|---|
| Activation rate | % akun baru yang menghubungkan ≥1 kanal dalam 7 hari | [TBD] |
| Time to first bot | Median menit dari daftar sampai bot menjawab | < 15 menit |
| AI resolution rate | % percakapan selesai tanpa handoff ke manusia | [TBD] |
| CSAT | Skor kepuasan di akhir percakapan | [TBD] |
| Trial → paid | Konversi uji coba ke berbayar | [TBD] |
| Landing page conversion | Pengunjung → daftar trial | [TBD] |
| Monthly churn | Pelanggan berbayar yang berhenti per bulan | [TBD] |

## 4. Target Pengguna

### Segmen
- **UMKM dan social seller** (toko online, F&B, fashion, jasa)
- **Bisnis menengah** (klinik, properti, pendidikan, travel, otomotif)
- **Agensi** yang mengelola banyak klien (butuh multi-workspace)

### Persona
**1. Rina, pemilik toko online (UMKM)**
Balas chat sendiri sampai larut malam. Butuh setup cepat, harga terjangkau, tanpa istilah teknis.

**2. Budi, supervisor CS di perusahaan menengah**
Mengelola 5–15 agen. Butuh inbox terpadu, pembagian tugas, laporan performa, dan kontrol atas jawaban AI.

**3. Dewi, pemilik agensi digital**
Mengelola chatbot untuk banyak klien. Butuh banyak workspace, role akses, dan opsi white-label `[fase lanjut]`.

## 5. Analisis Kompetitor (ringkas)

| Aspek | Cekat AI `[VERIFIKASI]` | Cakap.ai (target diferensiasi) |
|---|---|---|
| Positioning | Platform chatbot AI & omnichannel untuk bisnis Indonesia | Sama-sama lokal, fokus setup cepat dan kualitas bahasa informal |
| Kanal | WhatsApp, sosial media, web | Paritas di MVP, perluasan bertahap |
| Harga | Berlangganan berbasis paket | Paket jelas, trial gratis, tanpa biaya tersembunyi `[TBD]` |
| Diferensiasi | — | Onboarding < 15 menit, mode "uji coba bot" sebelum live, transparansi sumber jawaban |

> Lakukan riset kompetitor mendalam (fitur, harga, review pengguna) sebelum finalisasi positioning. Dokumen ini tidak menyalin merek, desain, atau materi kompetitor manapun.

## 6. Ruang Lingkup

### MVP (Fase 1)
- Autentikasi, workspace, manajemen anggota tim
- Pembuat chatbot AI dengan knowledge base
- Kanal: **widget web**, **WhatsApp**
- Inbox terpadu dengan handoff ke agen manusia
- Penangkapan data prospek (nama, email, nomor)
- Dasbor analitik dasar
- Langganan dan penagihan (trial + paket berbayar)
- **Landing page publik** dan **widget chat pop-up**

### Fase 2
- Kanal: Instagram DM, Facebook Messenger, Telegram
- Broadcast dan template pesan
- Integrasi: Google Sheets, webhook, e-commerce (Shopee/Tokopedia/Shopify `[VERIFIKASI ketersediaan API]`)
- Alur otomasi visual (flow builder)
- Tag, segmentasi, dan CRM ringan

### Fase 3
- Multi-workspace untuk agensi, white-label
- Voice/telepon AI
- Pembayaran dalam chat, kalender booking
- Marketplace template bot per industri

### Di luar lingkup (saat ini)
Aplikasi mobile native, call center penuh, fine-tuning model kustom per klien.

## 7. Kebutuhan Fungsional

### 7.1 Akun dan Workspace
- FR-1: Daftar dengan email + password atau Google.
- FR-2: Verifikasi email.
- FR-3: Satu akun bisa punya beberapa workspace.
- FR-4: Role: Owner, Admin, Agen, Viewer.
- FR-5: Undang anggota via email.

### 7.2 Chatbot Builder
- FR-6: Buat bot dengan nama, avatar, bahasa, dan persona (gaya bicara: formal, santai, ramah).
- FR-7: Prompt/instruksi sistem yang bisa diedit, dengan template per industri.
- FR-8: Aturan eksplisit: topik yang dilarang, kapan harus handoff, kalimat pembuka dan penutup.
- FR-9: **Mode uji coba** (playground) untuk mencoba bot sebelum dipublikasikan.
- FR-10: Versi dan riwayat perubahan konfigurasi bot.

### 7.3 Knowledge Base
- FR-11: Unggah PDF, DOCX, TXT, CSV.
- FR-12: Impor dari URL website (crawl terbatas).
- FR-13: Input FAQ manual (tanya-jawab).
- FR-14: Katalog produk sederhana (nama, harga, deskripsi, stok).
- FR-15: Status indeks per sumber (menunggu, diproses, siap, gagal).
- FR-16: Jawaban AI menampilkan sumber rujukan di dashboard (untuk audit, tidak wajib tampil ke pelanggan).
- FR-17: Bila tidak ada jawaban di knowledge base, AI **tidak mengarang**; AI mengakui keterbatasan dan menawarkan handoff.

### 7.4 Kanal
- FR-18: **Widget web**: salin-tempel satu baris script.
- FR-19: **WhatsApp**: koneksi melalui WhatsApp Business Platform `[VERIFIKASI: persyaratan Meta, template pesan, kebijakan 24 jam]`.
- FR-20 (Fase 2): Instagram, Messenger, Telegram.
- FR-21: Status koneksi kanal dan notifikasi bila terputus.

### 7.5 Inbox Terpadu dan Handoff
- FR-22: Semua percakapan dari semua kanal dalam satu daftar, dengan filter (kanal, status, agen, tag).
- FR-23: Status percakapan: Bot menangani, Menunggu agen, Ditangani agen, Selesai.
- FR-24: Handoff otomatis berdasarkan pemicu (permintaan eksplisit pelanggan, sentimen negatif, topik tertentu, AI tidak yakin).
- FR-25: Agen dapat mengambil alih dan mengembalikan ke bot.
- FR-26: Catatan internal dan penugasan ke agen.
- FR-27: Notifikasi real-time (browser, email).

### 7.6 Prospek dan Kontak
- FR-28: Bot dapat meminta dan menyimpan nama, email, nomor telepon.
- FR-29: Profil kontak dengan riwayat percakapan.
- FR-30: Ekspor kontak ke CSV.

### 7.7 Analitik
- FR-31: Jumlah percakapan, pesan, kontak baru per periode.
- FR-32: AI resolution rate dan tingkat handoff.
- FR-33: Waktu respons rata-rata.
- FR-34: Pertanyaan yang tidak terjawab (untuk memperkaya knowledge base).
- FR-35: CSAT opsional di akhir percakapan.

### 7.8 Penagihan
- FR-36: Trial gratis `[TBD durasi/kuota]`, tanpa kartu kredit.
- FR-37: Paket berlangganan bulanan/tahunan dengan kuota pesan AI dan jumlah agen.
- FR-38: Metode bayar lokal: transfer bank/VA, e-wallet, QRIS, kartu `[VERIFIKASI payment gateway]`.
- FR-39: Faktur dan riwayat pembayaran.
- FR-40: Peringatan saat kuota hampir habis.

## 8. Landing Page (cakap.ai)

### Tujuan
Mengubah pengunjung menjadi pendaftar trial. CTA utama: **"Coba Gratis"**. CTA sekunder: **"Jadwalkan Demo"**.

### Struktur section (urutan)
1. **Navbar**: logo, Fitur, Cara Kerja, Harga, FAQ, Masuk, Coba Gratis.
2. **Hero**: judul manfaat utama, sub-judul, dua CTA, visual mockup inbox + chat.
3. **Bukti sosial**: baris logo klien/mitra `[placeholder sampai ada klien nyata]`.
4. **Masalah → solusi**: tiga poin ringkas.
5. **Fitur utama**: chatbot AI, knowledge base, omnichannel inbox, handoff, analitik, integrasi.
6. **Cara kerja**: 3 langkah (Unggah pengetahuan → Hubungkan kanal → Bot mulai menjawab).
7. **Kanal & integrasi**: ikon kanal yang didukung.
8. **Use case per industri**: e-commerce, F&B, klinik, properti, pendidikan.
9. **Harga**: tabel paket `[TBD]`, toggle bulanan/tahunan.
10. **Testimoni**: hanya testimoni asli dan disetujui; sebelum ada, section disembunyikan.
11. **FAQ**: akordeon.
12. **CTA penutup** dan **footer** (tautan, kontak, Kebijakan Privasi, Syarat & Ketentuan).

### Persyaratan
- Bahasa Indonesia utama; struktur siap untuk versi Inggris.
- Responsif (mobile-first, uji di lebar 360 px ke atas).
- Kinerja: LCP < 2,5 detik pada 4G `[TBD]`; skor Lighthouse ≥ 90 `[TBD]`.
- SEO: title, meta description, Open Graph, data terstruktur, sitemap.
- Aksesibilitas: kontras teks ≥ 4,5:1, navigasi keyboard, label ARIA pada kontrol ikon.
- Analitik: event pada klik CTA, scroll depth, dan pembukaan widget chat.
- Tidak boleh memuat klaim angka, testimoni, atau logo klien yang tidak nyata.
- Widget chat Cakap.ai terpasang di landing page (lihat bagian 9).

### Gaya visual (arahan)
Bersih, modern, kepercayaan tinggi. Satu warna aksen utama, tipografi sans-serif yang terbaca, ruang putih lega, mockup produk nyata. Hindari visual generik atau meniru identitas kompetitor.

## 9. Widget Chatbot Pop-up

### Perilaku
- FR-W1: Tombol mengambang di pojok kanan bawah; klik membuka panel chat.
- FR-W2: Panel berisi header (nama bot, status online), area pesan, kolom input, tombol kirim.
- FR-W3: Pesan sapaan otomatis dan **saran pertanyaan cepat** (quick replies).
- FR-W4: Indikator mengetik, stempel waktu, dan scroll otomatis.
- FR-W5: Mendukung teks, tautan, gambar, dan tombol aksi.
- FR-W6: Formulir pra-chat opsional (nama, email/WhatsApp).
- FR-W7: Tombol "Bicara dengan agen" untuk handoff manual.
- FR-W8: Riwayat percakapan tersimpan selama sesi dan dapat dilanjutkan saat halaman dimuat ulang.
- FR-W9: Badge notifikasi dan pesan proaktif (muncul setelah N detik `[opsional]`).
- FR-W10: Mode gelap/terang mengikuti pengaturan atau tema situs.

### Kustomisasi (dari dasbor)
Warna utama, logo/avatar, judul, pesan sapaan, posisi (kiri/kanan), jam operasional, bahasa.

### Teknis
- Dipasang dengan satu snippet `<script>` asinkron, tanpa memblokir render halaman.
- Ukuran bundle awal sekecil mungkin `[TBD: < 50 KB gzip]`.
- Terisolasi dari CSS situs host (Shadow DOM atau iframe).
- Komunikasi real-time melalui WebSocket/SSE, dengan fallback polling.
- Respons AI di-*stream* agar terasa cepat.
- Validasi domain asal (allowlist) dan rate limiting per sesi/IP.
- Aksesibel: fokus keyboard, `aria-live` untuk pesan baru, tombol tutup yang jelas, Esc menutup panel.
- Responsif: layar penuh di mobile, panel mengambang di desktop.

### Untuk demo di landing page
Widget demo menjawab dari knowledge base Cakap.ai sendiri (fitur, harga, cara mulai), dengan batas penggunaan agar biaya terkendali.

## 10. Alur Pengguna Utama

**A. Onboarding (target < 15 menit)**
Daftar → verifikasi email → pilih industri → beri nama bot → unggah/tempel sumber pengetahuan → uji di playground → pasang widget atau hubungkan WhatsApp → bot live.

**B. Percakapan pelanggan**
Pelanggan kirim pesan → AI mencari konteks di knowledge base → AI menjawab → bila tidak yakin/diminta/negatif → handoff ke agen → agen membalas → percakapan ditutup, CSAT opsional.

**C. Perbaikan berkelanjutan**
Supervisor membuka laporan "pertanyaan tidak terjawab" → menambah FAQ → menguji ulang → publikasi.

## 11. Kebutuhan Non-Fungsional

| Area | Persyaratan |
|---|---|
| Kinerja | Token pertama respons AI < 2 detik pada kondisi normal `[TBD]`; respons lengkap rata-rata < 6 detik |
| Ketersediaan | Target uptime 99,5% pada MVP `[TBD]` |
| Skalabilitas | Arsitektur multi-tenant; antrean pesan untuk lonjakan trafik |
| Keamanan | HTTPS/TLS, enkripsi data saat disimpan, isolasi data antar tenant, secret tersimpan aman, audit log |
| Privasi | Kepatuhan **UU Pelindungan Data Pribadi (UU PDP)**; persetujuan pengumpulan data; hak hapus dan ekspor data; kebijakan retensi `[TBD]` |
| Keandalan AI | Pembatasan jawaban ke knowledge base, deteksi prompt injection, filter konten berbahaya, fallback saat model gagal |
| Observabilitas | Logging terstruktur, metrik, peringatan, pelacakan biaya token per tenant |
| Lokalisasi | Bahasa Indonesia utama, zona waktu WIB/WITA/WIT, format mata uang Rupiah |

## 12. Arsitektur Tingkat Tinggi (usulan)

```
Kanal (Web Widget, WhatsApp, IG, ...)
        │
   Gateway Kanal / Webhook
        │
   Message Queue ──► Orkestrator Percakapan
                          │
        ┌─────────────────┼──────────────────┐
   Retrieval (RAG)    LLM Provider      Aturan & Handoff
   Vector DB          (dapat diganti)   Engine
        │
   Database utama (tenant, bot, kontak, pesan)
        │
   Dasbor Web (Inbox, Builder, Analitik, Billing)
```

**Usulan stack** `[bisa diubah]`: Frontend Next.js/React + TypeScript; Backend Node.js atau Python; PostgreSQL + pgvector; Redis untuk antrean/cache; penyimpanan objek untuk dokumen; LLM melalui lapisan abstraksi agar penyedia model dapat diganti.

## 13. Model Data (ringkas)

- **Workspace** (id, nama, paket, kuota)
- **User** (id, email, role per workspace)
- **Bot** (id, workspace_id, persona, aturan, status)
- **KnowledgeSource** (id, bot_id, tipe, status indeks)
- **Chunk/Embedding** (id, source_id, teks, vektor)
- **Channel** (id, bot_id, tipe, kredensial terenkripsi, status)
- **Contact** (id, workspace_id, nama, email, telepon, atribut)
- **Conversation** (id, contact_id, channel_id, status, agen)
- **Message** (id, conversation_id, pengirim, isi, metadata, waktu)
- **Subscription / Invoice**

## 14. Hipotesis Model Harga `[TBD — validasi riset pasar]`

| Paket | Sasaran | Batas utama |
|---|---|---|
| Starter | UMKM | 1 bot, 1–2 kanal, kuota pesan AI terbatas, 1–2 agen |
| Growth | Bisnis kecil–menengah | Lebih banyak kanal & agen, analitik lanjut, integrasi |
| Business | Skala lebih besar | Multi-bot, SLA, dukungan prioritas, API |
| Enterprise | Kustom | Kontrak khusus, keamanan tambahan |

Dasar biaya: biaya inferensi LLM dan biaya pesan WhatsApp per percakapan harus dihitung agar margin sehat.

## 15. Rencana Rilis (indikatif)

| Milestone | Isi | Perkiraan |
|---|---|---|
| M0 | Riset kompetitor & pengguna, desain, finalisasi PRD | Minggu 1–3 |
| M1 | Landing page + waitlist + widget demo | Minggu 3–5 |
| M2 | Alpha internal: builder, knowledge base, widget web, inbox | Minggu 5–11 |
| M3 | Beta tertutup: + WhatsApp, handoff, analitik dasar, billing | Minggu 11–16 |
| M4 | Rilis publik MVP | Minggu 16–18 |
| M5 | Fase 2: kanal tambahan, broadcast, integrasi | Setelah rilis |

## 16. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| AI berhalusinasi / memberi info keliru | Jawaban dibatasi pada knowledge base, handoff saat tidak yakin, ulasan "pertanyaan tidak terjawab" |
| Biaya LLM dan pesan WhatsApp menekan margin | Pemantauan biaya per tenant, kuota, caching, model berjenjang |
| Ketergantungan pada kebijakan Meta/WhatsApp | Pelajari persyaratan sejak awal, siapkan kanal alternatif |
| Kebocoran data / pelanggaran UU PDP | Isolasi tenant, enkripsi, audit keamanan, kebijakan privasi jelas |
| Persaingan ketat | Fokus diferensiasi: kecepatan setup, kualitas bahasa, harga transparan |
| Penyalahgunaan (spam, konten terlarang) | Rate limit, moderasi, syarat penggunaan, mekanisme penangguhan |
| Ketergantungan satu penyedia LLM | Lapisan abstraksi dan opsi model cadangan |

## 17. Pertanyaan Terbuka

1. Segmen mana yang diprioritaskan pertama: UMKM atau bisnis menengah?
2. Apakah mendukung WhatsApp resmi (Cloud API) saja, atau juga opsi lain di fase awal?
3. Penyedia LLM dan strategi biaya yang dipilih?
4. Struktur harga final dan kuota trial?
5. Apakah perlu hosting data di dalam negeri (data residency)?
6. Apakah white-label untuk agensi masuk lebih awal?
7. Tim dan anggaran yang tersedia untuk MVP?

## 18. Kriteria Penerimaan MVP

- [ ] Pengguna baru dapat membuat bot, mengunggah dokumen, dan mendapat jawaban yang benar di playground dalam < 15 menit.
- [ ] Widget terpasang di situs uji hanya dengan satu snippet dan berfungsi di Chrome, Safari, Firefox, serta mobile.
- [ ] WhatsApp terhubung dan pesan masuk/keluar tampil di inbox.
- [ ] Handoff ke agen berfungsi pada semua pemicu yang ditentukan.
- [ ] Saat jawaban tidak ada di knowledge base, bot tidak mengarang dan menawarkan handoff.
- [ ] Data antar workspace terbukti terisolasi lewat pengujian.
- [ ] Penagihan dan perubahan paket berjalan end-to-end.
- [ ] Landing page memenuhi target kinerja, SEO, dan aksesibilitas pada bagian 8.
- [ ] Kebijakan Privasi dan Syarat & Ketentuan tersedia dan ditinjau.

---

*Dokumen ini adalah draft hidup. Perubahan dicatat di riwayat versi, dan setiap `[TBD]`/`[VERIFIKASI]` harus ditutup sebelum rilis publik.*
