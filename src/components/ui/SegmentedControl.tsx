import React from 'react';

interface Option {
  id: string;
  label: string;
  badge?: string;
}

interface SegmentedControlProps {
  options: Option[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  activeId,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={`bg-canvas-soft p-1 rounded-full inline-flex items-center gap-1 border border-hairline-soft select-none ${className}`}
    >
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`h-9 px-4 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive
                ? 'bg-canvas text-ink font-semibold'
                : 'text-text-muted hover:text-ink'
            }`}
          >
            <span>{option.label}</span>
            {option.badge && (
              <span className="bg-accent text-on-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
