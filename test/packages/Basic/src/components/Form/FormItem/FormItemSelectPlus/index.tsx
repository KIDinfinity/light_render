import React from 'react';
import FormItem from '../FormItem';
import SelectPlusItem from './SelectPlusItem';
import defaultProps from './defaultProps';

const FormItemSelectPlus = (props: any) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <SelectPlusItem />
  </FormItem>
);

FormItemSelectPlus.defaultProps = defaultProps;

export default FormItemSelectPlus;
