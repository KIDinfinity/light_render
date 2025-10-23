import React from 'react';
import { Radio, Col } from 'antd';
import { map, includes } from 'lodash';
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
      disableList,
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
          style={{ height: 24 }}
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
        >
          {map(dicts, (item, index) => {
            const disable = includes(disableList, item?.[dictCode]) ? true : false;
            return colSpan ? (
              <Col span={colSpan} key={`${item[dictCode]}-${index}`}>
                {type === 'default' ? (
                  <Radio
                    key={`${item[dictCode]}-${index}`}
                    value={item[dictCode]}
                    disabled={disable}
                  >
                    {item[dictName]}
                  </Radio>
                ) : (
                  <Radio.Button
                    key={`${item[dictCode]}-${index}`}
                    value={item[dictCode]}
                    disabled={disable}
                  >
                    {item[dictName]}
                  </Radio.Button>
                )}
              </Col>
            ) : type === 'default' ? (
              <Radio key={`${item[dictCode]}-${index}`} value={item[dictCode]} disabled={disable}>
                {item[dictName]}
              </Radio>
            ) : (
              <Radio.Button
                key={`${item[dictCode]}-${index}`}
                value={item[dictCode]}
                disabled={disable}
              >
                {item[dictName]}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
    );
  }
);
export default RadioGroupItem;
