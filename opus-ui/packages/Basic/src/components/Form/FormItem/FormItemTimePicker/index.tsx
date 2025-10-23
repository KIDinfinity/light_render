import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import TimePickerItem from './TimePickerItem';
import type { FormItemTimePickerProps } from '../typing';

const FormItemTimePicker = (props: FormItemTimePickerProps) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <TimePickerItem />
  </FormItem>
);

FormItemTimePicker.defaultProps = defaultProps;

export default FormItemTimePicker;
