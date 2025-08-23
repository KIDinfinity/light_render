import React from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/lib/select';

type TProps = SelectProps & {
  value?: any;
  children?: React.ReactNode;
  valueFormat?: (v: any) => SelectValue | undefined;
  valueChangeFormat?: (v: SelectValue) => any;
};

export const { Option } = Select;

export default React.forwardRef<Select, TProps>((props, ref) => {
  const { valueFormat = (v) => v, valueChangeFormat = (v) => v, ...componentProps } = props;
  const onChange = (
    v: SelectValue,
    option: React.ReactElement<any> | React.ReactElement<any>[]
  ) => {
    props?.onChange?.(valueChangeFormat(v), option);
  };
  return (
    <Select {...componentProps} ref={ref} value={valueFormat(props.value)} onChange={onChange} />
  );
});
