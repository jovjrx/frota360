import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';
  const styles = variant === 'primary'
    ? 'btn-primary'
    : 'border border-slate-300 text-slate-700 hover:bg-slate-100 px-4 py-2';
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
