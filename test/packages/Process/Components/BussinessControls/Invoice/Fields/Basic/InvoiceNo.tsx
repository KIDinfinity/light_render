import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { ConfigInvoiceNo } from 'process/Components/BussinessControls/Invoice/_hooks';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './InvoiceNo.config';

export { localFieldConfig } from './InvoiceNo.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  treatmentId,
  NAMESPACE,
  namespaceType,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { Rules, extraConfig } = ConfigInvoiceNo({
    NAMESPACE,
    namespaceType,
    treatmentId,
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules?.[rule])
          )}
          labelType={config.label?.type || fieldProps.label.type}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const InvoiceNo = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  NAMESPACE,
  namespaceType,
  id,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      NAMESPACE={NAMESPACE}
      namespaceType={namespaceType}
      id={id}
    />
  </Authority>
);

InvoiceNo.displayName = localFieldConfig.field;

export default InvoiceNo;
