import React from 'react';
import classNames from 'classnames';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import DatePickerItem from './DatePickerItem';
import type { FormItemDatePickerProps } from '../typing';

const FormItemDatePicker = (props: FormItemDatePickerProps) => (
  <FormItem
    {...props}
    className={classNames({
      systemCalcutionItem: true,
    })}
  >
    {/**
    // @ts-ignore */}
    <DatePickerItem />
  </FormItem>
);

FormItemDatePicker.defaultProps = defaultProps;

export default FormItemDatePicker;
