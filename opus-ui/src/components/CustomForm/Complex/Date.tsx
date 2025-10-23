import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import type { Moment } from 'moment';
import { transferValue } from '../utils';

class Date extends PureComponent<any> {
  render() {
    const { onChange, value } = this.props;
    const props = {
      ...this.props,
      value: transferValue(value),
      onChange: (m: Moment): void => {
        if (onChange) {
          onChange(m && m.format());
        }
      },
    };

    return <DatePicker {...props} />;
  }
}

export default Date;
