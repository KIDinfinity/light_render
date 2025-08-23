import React from 'react';
import FormItem from '../FormItem';
import SelectAuto from './SelectAuto';
import defaultProps from './defaultProps';
import type { FormItemSelectAutoProps } from '../typing';

const SelectAutoItem = React.forwardRef<any, FormItemSelectAutoProps>((props, ref) => {
  const { onChange, value, setVisible = () => {}, onBlur } = props;

  return (
    <SelectAuto
      {...props}
      value={value}
      onChange={onChange}
      onBlur={(e: React.MouseEvent) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={() => {
        setVisible(true);
      }}
      ref={ref}
    />
  );
});

const FormItemSelectAuto = (props: any) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <SelectAutoItem />
  </FormItem>
);

FormItemSelectAuto.defaultProps = defaultProps;

export default FormItemSelectAuto;
