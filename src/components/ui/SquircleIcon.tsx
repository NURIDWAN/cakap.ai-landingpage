import React from 'react';

interface SquircleIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

export const SquircleIcon: React.FC<SquircleIconProps> = ({
  size = 'md',
  className = '',
  children,
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-14 h-14 p-3',
    xl: 'w-20 h-20 p-4',
  }[size];

  return (
    <div
      className={`squircle-30 bg-canvas-soft border border-hairline-soft inline-flex items-center justify-center text-ink flex-shrink-0 ${sizeStyles} ${className}`}
      style={{ borderRadius: '30%' }}
    >
      {children}
    </div>
  );
};
