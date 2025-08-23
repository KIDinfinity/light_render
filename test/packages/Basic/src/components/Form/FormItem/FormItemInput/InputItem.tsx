import React, { useEffect } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { hasError, hasInformation } from '../utils';
import checkHighLight from './checkHighLight';
import Suffix from './Suffix';
import type { FormItemInputProps } from '../typing';
import styles from '../index.less';

const InputItem = React.forwardRef<any, FormItemInputProps>((props, ref) => {
  const {
    form,
    formName,
    suffix,
    OnRecover,
    recoverValue,
    disabled,
    prefix,
    placeholder,
    maxLength,
    warningMessage,
    className,
    cusTitle,
    isEllipsis,
    onChange,
    onKeyDown,
    onPressEnter,
    onClick,
    onBlur,
    onFocus,
    setVisible,
    value,
    useArray,
    useDict,
    allowClear,
    transform,
    view = 'N',
    type,
    autoComplete,
    required = false,
  } = props;
  const formValue = form.getFieldValue(formName);
  const hightLight = checkHighLight({ props, formValue, recoverValue });
  const [tempState, setTempState] = React.useState<string | undefined>();

  const handleOnBlur = (e: any) => {
    if (onChange) {
      let val = lodash.trim(e.target.value);
      if (useArray) {
        val = [val];
      } else if (typeof transform === 'function') {
        val = transform(val);
      }

      onChange(val);
      setTempState(val);
    }
  };

  const handleChange = (e: any) => {
    // 点击allowClear 触发数据更新
    if (lodash.isEmpty(e.target?.value)) {
      onChange(e.target?.value);
    }
    setTempState(e.target?.value);
  };

  useEffect(() => {
    let val = value;
    if (useArray) {
      val = Array.isArray(value) ? value?.[0] : value;
    } else if (useDict) {
      val = formatMessageApi({ useArray: value });
    }
    setTempState(val);
  }, [useArray, useDict, value]);

  return (
    <>
      {view === 'N' ? (
        <Input
          id={formName}
          className={classNames({
            hasInformation: hasInformation(warningMessage),
            hasError: hasError(warningMessage),
            hightLight,
            [styles.suffixVisible]: hightLight,
            [styles.ellipsis]: isEllipsis,
            [styles.allowClearHover]: allowClear,
            [className]: className,
          })}
          allowClear={allowClear}
          title={formValue}
          disabled={disabled}
          maxLength={maxLength}
          value={tempState}
          onChange={handleChange}
          type={type}
          onBlur={(e) => {
            if (setVisible) setVisible(false);
            handleOnBlur(e);
            return onBlur && onBlur(e);
          }}
          onKeyDown={(e) => {
            return onKeyDown && onKeyDown(e);
          }}
          onPressEnter={(e) => {
            return onPressEnter && onPressEnter(e);
          }}
          onFocus={
            onFocus ||
            (() => {
              if (setVisible) setVisible(true);
            })
          }
          onClick={(e) => {
            return onClick && onClick(e);
          }}
          ref={ref}
          autoComplete={autoComplete}
          prefix={prefix}
          suffix={
            (suffix || (hightLight && !disabled)) && (
              <Suffix {...{ suffix, hightLight, formName, recoverValue, OnRecover, disabled }} />
            )
          }
          placeholder={placeholder}
          required={required}
        />
      ) : (
        tempState
      )}
    </>
  );
});

export default InputItem;
