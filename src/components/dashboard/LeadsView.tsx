import React, { useState } from 'react';
import { Lead } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Download, Plus, Search, MessageSquare, Globe } from 'lucide-react';

interface LeadsViewProps {
  leads: Lead[];
  onAddLead: (lead: Lead) => void;
}

export const LeadsView: React.FC<LeadsViewProps> = ({ leads, onAddLead }) => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newWa, setNewWa] = useState('');

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.whatsapp.includes(search) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    // Generate real CSV content (FR-30)
    const headers = ['ID', 'Nama', 'Nomor WhatsApp', 'Email', 'Kanal', 'Tanggal Masuk', 'Status', 'Catatan'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.whatsapp}"`,
      `"${l.email}"`,
      l.channel,
      `"${l.createdAt}"`,
      l.status,
      `"${l.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cakap_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newWa.trim()) return;

    const lead: Lead = {
      id: `lead-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      whatsapp: newWa.trim(),
      channel: 'whatsapp',
      createdAt: 'Baru saja',
      status: 'Baru',
      notes: 'Ditambahkan manual oleh admin',
    };

    onAddLead(lead);
    setNewName('');
    setNewEmail('');
    setNewWa('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas-soft p-5 rounded-md border border-hairline-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">Kontak & Prospek Calon Pembeli (CRM).</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Data prospek yang dikumpulkan otomatis oleh AI melalui percakapan WhatsApp & Widget Web.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportCSV}
            className="text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor ke CSV (FR-30)</span>
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Kontak</span>
          </Button>
        </div>
      </div>

      {/* Manual Add Modal */}
      {showAddModal && (
        <Card variant="featured" className="p-5 border border-hairline animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-ink">Tambah Kontak Prospek Baru</h4>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-xs text-text-muted hover:text-ink"
            >
              Batal
            </button>
          </div>
          <form onSubmit={handleManualAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              className="bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
            />
            <input
              type="text"
              placeholder="Nomor WhatsApp (+62 8...)"
              value={newWa}
              onChange={(e) => setNewWa(e.target.value)}
              required
              className="bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
            />
            <input
              type="email"
              placeholder="Email (opsional)"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
            />
            <div className="sm:col-span-3 flex justify-end gap-2 pt-1">
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowAddModal(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" variant="primary">
                Simpan Kontak
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Search Input */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, nomor WA, atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-field text-ink placeholder:text-text-faint rounded-full pl-10 pr-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
          />
        </div>
      </div>

      {/* Leads Table per Mobbin ex-data-table-cell */}
      <div className="bg-canvas border border-hairline-soft rounded-md overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-canvas-soft border-b border-hairline-soft text-text-muted font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Nama Prospek</th>
              <th className="py-3 px-4">WhatsApp & Email</th>
              <th className="py-3 px-4">Sumber Kanal</th>
              <th className="py-3 px-4">Waktu Terkumpul</th>
              <th className="py-3 px-4">Status Minat</th>
              <th className="py-3 px-4">Catatan Kebutuhan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline-soft text-ink">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-canvas-soft/40 transition-colors">
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-canvas-soft border border-hairline-soft flex items-center justify-center text-[10px] text-ink font-bold">
                    {lead.name[0]}
                  </div>
                  <span>{lead.name}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-ink">{lead.whatsapp}</div>
                  <div className="text-[11px] text-text-muted">{lead.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 bg-canvas-soft px-2.5 py-1 rounded-full text-[10px] font-medium border border-hairline-soft">
                    {lead.channel === 'whatsapp' ? (
                      <MessageSquare className="w-3 h-3" />
                    ) : (
                      <Globe className="w-3 h-3" />
                    )}
                    <span>{lead.channel === 'whatsapp' ? 'WhatsApp' : 'Web Widget'}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-text-muted">
                  {lead.createdAt}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      lead.status === 'Baru'
                        ? 'bg-amber-100 text-amber-900'
                        : lead.status === 'Tertarik'
                        ? 'bg-blue-100 text-blue-900'
                        : lead.status === 'Konversi'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-canvas-soft text-text-muted'
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-text-muted text-[11px] max-w-xs truncate">
                  {lead.notes || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
