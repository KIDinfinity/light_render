import React from 'react';
import { NAMESPACE } from '../../../activity.config';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './Expense.config';

export { localFieldConfig } from './Expense.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  invoiceId,
  serviceItemId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const invoiceCurrency = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.invoiceListMap[invoiceId]?.invoiceCurrency
  );

  const feeItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]?.feeItemList
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = lodash.isEmpty(feeItemList);
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
          currencyCode={invoiceCurrency}
          hiddenPrefix
          labelType="inline"
          placeholder
          hideRequired
        />
      </Col>
    )
  );
};

const Expense = ({ field, config, isShow, layout, form, editable, invoiceId, serviceItemId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      invoiceId={invoiceId}
      serviceItemId={serviceItemId}
    />
  </Authority>
);

Expense.displayName = localFieldConfig.field;

export default Expense;
