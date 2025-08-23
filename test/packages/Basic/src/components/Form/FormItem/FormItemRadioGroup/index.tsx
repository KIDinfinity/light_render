import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import RadioGroupItem from './RadioGroupItem';
import type { FormItemRadioGroupProps } from '../typing';

const FormItemRadioGroup = (props: FormItemRadioGroupProps) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <RadioGroupItem />
  </FormItem>
);

FormItemRadioGroup.defaultProps = defaultProps;

export default FormItemRadioGroup;
