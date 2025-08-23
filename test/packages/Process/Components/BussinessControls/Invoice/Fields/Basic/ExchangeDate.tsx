import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { ConfigExchangeDate } from 'process/Components/BussinessControls/Invoice/_hooks';
import { localFieldConfig } from './ExchangeDate.config';

export { localFieldConfig } from './ExchangeDate.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  namespaceType,
  incidentId,
  id,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { Rules, extraConfig } = ConfigExchangeDate({
    NAMESPACE,
    namespaceType,
    incidentId,
    invoiceId: id,
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const ExchangeDate = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  id,
  NAMESPACE,
  namespaceType,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      namespaceType={namespaceType}
      incidentId={incidentId}
      id={id}
    />
  </Authority>
);

ExchangeDate.displayName = localFieldConfig.field;

export default ExchangeDate;
