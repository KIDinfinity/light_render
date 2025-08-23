import React from 'react';
import { Select } from 'antd';
import { map, includes } from 'lodash';
import classNames from 'classnames';
import FormItem from '../FormItem';
import { hasError, hasInformation } from '../utils';
import NumberSelect from './NumberSelect';
// @ts-ignore
import defaultProps from './defaultProps';
import type { FormItemNumberSelectProps } from '../typing';

const NumberSelectItem = React.forwardRef<any, FormItemNumberSelectProps>((props, ref) => {
  const {
    disabled,
    onChange,
    dictCode = '',
    dicts,
    dictName = '',
    value,
    cusTitle,
    maxLength,
    onClick,
    warningMessage,
    setVisible = () => {},
    onBlur,
    placeholder,
    existCodes,
    optionShowType,
    required,
  } = props;

  return (
    <NumberSelect
      // @ts-ignore
      className={classNames({
        hasInformation: hasInformation(warningMessage),
        hasError: hasError(warningMessage),
      })}
      onChange={onChange}
      title={cusTitle ? value : ''}
      value={value}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={(e: any) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={() => setVisible(true)}
      onClick={(e: any) => {
        return onClick && onClick(e);
      }}
      placeholder={placeholder}
      ref={ref}
      autoComplete="disable-chrome-autofill-mark"
      required={required}
    >
      {map(dicts, (item: any, index: any) => (
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
    </NumberSelect>
  );
});

const FormItemNumberSelect = (props: any) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <NumberSelectItem />
  </FormItem>
);

FormItemNumberSelect.defaultProps = defaultProps;

export default FormItemNumberSelect;
