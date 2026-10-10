interface BotResponse {
  text: string;
  source?: string;
  triggerHandoff?: boolean;
}

export function answerFromKnowledgeBase(query: string): BotResponse {
  const normalized = query.toLowerCase().trim();

  // Explicit handoff triggers
  if (
    normalized.includes('agen') ||
    normalized.includes('manusia') ||
    normalized.includes('cs') ||
    normalized.includes('operator') ||
    normalized.includes('bicara dengan orang')
  ) {
    return {
      text: 'Tentu, saya siap hubungkan Anda dengan tim Customer Support manusia kami sekarang. Mohon tunggu sebentar ya kak, agen kami akan segera membalas di percakapan ini.',
      triggerHandoff: true,
    };
  }

  // Pricing inquiries
  if (
    normalized.includes('harga') ||
    normalized.includes('paket') ||
    normalized.includes('biaya') ||
    normalized.includes('langganan') ||
    normalized.includes('tarif') ||
    normalized.includes('berapa')
  ) {
    return {
      text: 'Paket langganan Cakap.ai mulai dari Rp 299.000/bulan untuk paket Starter (1 bot, 1.000 pesan AI, 1 agen). Paket terpopuler kami adalah Growth seharga Rp 699.000/bulan dengan 3 bot, 5.000 pesan AI, 3 akun agen, dan dukungan WhatsApp resmi. Anda juga bisa hemat 20% jika memilih paket tahunan!',
      source: 'Basis Pengetahuan: Daftar Harga & Rincian Paket Berlangganan',
    };
  }

  // Free trial inquiries
  if (
    normalized.includes('trial') ||
    normalized.includes('gratis') ||
    normalized.includes('coba') ||
    normalized.includes('free')
  ) {
    return {
      text: 'Ya, Cakap.ai menyediakan uji coba gratis (Free Trial) selama 14 hari penuh tanpa perlu memasukkan kartu kredit! Anda bisa langsung mencoba fitur bot builder, knowledge base, dan widget web seketika.',
      source: 'Basis Pengetahuan: Panduan Layanan & Fitur Utama Cakap.ai.pdf',
    };
  }

  // WhatsApp connection inquiries
  if (
    normalized.includes('whatsapp') ||
    normalized.includes('wa') ||
    normalized.includes('meta') ||
    normalized.includes('konek') ||
    normalized.includes('sambung')
  ) {
    return {
      text: 'Integrasi WhatsApp di Cakap.ai menggunakan Meta WhatsApp Business Cloud API resmi. Anda cukup memasukkan nomor bisnis, verifikasi OTP Meta di dashboard, dan chatbot langsung aktif dalam waktu kurang dari 15 menit tanpa risiko nomor diblokir.',
      source: 'Basis Pengetahuan: Cara Koneksi WhatsApp Business Cloud API',
    };
  }

  // Knowledge base / source inquiries
  if (
    normalized.includes('knowledge') ||
    normalized.includes('dokumen') ||
    normalized.includes('pdf') ||
    normalized.includes('faq') ||
    normalized.includes('katalog')
  ) {
    return {
      text: 'Anda cukup mengunggah file PDF, DOCX, FAQ manual, atau memasukkan link URL website bisnis Anda. AI Cakap.ai akan memproses dan mengindeks seluruh informasi tersebut dalam hitungan detik agar bot dapat menjawab dengan akurat tanpa halusinasi.',
      source: 'Basis Pengetahuan: Panduan Layanan & Fitur Utama Cakap.ai.pdf',
    };
  }

  // Privacy & PDP law inquiries
  if (
    normalized.includes('aman') ||
    normalized.includes('privasi') ||
    normalized.includes('pdp') ||
    normalized.includes('data') ||
    normalized.includes('keamanan')
  ) {
    return {
      text: 'Keamanan data Anda terjamin. Cakap.ai mematuhi penuh Undang-Undang Pelindungan Data Pribadi (UU PDP). Semua data percakapan dienkripsi dengan standar bank (TLS 1.3 dan AES-256) serta diisolasi ketat per tenant, tidak pernah dibagikan atau dipakai melatih model publik.',
      source: 'Basis Pengetahuan: https://cakap.ai/kebijakan-privasi-uupdp',
    };
  }

  // Product catalog demo inquiries
  if (
    normalized.includes('stok') ||
    normalized.includes('kopi') ||
    normalized.includes('croissant') ||
    normalized.includes('menu') ||
    normalized.includes('pesan')
  ) {
    return {
      text: 'Untuk menu sampel demo: Kopi Susu Gula Aren tersedia 50 cup (Rp 18.000), Croissant Butter 24 pcs (Rp 25.000), dan Paket Bundling Hemat 15 paket (Rp 38.000). Bot kami dapat mengecek stok dan menghitung total harga pesanan secara instan!',
      source: 'Basis Pengetahuan: Katalog Produk & Paket Sample Demo',
    };
  }

  // General greetings
  if (
    normalized.includes('halo') ||
    normalized.includes('hai') ||
    normalized.includes('pagi') ||
    normalized.includes('siang') ||
    normalized.includes('malam') ||
    normalized.includes('assalamu')
  ) {
    return {
      text: 'Halo! Selamat datang di Cakap.ai. Saya asisten AI yang siap membantu menjawab pertanyaan seputar fitur chatbot, integrasi WhatsApp, harga paket, atau simulasi demo kami. Ada yang ingin Anda ketahui?',
    };
  }

  // Fallback (FR-17: When no answer in knowledge base, AI does not make things up, admits limitation and offers handoff)
  return {
    text: 'Maaf, saya belum menemukan informasi spesifik mengenai hal tersebut di dalam basis pengetahuan kami saat ini. Agar informasi yang Anda dapatkan 100% akurat, apakah Anda ingin saya hubungkan langsung ke agen tim kami?',
    triggerHandoff: false,
  };
}
