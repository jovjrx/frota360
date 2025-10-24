import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Container({ className = '', ...props }: Props) {
  return <div className={`container ${className}`} {...props} />;
}
