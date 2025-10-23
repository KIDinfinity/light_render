import React from 'react';

type Props = {
  span: number;
  children: React.ReactNode;
  className?: string;
  order?: number;
  field: string;
};

const CustomisationCol = ({ span, children, className, order, field }: Props) => {
  return (
    <>
      {span === 0 ? null : (
        <div
          style={{
            flex: '0 0 auto',
            padding: 8,
            order,
            width: `calc((1443px * 0.96 - 32px) / 24 * ${span})`,
          }}
          data-span={span}
          className={className}
          data-field={field}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default CustomisationCol;
