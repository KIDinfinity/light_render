import React from 'react';
import classNames from 'classnames';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import MonthDatePickerItem from './MonthDatePickerItem';
import type { FormItemMonthDatePickerProps } from '../typing';

const FormItemMonthDatePicker = (props: FormItemMonthDatePickerProps) => (
  <FormItem
    {...props}
    className={classNames({
      systemCalcutionItem: true,
    })}
  >
    {/**
    // @ts-ignore */}
    <MonthDatePickerItem />
  </FormItem>
);

FormItemMonthDatePicker.defaultProps = defaultProps;

export default FormItemMonthDatePicker;
