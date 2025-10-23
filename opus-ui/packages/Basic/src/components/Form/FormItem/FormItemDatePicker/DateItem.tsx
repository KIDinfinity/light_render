import React, { useMemo } from 'react';
import { DatePicker, Icon } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import classnames from 'classnames';
import styles from './index.less';
import lodash from 'lodash';
import DateSelectIcon from '@/assets/DateSelect.svg';
import { ReactComponent as IconDatePicker } from 'opus/Assets/icon-datepicker.svg';
import { transferBuddistDate } from 'basic/utils/transferDate';

const DateItem = React.forwardRef((props: any, ref: any) => {
  const { value, onChange, dateType, view = 'N', format, className, icon } = props;

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
      return transferBuddistDate(momentValue, props?.isBuddistDate);
    }
    return null;
  }, [value]);
  return (
    <div className={icon ? styles.icon : ''}>
      <DatePicker
        suffixIcon={<Icon component={IconDatePicker} />}
        {...props}
        className={classnames(className, {
          [styles.view]: view === 'Y',
        })}
        ref={ref}
        // 如果选择多个日期是直接在下面展示日期列表，不在field组件里面
        value={!!props?.mockDate ? '' : newValue}
        onChange={handleChange}
      />
      {view === 'Y' && newValue?.format(format)}
      {icon == true && <img src={DateSelectIcon} />}
    </div>
  );
});

export default DateItem;
