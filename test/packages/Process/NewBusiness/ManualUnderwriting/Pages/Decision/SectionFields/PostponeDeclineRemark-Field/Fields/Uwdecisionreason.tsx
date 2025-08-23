import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Uwdecisionreason.config';

export { fieldConfig } from './Uwdecisionreason.config';

const FormItem = ({ isShow, layout, form, editable, field, config,labelType }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.['field-props']?.visible || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.visible || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          labelType={labelType}
          hiddenPrefix
          precision={0}
          placeholder=" "
        />
      </Col>
    )
  );
};

const Uwdecisionreason = ({ form, editable, layout, isShow, config, field,labelType }: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      labelType={labelType}
    />
  </Authority>
);

Uwdecisionreason.displayName = 'uwDecisionReason';

export default Uwdecisionreason;
