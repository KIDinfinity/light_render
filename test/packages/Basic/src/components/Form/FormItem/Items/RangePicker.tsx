import React, { forwardRef } from 'react';
import { DatePicker } from 'antd';
import { getDateFormat } from '../utils';

const { RangePicker } = DatePicker;

export default forwardRef((props: any, ref) => {
  const { disabledDate, format, ...restProps } = props;
  const rangePickerProps: any = {
    ...restProps,
    format: getDateFormat(props?.format),
    disabledDate,
  };

  return <RangePicker {...rangePickerProps} forwardedRef={ref} />;
});
