import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Rule, Visible } from 'basic/components/Form';

import { localFieldConfig } from './SurgeryBenefit.config';

export { localFieldConfig } from './SurgeryBenefit.config';
const FormItem = ({ isShow, layout, form, editable, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

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
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          form={form}
          formName={config.name || localFieldConfig?.field}
        />
      </Col>
    )
  );
};

const SurgeryBenefit = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

SurgeryBenefit.displayName = localFieldConfig.field;

export default SurgeryBenefit;
