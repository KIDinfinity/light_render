import React from 'react';

type Props = {
  totalSpan: number;
  children: React.ReactNode;
  className?: string;
};

export default ({ totalSpan, children, className }: Props) => {
  return (
    <div
      style={{
        width: `calc((1443px * 0.96 - 32px) / 24 * ${totalSpan})`,
        display: 'flex',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
