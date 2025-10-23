import React, { useMemo } from 'react';
import { TimePicker } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import lodash from 'lodash';

const TimeItem = React.forwardRef((props: any, ref: any) => {
  const { onChange, value, valueFormat } = props;

  const handleChange = (date: Moment): void => {
    if (onChange) {
      const temp = date && lodash.isFunction(valueFormat) ? valueFormat(date) : date;
      const changeValue = temp ? temp?.format() : date;
      onChange(changeValue);
    }
  };

  const newValue = useMemo(() => {
    const momentValue = moment(value);
    if (value && momentValue.isValid()) {
      return momentValue;
    }
    return value;
  }, [value]);

  return <TimePicker {...props} ref={ref} value={newValue} onChange={handleChange} />;
});

export default TimeItem;
