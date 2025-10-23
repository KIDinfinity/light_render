import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { hasError, hasInformation } from '../utils';
import type { FormItemAutoSizeTextArea } from '../typing';
import styles from './index.less';

const AutoSizeInput = React.forwardRef<any, FormItemAutoSizeTextArea>((props, ref) => {
  const {
    formName,
    suffix,
    disabled,
    prefix,
    placeholder,
    maxLength,
    warningMessage,
    className,
    cusTitle,
    onClick,
    onBlur,
    onFocus,
    setVisible = () => {},
    value,
    onChange,
    setModalVisible,
  } = props;

  return (
    <Input
      id={formName}
      className={classNames(
        {
          hasInformation: hasInformation(warningMessage),
          hasError: hasError(warningMessage),
          [className]: className,
        },
        styles.autoSizeInput
      )}
      // allowClear={allowClear}
      title={cusTitle ? value : ''}
      disabled={disabled}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      // type={type}
      onBlur={(e) => {
        if (setVisible) setVisible(false);
        return onBlur && onBlur(e);
      }}
      // onKeyDown={(e) => {
      //   return onKeyDown && onKeyDown(e);
      // }}
      // onPressEnter={(e) => {
      //   return onPressEnter && onPressEnter(e);
      // }}
      onFocus={(e) => {
        setVisible(true);
        return onFocus && onFocus(e);
      }}
      onClick={(e) => {
        setModalVisible(true);
        return onClick && onClick(e);
      }}
      ref={ref}
      autoComplete="off"
      prefix={prefix}
      suffix={suffix}
      placeholder={placeholder}
    />
  );
});

export default AutoSizeInput;
