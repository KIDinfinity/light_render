import React from 'react';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ConfigVatExpense } from '../_hooks';
import { localFieldConfig } from './VatExpense.config';

export { localFieldConfig } from './VatExpense.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  invoiceId,
  namespaceType,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { extraConfig } = ConfigVatExpense({ NAMESPACE, namespaceType, invoiceId });

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          precision={2}
          min={0}
          max={999999999.99}
          labelType={config.label?.type || fieldProps.label.type}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const VatExpense = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  id,
  NAMESPACE,
  invoiceId,
  namespaceType,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
      namespaceType={namespaceType}
      invoiceId={invoiceId}
    />
  </Authority>
);

VatExpense.displayName = localFieldConfig.field;

export default VatExpense;
