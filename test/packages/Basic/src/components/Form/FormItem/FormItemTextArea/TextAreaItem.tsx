import React, { useEffect } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import { hasError, hasInformation } from '../utils';
import type { FormItemTextAreaProps } from '../typing';

const TextAreaItem = React.forwardRef<any, FormItemTextAreaProps>((props, ref) => {
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
    autoSize,
    onClick,
    onBlur,
    onFocus,
    setVisible = () => {},
    row,
    value,
    onChange,
    onType,
    required,
  } = props;

  const [tempState, setTempState] = React.useState<string | undefined>(value);

  const handleChange = (e: any) => {
    setTempState(e.target?.value);
    if (onType) {
      onType(e.target?.value);
    }
  };

  const handleOnBlur = (e: any) => {
    if (onChange) {
      onChange(lodash.trim(e.target?.value));
      setTempState(lodash.trim(e.target?.value));
    }
  };

  useEffect(() => {
    if (tempState !== value) {
      setTempState(value);
    }
  }, [value]);

  return (
    <Input.TextArea
      id={formName}
      className={classNames({
        hasInformation: hasInformation(warningMessage),
        hasError: hasError(warningMessage),
        [className]: className,
      })}
      rows={row}
      title={cusTitle ? tempState : ''}
      value={tempState}
      disabled={disabled}
      maxLength={maxLength}
      onChange={handleChange}
      onBlur={(e) => {
        handleOnBlur(e);
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={(e) => {
        setVisible(true);
        return onFocus && onFocus(e);
      }}
      onClick={(e) => {
        return onClick && onClick(e);
      }}
      ref={ref}
      autoComplete="disable-chrome-autofill-mark"
      prefix={prefix}
      // @ts-ignore
      suffix={suffix}
      placeholder={placeholder}
      autoSize={autoSize}
      required={required}
    />
  );
});

export default TextAreaItem;
