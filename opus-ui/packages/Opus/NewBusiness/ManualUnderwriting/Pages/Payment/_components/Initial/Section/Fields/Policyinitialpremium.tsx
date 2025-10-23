import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Policyinitialpremium.config';

export { fieldConfig } from './Policyinitialpremium.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
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
              ? editableConditions
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
          hiddenPrefix
          precision={2}
        />
      </Col>
    )
  );
};

const Policyinitialpremium = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
    />
  </Authority>
);

Policyinitialpremium.displayName = 'policyInitialPremium';

export default Policyinitialpremium;
