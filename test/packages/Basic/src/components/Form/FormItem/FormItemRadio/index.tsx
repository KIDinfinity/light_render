import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import RadioItem from './RadioItem';
import type { FormItemRadioProps } from '../typing';

const FormItemRadio = (props: FormItemRadioProps) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <RadioItem />
  </FormItem>
);

FormItemRadio.defaultProps = defaultProps;

export default FormItemRadio;
