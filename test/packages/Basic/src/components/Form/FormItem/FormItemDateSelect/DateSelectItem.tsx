import React from 'react';
import { Select } from 'antd';
import { map, includes } from 'lodash';
import classNames from 'classnames';
import { hasError, hasInformation } from '../utils';
import DateSelect from './DateSelect';
import type { FormItemDateSelectProps } from '../typing';

const DateSelectItem = React.forwardRef<any, FormItemDateSelectProps>((props: any, ref: any) => {
  const {
    disabled,
    dictCode,
    dicts,
    dictName,
    value,
    onBlur,
    cusTitle,
    maxLength,
    setVisible,
    onClick,
    prefix,
    suffix,
    warningMessage,
    placeholder,
    optionShowType,
    existCodes,
    onChange,
    required,
  } = props;

  return (
    <DateSelect
      className={classNames({
        hasInformation: hasInformation(warningMessage),
        hasError: hasError(warningMessage),
      })}
      title={cusTitle ? value : ''}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={(e: any) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={() => setVisible(true)}
      onClick={(e: React.MouseEvent) => {
        return onClick && onClick(e);
      }}
      value={value}
      onChange={onChange}
      ref={ref}
      autoComplete="disable-chrome-autofill-mark"
      prefix={prefix}
      suffix={suffix}
      placeholder={placeholder}
      required={required}
    >
      {map(dicts, (item: any, index: number) => (
        <Select.Option
          key={`${item[dictCode]}-${index}`}
          value={item[dictCode]}
          disabled={includes(existCodes, item[dictCode])}
          title={(() => {
            if (optionShowType === 'both') return `${item[dictCode]} - ${item[dictName]}`;
            if (optionShowType === 'value') return item[dictCode];
            if (optionShowType === 'name') return item[dictName];
            return item[dictName];
          })()}
        >
          {(() => {
            if (optionShowType === 'both') return `${item[dictCode]} - ${item[dictName]}`;
            if (optionShowType === 'value') return item[dictCode];
            if (optionShowType === 'name') return item[dictName];
            return item[dictName];
          })()}
        </Select.Option>
      ))}
    </DateSelect>
  );
});

export default DateSelectItem;
