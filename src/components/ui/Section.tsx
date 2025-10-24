import React from 'react';

type Props = React.HTMLAttributes<HTMLElement>;

const Section = React.forwardRef<HTMLElement, Props>(function Section(
  { className = '', ...props },
  ref
) {
  return <section ref={ref} className={`section ${className}`} {...props} />;
});

export default Section;
