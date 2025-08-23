import React from 'react';
// import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
// import { useSelector, useDispatch } from 'dva';
import { Authority, Editable, FormItemNumber, Required, Visible } from 'basic/components/Form';
import { localFieldConfig } from './Expense.config';

export { localFieldConfig } from './Expense.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  // const dispatch = useDispatch();

  // const invoiceCurrency = useSelector(
  //   ({ [NAMESPACE]: modelnamepsace }: any) =>
  //     modelnamepsace.claimEntities.invoiceListMap[invoiceId]?.invoiceCurrency
  // );

  // const changeInvoiceCurrency = (selectCurrency: any) => {
  //   dispatch({
  //     type: `${NAMESPACE}/saveInvoiceItem`,
  //     payload: {
  //       changedFields: { invoiceCurrency: selectCurrency.currencyCode },
  //       invoiceId,
  //     },
  //   });
  // };
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          min={Number.MIN_SAFE_INTEGER}
          hiddenPrefix
          labelType={config.label?.type || fieldProps.label.type}
          placeholder
          hideRequired
        />
      </Col>
    )
  );
};

const Expense = ({ field, config, isShow, layout, form, editable, invoiceId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      invoiceId={invoiceId}
    />
  </Authority>
);

Expense.displayName = localFieldConfig.field;

export default Expense;
