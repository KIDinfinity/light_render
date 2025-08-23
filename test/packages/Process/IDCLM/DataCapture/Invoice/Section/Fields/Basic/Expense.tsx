import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemCurrency,
  Required,
  Visible,
  Validator,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './Expense.config';

export { localFieldConfig } from './Expense.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, invoiceId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const invoiceItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.invoiceListMap[invoiceId]
  );
  const { invoiceCurrency } = lodash.pick(invoiceItem, ['invoiceCurrency']);

  const changeInvoiceCurrency = (selectCurrency: any) => {
    dispatch({
      type: `${NAMESPACE}/saveInvoiceItem`,
      payload: {
        changedFields: { invoiceCurrency: selectCurrency.currencyCode },
        invoiceId,
      },
    });
  };
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_000013: Validator.VLD_000013({ claimEntities, invoiceId }),
  };

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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          suffixEditable
          hiddenPrefix
          onSuffixChange={changeInvoiceCurrency}
          currencyCode={invoiceCurrency}
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

Expense.displayName = localFieldConfig.field;

export default Expense;
