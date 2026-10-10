import React from 'react';

interface BadgeProps {
  variant?: 'popular' | 'overlay' | 'neutral' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  className = '',
  children,
}) => {
  const variantStyles = {
    // Mobbin: badge-popular (The ONLY chromatic accent #0066ff reserved for commercial emphasis)
    popular: 'bg-accent text-on-primary text-xs font-semibold px-3 py-1',
    // Mobbin: badge-overlay (Translucent gray pill over media)
    overlay: 'bg-[rgba(115,115,115,0.56)] text-on-primary text-xs font-semibold px-2.5 py-0.5 backdrop-blur-sm',
    // Mobbin: neutral chip
    neutral: 'bg-canvas-soft text-ink text-xs font-medium px-2.5 py-1',
    // Mobbin: outline chip
    outline: 'bg-canvas text-ink border border-hairline text-xs font-medium px-2.5 py-1',
  }[variant];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full select-none ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
