import { Lead } from '../types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@gmail.com',
    whatsapp: '+62 812-8899-2314',
    channel: 'whatsapp',
    createdAt: '10 Okt 2026, 10:40',
    status: 'Tertarik',
    notes: 'Inquiry pesanan bundling 10 cup Kopi Susu',
  },
  {
    id: 'lead-2',
    name: 'Bambang Prasetyo',
    email: 'bambang.prasetyo@megabiz.co.id',
    whatsapp: '+62 856-7788-9900',
    channel: 'whatsapp',
    createdAt: '10 Okt 2026, 10:34',
    status: 'Baru',
    notes: 'Permintaan penawaran catering kantor 100 pax',
  },
  {
    id: 'lead-3',
    name: 'Sarah Amanda',
    email: 'sarah.amanda@techcorp.id',
    whatsapp: '+62 811-9988-7766',
    channel: 'widget',
    createdAt: '10 Okt 2026, 10:08',
    status: 'Dihubungi',
    notes: 'Kebutuhan multi-workspace agensi digital',
  },
  {
    id: 'lead-4',
    name: 'Hendro Wijaya',
    email: 'hendro@kliniksehat.com',
    whatsapp: '+62 818-2233-4455',
    channel: 'widget',
    createdAt: '09 Okt 2026, 16:22',
    status: 'Konversi',
    notes: 'Langganan Paket Growth untuk reminder jadwal reservasi pasien',
  },
];
