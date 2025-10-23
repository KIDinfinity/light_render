import React from 'react';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './SymptomDate.config';

export { localFieldConfig } from './SymptomDate.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  NAMESPACE,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(
    fieldProps['required-condition'],
    form,
    `${NAMESPACE}.claimEntities?.incidentListMap?.[${incidentId}]`
  );

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
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const SymptomDate = ({ field, config, isShow, layout, form, editable, incidentId, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

SymptomDate.displayName = localFieldConfig.field;

export default SymptomDate;
