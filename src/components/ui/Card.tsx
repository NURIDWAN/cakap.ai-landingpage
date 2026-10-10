import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured' | 'ink';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    // Mobbin: pricing-card / resting card (White canvas, 1px faint hairline, 24px radius, shadow-free)
    default: 'bg-canvas border border-hairline-soft text-ink rounded-md p-6',
    // Mobbin: pricing-card-featured (6% ink wash, borderless, 24px radius)
    featured: 'bg-canvas-soft text-ink rounded-md p-6 border-0',
    // Polarity inverted ink card (e.g. key highlights / dark surface)
    ink: 'bg-ink text-on-primary rounded-md p-6 border-0',
  }[variant];

  return (
    <div className={`${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
