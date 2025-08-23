import React from 'react';
import { Radio, Col } from 'antd';
import { map } from 'lodash';
import classNames from 'classnames';
import type { FormItemRadioGroupProps } from '../typing';
import styles from './index.less';

const RadioGroupItem = React.forwardRef<any, FormItemRadioGroupProps & { type: string }>(
  (props, ref) => {
    const {
      form,
      formName,
      value,
      recoverValue,
      disabled,
      onChange,
      dictCode = '',
      dicts,
      dictName = '',
      onBlur,
      setVisible = () => {},
      type = 'default',
      colSpan,
      required,
    } = props;

    const formValue = form.getFieldValue(formName);
    const getCompare = !!(recoverValue && recoverValue !== formValue);

    return (
      <div
        className={classNames({
          [styles.wave]: type === 'wave',
        })}
      >
        <Radio.Group
          id={formName}
          disabled={disabled}
          style={{}}
          ref={ref}
          value={value}
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
            [styles.col]: colSpan,
          })}
          required={required}
        >
          {map(dicts, (item, index) =>
            colSpan ? (
              <Col span={colSpan}>
                {type === 'default' ? (
                  <Radio key={`${item[dictCode]}-${index}`} value={item[dictCode]}>
                    {item[dictName]}
                  </Radio>
                ) : (
                  <Radio.Button key={`${item[dictCode]}-${index}`} value={item[dictCode]}>
                    {item[dictName]}
                  </Radio.Button>
                )}
              </Col>
            ) : type === 'default' ? (
              <Radio key={`${item[dictCode]}-${index}`} value={item[dictCode]}>
                {item[dictName]}
              </Radio>
            ) : (
              <Radio.Button key={`${item[dictCode]}-${index}`} value={item[dictCode]}>
                {item[dictName]}
              </Radio.Button>
            )
          )}
        </Radio.Group>
      </div>
    );
  }
);
export default RadioGroupItem;
