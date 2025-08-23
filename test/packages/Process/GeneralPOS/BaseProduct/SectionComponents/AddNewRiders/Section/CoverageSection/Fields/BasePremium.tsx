import React from 'react';
import { Col } from 'antd';
import { Editable, Required, Visible, Rule, FormItemNumber } from 'basic/components/Form';
import { localFieldConfig } from './BasePremium.config';

export { localFieldConfig } from './BasePremium.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, sclale }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col
        {...layout}
        style={{
          width: `calc((1443px * ${sclale || 0.96} - 32px) / 24 * ${
            config?.['x-layout']?.lg?.span || fieldProps?.['x-layout']?.lg?.span
          })`,
          padding: 8,
        }}
      >
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          precision={2}
          isInline
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
