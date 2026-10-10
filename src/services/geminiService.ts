import { BotConfig, KnowledgeItem, Message } from '../types';
import { answerFromKnowledgeBase } from '../components/widget/widgetBotEngine';

export interface GeminiChatOptions {
  message: string;
  history?: Message[];
  botConfig: BotConfig;
  knowledgeBase: KnowledgeItem[];
  apiKey?: string;
  model?: string;
}

export interface GeminiChatResult {
  text: string;
  sourceCitation?: string;
  triggerHandoff: boolean;
  isFallback: boolean;
  modelUsed: string;
}

/**
 * Membersihkan tanda bintang markdown (*, **) dan simbol markdown kaku
 * dari teks respon agar tampak alami, bersih, dan rapi seperti chat biasa.
 */
export function cleanBotOutput(text: string): string {
  if (!text) return '';

  return text
    // 1. Ubah bullet points yang diawali tanda bintang (* item) menjadi strip (- item)
    .replace(/^[\s]*\*[\s]+/gm, '- ')
    // 2. Bersihkan bold markdown: **teks** -> teks
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // 3. Bersihkan italic markdown: *teks* -> teks
    .replace(/\*([^*]+)\*/g, '$1')
    // 4. Hapus tanda bintang tersisa/dangling yang mungkin terlewat
    .replace(/\*/g, '')
    // 5. Rapikan baris kosong berlebih
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Menyusun Command System (System Instruction) komprehensif
 * yang mengikat identitas, gaya persona, topik terlarang, pemicu handoff,
 * aturan kebersihan teks tanpa tanda bintang (*), dan basis pengetahuan resmi (RAG).
 */
export function buildSystemInstruction(
  botConfig: BotConfig,
  knowledgeBase: KnowledgeItem[]
): string {
  // 1. Gaya bahasa
  let toneInstruction = '';
  switch (botConfig.tone) {
    case 'ramah':
      toneInstruction =
        'Gaya bicara Anda RAMAH, HANGAT, EMPATIS, dan SOPAN. Gunakan sapaan khas bisnis Indonesia yang santun seperti "Kak", "Bapak/Ibu". Gunakan emoji pendukung secara wajar dan bersahabat.';
      break;
    case 'santai':
      toneInstruction =
        'Gaya bicara Anda SANTAI, GAUL, KASUAL, dan AKRAB. Pahami bahasa sehari-hari dan slang Indonesia (min, kak, gan, ready, ongkir, rek). Tetap solutif dan membantu.';
      break;
    case 'formal':
      toneInstruction =
        'Gaya bicara Anda FORMAL, BAKU, PROFESIONAL, dan SANTUN. Gunakan tata bahasa Indonesia yang rapi, tanpa singkatan gaul. Cocok untuk instansi dan korporasi.';
      break;
  }

  // 2. Format Basis Pengetahuan
  const formattedKB = knowledgeBase
    .filter((k) => k.status === 'ready')
    .map((item, idx) => {
      let extra = '';
      if (item.type === 'catalog' && item.meta) {
        extra = ` [Harga: Rp ${item.meta.price?.toLocaleString('id-ID') || 0}, Stok: ${item.meta.stock ?? 0} pcs]`;
      }
      return `--- SUMBER #${idx + 1} (${item.type.toUpperCase()}: ${item.title}) ---\n${item.content}${extra}`;
    })
    .join('\n\n');

  // 3. Gabungkan seluruh aturan ke dalam Command System
  return `=== PERAN & IDENTITAS ASISTEN ===
Nama Anda: ${botConfig.name}
Bahasa Utama: ${botConfig.language}
Persona / Nada Bicara:
${toneInstruction}

=== ATURAN FORMAT PENULISAN PESAN (SANGAT PENTING - WAJIB DIIKUTI) ===
1. DILARANG KERAS menggunakan tanda bintang (*) atau tanda bintang ganda (**) sama sekali dalam teks respon Anda.
2. JANGAN gunakan format markdown tebal (**teks**) atau miring (*teks*). Tuliskan kata-kata secara biasa tanpa tanda bintang.
3. Jika ingin membuat daftar/poin, JANGAN gunakan tanda bintang (*). Gunakan angka (1, 2, 3) atau garis strip (-).
4. Tulis pesan persis seperti manusia mengetik di chat WhatsApp: bersih, alami, ramah, dan mudah dibaca tanpa karakter simbol markdown.

=== INSTRUKSI KHUSUS BISNIS ===
${botConfig.systemPrompt || 'Bantu layani pertanyaan pelanggan secara cepat, tepat, dan ramah.'}

=== ATURAN TOPIK YANG DILARANG (STRICT PROHIBITED TOPICS) ===
Topik terlarang: ${botConfig.prohibitedTopics.length > 0 ? botConfig.prohibitedTopics.join(', ') : 'Tidak ada'}.
Jika pengguna bertanya tentang topik-topik di atas, tolak dengan sopan dan nyatakan bahwa Anda tidak berwenang membahas hal tersebut sesuai kebijakan resmi.

=== ATURAN PENGALIHAN KE AGEN MANUSIA (HANDOFF) ===
Kata kunci pemicu: ${botConfig.handoffKeywords.length > 0 ? botConfig.handoffKeywords.join(', ') : 'agen, manusia, panggil cs, komplain'}.
Jika pengguna komplain keras, marah, atau meminta secara eksplisit untuk berbicara dengan manusia/CS/staf, berikan jawaban pengalihan yang menenangkan dan WAJIB tambahkan tag khusus "[TRIGGER_HANDOFF]" di baris paling akhir respon Anda.

=== BASIS PENGETAHUAN RESMI (KNOWLEDGE BASE) ===
${formattedKB}

=== ATURAN MUTLAK ANTI-HALUSINASI (FR-17) ===
1. HANYA jawab pertanyaan berdasarkan informasi yang termuat di dalam Basis Pengetahuan Resmi di atas.
2. Jika informasi yang ditanyakan pelanggan TIDAK ADA atau BELUM LENGKAP di dalam Basis Pengetahuan, JANGAN PERNAH MENGARANG JAWABAN.
3. Akui dengan jujur bahwa Anda belum memiliki informasi tersebut, lalu tawarkan bantuan untuk menghubungkan pelanggan ke staf agen manusia kami.
4. Buat jawaban padat, jelas, dan enak dibaca di layar chat smartphone.`;
}

/**
 * Mengirim pesan ke Google Gemini REST API dengan riwayat obrolan, Command System,
 * dan pembersihan teks otomatis dari tanda bintang (*).
 */
export async function generateGeminiChat({
  message,
  history = [],
  botConfig,
  knowledgeBase,
  apiKey,
  model = 'gemini-2.5-flash',
}: GeminiChatOptions): Promise<GeminiChatResult> {
  const userText = message.trim();

  // Resolusi Kunci API dari parameter, botConfig, environment, atau localStorage
  const resolvedApiKey =
    apiKey ||
    botConfig.geminiApiKey ||
    (import.meta.env.VITE_GEMINI_API_KEY as string) ||
    localStorage.getItem('cakap_gemini_api_key') ||
    '';

  const resolvedModel =
    model ||
    botConfig.geminiModel ||
    (import.meta.env.VITE_GEMINI_MODEL as string) ||
    'gemini-2.5-flash';

  // Deteksi cepat jika ada permintaan eksplisit agen manusia
  const isExplicitHandoff = botConfig.handoffKeywords.some((kw) =>
    userText.toLowerCase().includes(kw.toLowerCase())
  );

  // Jika API Key tidak ada, gunakan Fallback Cerdas ke Engine Pengetahuan Lokal
  if (!resolvedApiKey || resolvedApiKey.trim() === '' || resolvedApiKey === 'your_gemini_api_key_here') {
    const localAnswer = answerFromKnowledgeBase(userText);
    return {
      text: cleanBotOutput(localAnswer.text),
      sourceCitation: localAnswer.source,
      triggerHandoff: isExplicitHandoff || Boolean(localAnswer.triggerHandoff),
      isFallback: true,
      modelUsed: 'Simulasi Cerdas Lokal (API Key belum diisi)',
    };
  }

  try {
    const systemInstructionText = buildSystemInstruction(botConfig, knowledgeBase);

    // Format riwayat pesan untuk Gemini (ambil maksimal 8 pesan terakhir)
    const formattedContents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text: string }>;
    }> = [];

    const recentHistory = history.slice(-8);
    for (const msg of recentHistory) {
      if (msg.sender === 'customer') {
        formattedContents.push({
          role: 'user',
          parts: [{ text: msg.content }],
        });
      } else if (msg.sender === 'bot') {
        formattedContents.push({
          role: 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Tambahkan pesan terkini jika belum ada
    formattedContents.push({
      role: 'user',
      parts: [{ text: userText }],
    });

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${resolvedApiKey.trim()}`;

    const requestBody = {
      system_instruction: {
        parts: [{ text: systemInstructionText }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: botConfig.temperature ?? 0.4,
        maxOutputTokens: 800,
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      const errorMsg =
        errorJson?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    let replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Maaf, saya tidak dapat memproses jawaban saat ini.';

    let shouldHandoff = isExplicitHandoff;

    // Cek tag khusus [TRIGGER_HANDOFF]
    if (replyText.includes('[TRIGGER_HANDOFF]')) {
      shouldHandoff = true;
      replyText = replyText.replace(/\[TRIGGER_HANDOFF\]/g, '').trim();
    }

    // Bersihkan seluruh tanda bintang (*) dan markdown formatting
    replyText = cleanBotOutput(replyText);

    return {
      text: replyText,
      sourceCitation: `Didukung oleh Google ${resolvedModel} + Knowledge Base Cakap.ai`,
      triggerHandoff: shouldHandoff,
      isFallback: false,
      modelUsed: `Google ${resolvedModel}`,
    };
  } catch (error: any) {
    console.warn('Gemini API call failed, falling back to local engine:', error);

    // Fallback otomatis ke knowledge base lokal (bersih tanpa tanda *)
    const localAnswer = answerFromKnowledgeBase(userText);
    const cleanedLocalText = cleanBotOutput(localAnswer.text);
    return {
      text: `${cleanedLocalText}\n\n(Catatan: Menggunakan respons cadangan lokal karena kendala koneksi API: ${cleanBotOutput(error?.message || 'Koneksi gagal')})`,
      sourceCitation: localAnswer.source,
      triggerHandoff: isExplicitHandoff || Boolean(localAnswer.triggerHandoff),
      isFallback: true,
      modelUsed: `Fallback Lokal (${error?.message || 'Error API'})`,
    };
  }
}

/**
 * Menguji koneksi Gemini API Key dengan prompt verifikasi ringan
 */
export async function testGeminiApiKey(
  apiKey: string,
  model = 'gemini-2.5-flash'
): Promise<{ success: boolean; message: string; modelName?: string }> {
  if (!apiKey || !apiKey.trim()) {
    return { success: false, message: 'API Key tidak boleh kosong.' };
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Ping test. Balas hanya dengan kata: OK' }] }],
        generationConfig: { maxOutputTokens: 10 },
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return {
        success: false,
        message: err?.error?.message || `Koneksi gagal dengan status HTTP ${response.status}`,
      };
    }

    return {
      success: true,
      message: `Berhasil terhubung ke model Google ${model}!`,
      modelName: model,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Gagal menghubungi server Google Gemini.',
    };
  }
}
