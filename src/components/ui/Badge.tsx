import React from 'react';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'soft' | 'outline';
};

export default function Badge({ variant = 'outline', className = '', ...props }: Props) {
  const base = 'inline-flex items-center gap-1 text-sm rounded-full';
  const styles = variant === 'soft'
    ? 'bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1'
    : 'border border-slate-300 text-slate-700 px-3 py-1';
  return <span className={`${base} ${styles} ${className}`} {...props} />;
}
