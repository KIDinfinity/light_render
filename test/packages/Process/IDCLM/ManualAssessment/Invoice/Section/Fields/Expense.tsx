import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemCurrency,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './Expense.config';

export { localFieldConfig } from './Expense.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, invoiceId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const invoiceCurrency = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.invoiceListMap[invoiceId]?.invoiceCurrency
  );

  const onInvoiceCurrencyChange = (selectCurrency: any) => {
    const currency = selectCurrency.currencyCode;
    dispatch({
      type: `${NAMESPACE}/saveInvoiceCurrency`,
      payload: {
        invoiceCurrencyObj: {
          invoiceId,
          invoiceCurrency: currency,
        },
      },
    });
    dispatch({
      type: `${NAMESPACE}/hideCurrencyModal`,
      payload: {
        currencyModalShowStatus: true,
      },
    });
  };
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCurrency
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          precision={2}
          suffixEditable={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          onSuffixChange={onInvoiceCurrencyChange}
          hiddenPrefix
          suffixSelect
          currencyCode={invoiceCurrency}
          labelType="inline"
        />
      </Col>
    )
  );
};

const Expense = ({ field, config, isShow, layout, form, editable, invoiceId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      invoiceId={invoiceId}
    />
  </Authority>
);

Expense.displayName = 'expense';

export default Expense;
