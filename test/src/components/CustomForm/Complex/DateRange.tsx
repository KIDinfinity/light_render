import React, { PureComponent } from 'react';
import lodash from 'lodash';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import { transferValue } from '../utils';

class DateRange extends PureComponent<any> {
  get value() {
    const { value } = this.props;
    if (lodash.isArray(value)) {
      return value.map(transferValue);
    }
    if (lodash.isString(value)) {
      return value?.split(',').map(transferValue);
    }
    return [];
  }

  render() {
    const { onChange, disabledDate } = this.props;
    const props = {
      ...this.props,
      value: this.value,
      onChange: (m: (Moment | any)[]) => {
        if (onChange) {
          onChange(m.map((el) => el.format()));
        }
      },
      disabledDate,
    };
    return <RangePicker {...props} />;
  }
}

export default DateRange;
