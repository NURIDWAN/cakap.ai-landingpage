import React, { useState } from 'react';
import { Workspace, User, Role } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Users, UserPlus, Shield, Building2 } from 'lucide-react';

interface WorkspaceViewProps {
  workspace: Workspace;
  onUpdateWorkspaceName: (name: string) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  workspace,
  onUpdateWorkspaceName,
}) => {
  const [wsName, setWsName] = useState(workspace.name);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('Agen');
  const [members, setMembers] = useState<User[]>([
    {
      id: 'u-1',
      name: 'Raka Pratama',
      email: 'raka@toko-rina.id',
      role: 'Owner',
    },
    {
      id: 'u-2',
      name: 'Siti Rahmawati',
      email: 'siti.cs@toko-rina.id',
      role: 'Admin',
    },
    {
      id: 'u-3',
      name: 'Doni Saputra',
      email: 'doni.agent@toko-rina.id',
      role: 'Agen',
    },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: User = {
      id: `u-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      role: inviteRole,
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleChangeRole = (userId: string, newRole: Role) => {
    setMembers(
      members.map((m) => (m.id === userId ? { ...m, role: newRole } : m))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas-soft p-5 rounded-md border border-hairline-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">Pengaturan Ruang Kerja & Tim (FR-1 - FR-5).</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Kelola nama workspace, undang anggota tim CS, dan tetapkan hak akses role.
          </p>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => setShowInviteModal(true)}
          className="text-xs flex items-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Undang Anggota Tim</span>
        </Button>
      </div>

      {/* Workspace Profile Card */}
      <Card variant="default" className="p-6 bg-canvas space-y-4">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <Building2 className="w-4 h-4 text-ink" /> Profil Ruang Kerja (Workspace)
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 items-end max-w-lg">
          <Input
            label="Nama Bisnis / Toko"
            value={wsName}
            onChange={(e) => setWsName(e.target.value)}
          />
          <Button
            size="md"
            variant="outline"
            onClick={() => onUpdateWorkspaceName(wsName)}
            className="text-xs flex-shrink-0"
          >
            Simpan Nama
          </Button>
        </div>
      </Card>

      {/* Invite Modal */}
      {showInviteModal && (
        <Card variant="featured" className="p-5 border border-hairline animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-ink">Undang Anggota Tim Baru via Email</h4>
            <button
              onClick={() => setShowInviteModal(false)}
              className="text-xs text-text-muted hover:text-ink font-semibold"
            >
              Batal
            </button>
          </div>
          <form onSubmit={handleInvite} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="email"
              placeholder="email.rekan@perusahaan.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="sm:col-span-2 bg-field text-ink placeholder:text-text-faint rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ink"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as Role)}
              className="bg-field text-ink rounded-full px-4 py-2 text-xs outline-none font-medium"
            >
              <option value="Admin">Role: Admin</option>
              <option value="Agen">Role: Agen CS</option>
              <option value="Viewer">Role: Viewer (Hanya Baca)</option>
            </select>
            <div className="sm:col-span-3 flex justify-end gap-2 pt-1">
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowInviteModal(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" variant="primary">
                Kirim Undangan Email ↗
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Team Members List */}
      <Card variant="default" className="p-6 bg-canvas">
        <h4 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-ink" /> Anggota Tim Aktif ({members.length})
        </h4>

        <div className="divide-y divide-hairline-soft">
          {members.map((member) => (
            <div key={member.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-canvas-soft border border-hairline-soft flex items-center justify-center font-bold text-xs text-ink">
                  {member.name[0].toUpperCase()}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-ink">{member.name}</h5>
                  <p className="text-[11px] text-text-muted">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {member.role === 'Owner' ? (
                  <span className="bg-canvas-soft border border-hairline px-3 py-1 rounded-full text-xs font-bold text-ink flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Owner
                  </span>
                ) : (
                  <select
                    value={member.role}
                    onChange={(e) => handleChangeRole(member.id, e.target.value as Role)}
                    className="bg-field text-ink border border-hairline-soft text-xs rounded-full px-3 py-1 outline-none font-medium"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Agen">Agen CS</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
