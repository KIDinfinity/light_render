import React, { forwardRef } from 'react';
import { DatePicker } from 'antd';
import { getDateFormat } from '../utils';

const { RangePicker } = DatePicker;

export default forwardRef((props: any, ref) => {
  const rangePickerProps: any = {
    ...props,
    format: getDateFormat(props?.format),
  };
  return <RangePicker {...rangePickerProps} forwardedRef={ref} />;
});
