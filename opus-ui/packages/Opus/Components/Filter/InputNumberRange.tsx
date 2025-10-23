import React from 'react';
import lodash from 'lodash';

import { InputNumber, Divider } from 'opus/Components/Antd';
import styles from './InputNumberRange.less';
import classNames from 'classnames';

export default ({ value, placeholder, onChange }: any) => {
  return (
    <div
      className={styles.inputNumberRange}
      style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <InputNumber
        placeholder={lodash.first(placeholder)}
        value={lodash.first(value)}
        className={classNames([styles.rangeNumTextMin, styles.text])}
        onChange={(val: any) => {
          const preMax = lodash.last(value);
          const maxValue = preMax;
          const minValue = val;

          onChange([minValue, maxValue]);
        }}
      />
      <Divider className={styles.divider} type={'vertical'} />
      <InputNumber
        placeholder={lodash.last(placeholder)}
        value={lodash.last(value) === '-' ? undefined : lodash.last(value)}
        className={classNames([styles.rangeNumTextMax, styles.text])}
        onChange={(val: any) => {
          const preMin = lodash.first(value);
          const minValue = preMin;
          const maxValue = val;

          onChange([minValue, maxValue]);
        }}
      />
    </div>
  );
};
