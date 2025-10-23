import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import InputItem from './InputItem';
import type { FormItemInputProps } from '../typing';

const FormItemInput = (props: FormItemInputProps) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <InputItem />
  </FormItem>
);

FormItemInput.defaultProps = defaultProps;

export default FormItemInput;
