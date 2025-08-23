import React from 'react';
import { Radio } from 'antd';

import classNames from 'classnames';
import type { FormItemRadioProps } from '../typing';
import styles from './index.less';

const RadioItem = React.forwardRef<any, FormItemRadioProps & { type: string }>((props, ref) => {
  const {
    form,
    formName,
    value,
    recoverValue,
    disabled,
    onChange,
    onBlur,
    setVisible = () => {},
    required,
  } = props;

  const formValue = form.getFieldValue(formName);
  const getCompare = !!(recoverValue && recoverValue !== formValue);

  return (
    <Radio
      id={formName}
      disabled={disabled}
      style={{ height: 24 }}
      ref={ref}
      checked={value === true || value === 1 || value === 'Y'}
      // @ts-ignore
      onBlur={(e: any) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={() => setVisible(true)}
      onChange={(e: any) => {
        return onChange && onChange(e);
      }}
      className={classNames({
        [styles.hightLight]: getCompare,
      })}
      required={required}
    />
  );
});
export default RadioItem;
