import React from 'react';

type Props = {
  span: number;
  children: React.ReactNode;
  className?: string;
  order?: number;
  field: string;
  padding?: number | string;
  sclale?: number;
};

const CustomisationCol = ({ span, children, className, order, field, padding, sclale }: Props) => {
  const widthSclale = sclale || 0.86;
  return (
    <>
      {span === 0 ? null : (
        <div
          style={{
            flex: '0 0 auto',
            padding: padding || 8,
            order,
            width: `calc((1443px * ${widthSclale} - 32px) / 24 * ${span})`,
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
