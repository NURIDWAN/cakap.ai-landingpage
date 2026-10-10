import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Lead } from '../../types';

interface LeadCaptureModalProps {
  onCapture: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  onSkip: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  onCapture,
  onSkip,
}) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    onCapture({
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      channel: 'widget',
      notes: 'Prospek mendaftar lewat formulir pra-chat widget web',
    });
  };

  return (
    <div className="p-4 bg-canvas border-b border-hairline-soft">
      <div className="bg-canvas-soft rounded-sm p-4 space-y-3 border border-hairline-soft">
        <div>
          <h4 className="text-sm font-semibold text-ink">
            Mulai Percakapan dengan Cakap.ai.
          </h4>
          <p className="text-xs text-text-muted mt-0.5">
            Tinggalkan kontak agar tim kami dapat mengirimkan ringkasan solusi atau follow up jika percakapan terputus.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <Input
            placeholder="Nama lengkap Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-xs py-2 px-3"
          />
          <Input
            placeholder="Nomor WhatsApp (misal: 0812...)"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
            className="text-xs py-2 px-3"
          />
          <Input
            placeholder="Email bisnis (opsional)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-xs py-2 px-3"
          />

          <div className="flex items-center gap-2 pt-1">
            <Button type="submit" size="sm" variant="primary" className="flex-1 text-xs">
              Mulai Chat ↗
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onSkip}
              className="text-xs text-text-muted"
            >
              Lewati
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
