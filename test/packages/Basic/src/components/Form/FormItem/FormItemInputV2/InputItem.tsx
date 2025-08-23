import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';

import { hasError, hasInformation } from '../utils';
import checkHighLight from './checkHighLight';
import Suffix from './Suffix';
import type { FormItemInputProps } from '../typing';
import styles from '../index.less';

const removeNonAlphanumeric = (str: string): string => {
  return str.replace(/[^A-Za-z0-9]/g, ''); // 使用正则表达式移除非字母和数字的字符
};

const splitStringIntoParts = (str: string): string => {
  if (!str) return str; // 如果字符串为空
  const cleanedStr = removeNonAlphanumeric(str); // 移除非字母和数字的字符
  const part1 = cleanedStr.slice(0, 3); // 第一到第三位
  const part2 = cleanedStr.slice(3, 7); // 第四到第七位
  const part3 = cleanedStr.slice(7); // 剩下的部分
  return lodash.compact([part1, part2, part3]).join('-');
};

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
    isEllipsis,
    onChange,
    onKeyDown,
    onPressEnter,
    onClick,
    onBlur,
    onFocus,
    setVisible,
    value,
    allowClear,
    view = 'N',
    type,
    autoComplete,
    required = false,
  } = props;
  const formValue = form.getFieldValue(formName);
  const hightLight = checkHighLight({ props, formValue, recoverValue });
  const [tempState, setTempState] = React.useState<string | undefined>(splitStringIntoParts(value));

  const handleChange = (e: any) => {
    // 点击allowClear 触发数据更新
    onChange(removeNonAlphanumeric(e.target?.value));

    setTempState(splitStringIntoParts(e.target?.value));
  };

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
        splitStringIntoParts(value)
      )}
    </>
  );
});

export default InputItem;
