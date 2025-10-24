import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Card({ className = '', ...props }: Props) {
  return <div className={`p-6 rounded-lg border border-slate-200 bg-white ${className}`} {...props} />;
}
