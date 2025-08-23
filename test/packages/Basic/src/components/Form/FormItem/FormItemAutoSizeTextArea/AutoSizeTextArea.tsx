import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { hasError, hasInformation } from '../utils';
import type { FormItemAutoSizeTextArea } from '../typing';
import styles from './index.less';

const AutoSizeTextArea = React.forwardRef<any, FormItemAutoSizeTextArea>((props, ref) => {
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
    autoSize = true,
    onClick,
    onBlur,
    onFocus,
    setVisible = () => {},
    row,
    value,
    onChange,
    setModalVisible,
    isModelTextArea,
  } = props;

  return (
    <Input.TextArea
      id={formName}
      className={classNames({
        hasInformation: hasInformation(warningMessage),
        hasError: hasError(warningMessage),
        [className]: className,
        [styles.autoSizeTextArea]: !isModelTextArea,
      })}
      rows={row}
      title={cusTitle ? value : ''}
      value={value}
      disabled={disabled}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={(e) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={(e) => {
        setVisible(true);
        return onFocus && onFocus(e);
      }}
      onClick={(e) => {
        if (!isModelTextArea) {
          setModalVisible(true);
        }
        return onClick && onClick(e);
      }}
      ref={ref}
      autoComplete="disable-chrome-autofill-mark"
      prefix={prefix}
      // @ts-ignore
      suffix={suffix}
      placeholder={placeholder}
      autoSize={isModelTextArea ? { minRows: 8 } : autoSize}
      style={isModelTextArea ? {} : { height: 24 }}
    />
  );
});

export default AutoSizeTextArea;
