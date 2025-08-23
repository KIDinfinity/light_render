import React from 'react';
import { NAMESPACE } from '../../../../activity.config';
import { Col } from 'antd';
import { Authority, Editable, Required, Visible, Rule, FormItemInput } from 'basic/components/Form';
import { localFieldConfig } from './MedicalProvider.config';

export { localFieldConfig } from './MedicalProvider.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, NAMESPACE);

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          maxLength={config?.maxLength || fieldProps.maxLength}
        />
      </Col>
    )
  );
};

const MedicalProvider = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      incidentId={incidentId}
    />
  </Authority>
);

MedicalProvider.displayName = localFieldConfig.field;

export default MedicalProvider;
