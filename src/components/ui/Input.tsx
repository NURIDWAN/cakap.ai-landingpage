import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-field text-ink placeholder:text-text-faint rounded-sm px-4 py-3 text-sm outline-none transition-all border-0 focus:ring-2 focus:ring-ink ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
