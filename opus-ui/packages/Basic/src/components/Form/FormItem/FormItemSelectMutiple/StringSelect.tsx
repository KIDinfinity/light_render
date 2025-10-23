import React, { useMemo } from 'react';
import { Select } from 'antd';
import { compact, isString } from 'lodash';

const StringSelect = React.forwardRef((props: any, ref: any) => {
  const { onChange, value, children, ...restProps } = props;

  const handleChange = (values: any) => {
    const val = values && Array.isArray(values) ? values : [values];
    onChange(val?.join?.(','));
  };

  const newValue = useMemo(() => {
    if (isString(value)) {
      return compact(value?.split(','));
    }
    if (Array.isArray(value)) {
      return compact(value);
    }
    return value;
  }, [value]);
  return (
    <Select {...restProps} value={newValue} ref={ref} onChange={handleChange}>
      {children}
    </Select>
  );
});

export default StringSelect;
