import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import DateSelectItem from './DateSelectItem';
import type { FormItemDateSelectProps } from '../typing';

const FormItemDateSelect = (props: FormItemDateSelectProps) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <DateSelectItem />
  </FormItem>
);

FormItemDateSelect.defaultProps = defaultProps;

export default FormItemDateSelect;
