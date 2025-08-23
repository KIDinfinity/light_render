import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { tenant } from '@/components/Tenant';
import FormItem from '../FormItem';
import Prefix from './Prefix';
import Suffix from './Suffix';
import defaultProps from './defaultProps';
import CurrencyItem from './CurrencyItem';
import type { FormItemCurrencyProps } from '../typing';
import styles from './index.less';

const FormItemCurrency = (props: FormItemCurrencyProps) => {
  const {
    rules = [],
    pattern,
    currencyCode,
    currencies,
    hiddenPrefix,
    onSuffixChange,
    disabled,
    suffixEditable,
    hiddenDropDown,
    isShowCalculation,
    handleOpen,
    suffixSelect,
  } = props;
  const [defaultCode, setDefaultCode] = useState(currencyCode || tenant.currency());
  const [currencyConfig, setCurrencyConfig] = useState(currencies || tenant.currencyConfig());

  useEffect(() => {
    setDefaultCode(currencyCode || tenant.currency());
    setCurrencyConfig(currencies || tenant.currencyConfig());
  }, [currencies, currencyCode]);

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
      className={classnames(styles.container, 'systemCalcutionItem')}
      prefix={
        <Prefix
          currencyConfig={currencyConfig}
          currencyCode={currencyCode}
          defaultCode={defaultCode}
          hiddenPrefix={hiddenPrefix}
        />
      }
      extra={
        <Suffix
          currencyCode={currencyCode}
          setDefaultCode={setDefaultCode}
          onSuffixChange={onSuffixChange}
          defaultCode={defaultCode}
          currencyConfig={currencyConfig}
          disabled={disabled}
          suffixEditable={suffixEditable}
          suffixSelect={suffixSelect}
          hiddenDropDown={hiddenDropDown}
          isShowCalculation={isShowCalculation}
          handleOpen={handleOpen}
        />
      }
    >
      {/**
      // @ts-ignore */}
      <CurrencyItem />
    </FormItem>
  );
};
FormItemCurrency.defaultProps = defaultProps;

export default FormItemCurrency;
