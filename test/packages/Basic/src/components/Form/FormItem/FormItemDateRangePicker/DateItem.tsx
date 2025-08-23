import React from 'react';
import { DatePicker } from 'antd';
import type { Moment } from 'moment';
const { RangePicker } = DatePicker;

const DateItem = React.forwardRef((props: any, ref: any) => {
  const { value, onChange } = props;

  const handleChange = (date: Moment): void => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <>
      <RangePicker {...props} ref={ref} value={value} onChange={handleChange} />
    </>
  );
});

export default DateItem;
