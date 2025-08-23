import React from 'react';
import { Cascader } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FormItemCascaderProps } from '../typing';

const CascaderItem = React.forwardRef<any, FormItemCascaderProps>((props: any, ref: any) => {
  const {
    formName,
    disabled,
    prefix,
    placeholder,
    onChange,
    onKeyDown,
    onPressEnter,
    onClick,
    onBlur,
    onFocus,
    setVisible,
    dicts,
    fieldNames,
    value,
    required = false,
  } = props;

  return (
    <Cascader
      // @ts-ignore
      id={formName}
      changeOnSelect
      expandTrigger="hover"
      options={dicts}
      fieldNames={fieldNames}
      notFoundContent={formatMessageApi({
        Label_BIZ_Claim: 'component.noticeIcon.empty',
      })}
      value={value}
      disabled={disabled}
      // @ts-ignore
      onBlur={(e: React.MouseEvent) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onKeyDown={(e: React.MouseEvent) => {
        return onKeyDown && onKeyDown(e);
      }}
      onPressEnter={(e: React.MouseEvent) => {
        return onPressEnter && onPressEnter(e);
      }}
      onFocus={onFocus || (() => setVisible(true))}
      onClick={(e: React.MouseEvent) => {
        return onClick && onClick(e);
      }}
      ref={ref}
      prefix={prefix}
      placeholder={placeholder}
      onChange={(e, selectedOptions) => {
        return onChange && onChange(e, selectedOptions);
      }}
      required={required}
    />
  );
});

export default CascaderItem;
