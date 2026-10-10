import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'soft' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all select-none focus:outline-none';
  
  const sizeStyles = {
    sm: 'h-8 px-3.5 text-xs',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-7 text-base',
  }[size];

  const variantStyles = {
    // Mobbin: button-primary (Ink black #141414, white text)
    primary: 'bg-primary text-on-primary hover:bg-ink-soft active:scale-[0.98]',
    // Mobbin: button-outline (White background, 1px hairline border #e0e0e0)
    outline: 'bg-canvas text-ink border border-hairline hover:bg-canvas-soft active:scale-[0.98]',
    // Mobbin: button-pill-soft (Soft canvas fill #f3f3f3, borderless)
    soft: 'bg-canvas-soft text-ink hover:bg-field active:scale-[0.98]',
    // Ghost (Minimal transparent)
    ghost: 'text-ink hover:bg-canvas-soft active:scale-[0.98]',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
