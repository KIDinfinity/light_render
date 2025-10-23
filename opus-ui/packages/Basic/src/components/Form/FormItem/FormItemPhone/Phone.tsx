import React from 'react';
import { Input } from 'antd';
import { trimPhoneNo, formatPhoneNo } from './phoneNoUtils';

const Phone = React.forwardRef((props: any, ref) => {
  const { value, onChange, setVisible, ...res } = props;

  const handleChange = (e: any) => {
    onChange(trimPhoneNo(e.target.value));
  };

  const propsData = {
    ...res,
    value: formatPhoneNo(value),
    onChange: handleChange,
    ref,
    onFocus: () => setVisible(true),
    onBlur: () => setVisible(false),
  };
  // @ts-ignore
  return <Input {...propsData} />;
});

export default Phone;
