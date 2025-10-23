import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import { ReactComponent as CalculationSvg } from 'claim/assets/calculation.svg';
import FormItem from '../FormItem';
import checkHighLight from './checkHighLight';
import defaultProps from './defaultProps';
import Suffix from './Suffix';
import NumberItem from './NumberItem';
import type { FormItemNumberProps } from '../typing';
import styles from './index.less';

const FormItemNumber = (props: FormItemNumberProps) => {
  const {
    rules = [],
    form,
    pattern,
    isShowCalculation,
    handleOpen,
    suffix,
    formName,
    recoverValue,
    OnRecover,
    disabled,
    labelRight,
  } = props;
  const formValue = form.getFieldValue(formName);
  const hightLight = checkHighLight({ props, formValue, recoverValue });
  return (
    <FormItem
      {...props}
      rules={[
        {
          pattern,
          message: 'Out of range!',
        },
        ...rules,
      ]}
      extra={
        <>
          {isShowCalculation && (
            <Icon component={CalculationSvg} className="calculationSvg" onClick={handleOpen} />
          )}
          <Suffix {...{ hightLight, suffix, formName, recoverValue, OnRecover, disabled }} />
        </>
      }
      className={classnames('systemCalcutionItem', {
        [styles.labelRight]: labelRight,
      }, props.className)}
    >
      {/**
      // @ts-ignore */}
      <NumberItem />
    </FormItem>
  );
};

FormItemNumber.defaultProps = defaultProps;

export default FormItemNumber;
