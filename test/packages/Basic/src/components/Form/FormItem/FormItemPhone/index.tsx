import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import FormItem from '../FormItem';
import Suffix from './Suffix';
import defaultProps from './defaultProps';
import Phone from './Phone';
import type { FormItemPhoneProps } from '../typing';
import styles from './index.less';

const PhoneItem = React.forwardRef<any, FormItemPhoneProps>((props, ref) => {
  const {
    form,
    formName,
    suffix,
    OnRecover,
    recoverValue,
    disabled,
    placeholder,
    maxLength,
    cusTitle,
    onBlur,
    value,
    onChange,
    setVisible,
    required,
  } = props;

  const formValue = form.getFieldValue(formName);

  const hightLight = !!(recoverValue && !lodash.isEqual(recoverValue, formValue));

  const suffixVisible = !!(recoverValue && !lodash.isEqual(recoverValue, formValue));

  return (
    <Phone
      id={formName}
      title={cusTitle ? value : ''}
      disabled={disabled}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      parent={this}
      errors={form.getFieldError(formName)}
      placeholder={placeholder}
      onBlur={(e: any) => onBlur && onBlur(e)}
      autoComplete="disable-chrome-autofill-mark"
      className={classNames({
        hightLight,
        [styles.suffixVisible]: suffixVisible,
      })}
      ref={ref}
      setVisible={setVisible}
      suffix={<Suffix {...{ form, suffix, formName, recoverValue, OnRecover, disabled }} />}
      required={required}
    />
  );
});

const FormItemPhone = (props: any) => (
  <FormItem {...props}>
    {/**
    // @ts-ignore */}
    <PhoneItem />
  </FormItem>
);

FormItemPhone.defaultProps = defaultProps;

export default FormItemPhone;
