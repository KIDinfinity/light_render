import React, { useMemo } from 'react';
import { DatePicker } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import classnames from 'classnames';
import styles from './index.less';
import lodash from 'lodash';

const MonthDateItem = React.forwardRef((props: any, ref: any) => {
  const { value, onChange, dateType, view = 'N', format, className } = props;
  const { MonthPicker } = DatePicker;
  const handleChange = (date: Moment): void => {
    if (onChange) {
      const temp =
        date && lodash.isEqual(dateType, 'L')
          ? moment(date).set({ hour: 0, minute: 0, second: 0 })
          : date;
      const changeValue = temp ? temp?.format() : date;
      onChange(changeValue);
    }
  };

  const newValue = useMemo(() => {
    let valueTemp = value;

    if (valueTemp && lodash.isString(valueTemp) && !Number.isNaN(+value)) {
      valueTemp = +value;
    }

    const momentValue = moment(valueTemp);
    if (valueTemp && momentValue.isValid()) {
      return momentValue;
    }
    return null;
  }, [value]);

  return (
    <>
      <MonthPicker
        {...props}
        className={classnames(className, {
          [styles.view]: view === 'Y',
        })}
        ref={ref}
        value={newValue}
        onChange={handleChange}
      />
      {view === 'Y' && newValue?.format(format)}
    </>
  );
});

export default MonthDateItem;
