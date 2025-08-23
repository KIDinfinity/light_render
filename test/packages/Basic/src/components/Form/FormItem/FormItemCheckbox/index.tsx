import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import CheckBoxItem from './CheckBoxItem';
import type { FormItemCheckboxProps } from '../typing';

const FormItemCheckbox = (props: FormItemCheckboxProps) => (
  <FormItem {...props} valuePropName="checked">
    {/**
    // @ts-ignore */}
    <CheckBoxItem />
  </FormItem>
);

FormItemCheckbox.defaultProps = defaultProps;

export default FormItemCheckbox;
