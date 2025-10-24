import React from 'react';

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3;
};

export default function Heading({ level = 2, className = '', ...props }: Props) {
  const base = 'font-bold text-slate-900';
  const size = level === 1 ? 'text-3xl md:text-5xl' : 'text-3xl md:text-4xl';
  const cls = `${base} ${size} ${className}`;
  if (level === 1) return <h1 className={cls} {...props} />;
  if (level === 2) return <h2 className={cls} {...props} />;
  return <h3 className={cls} {...props} />;
}
