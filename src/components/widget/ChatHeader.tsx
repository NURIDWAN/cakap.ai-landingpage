import React from 'react';
import { UserCheck, X, RotateCcw } from 'lucide-react';
import { SquircleIcon } from '../ui/SquircleIcon';

interface ChatHeaderProps {
  onClose: () => void;
  onReset: () => void;
  onHandoff: () => void;
  isAgentMode: boolean;
  modelName?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClose,
  onReset,
  onHandoff,
  isAgentMode,
  modelName,
}) => {
  return (
    <div className="bg-canvas border-b border-hairline-soft px-4 py-3 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <SquircleIcon size="sm" className="bg-ink text-on-primary border-0">
          <span className="text-xs font-bold">C</span>
        </SquircleIcon>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-ink">
              {isAgentMode ? 'CS Manusia (Cakap Support)' : 'Asisten Cakap (AI)'}
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-[10px] text-text-muted">
            {isAgentMode
              ? 'Agen sedang terhubung langsung'
              : modelName || 'Didukung Google Gemini AI'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {!isAgentMode && (
          <button
            type="button"
            onClick={onHandoff}
            title="Minta dialihkan ke CS manusia"
            className="h-8 px-2.5 rounded-full text-xs font-medium text-ink bg-canvas-soft hover:bg-field flex items-center gap-1 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Panggil CS</span>
          </button>
        )}
        <button
          type="button"
          onClick={onReset}
          title="Reset percakapan"
          className="w-8 h-8 rounded-full text-text-muted hover:text-ink hover:bg-canvas-soft flex items-center justify-center transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          title="Tutup widget"
          className="w-8 h-8 rounded-full text-text-muted hover:text-ink hover:bg-canvas-soft flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
