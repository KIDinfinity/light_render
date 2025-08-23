import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Policyno.config';
import useLoadProductCodeConfig from '../../../../_hooks/useLoadProductCodeConfig';
export { fieldConfig } from './Policyno.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const handleBlur = useLoadProductCodeConfig();

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          onBlur={(e: any) => handleBlur(e.target?.value)}
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
          hiddenPrefix
          precision={0}
          labelType="inline"
          placeholder={''}
        />
      </Col>
    )
  );
};

const Policyno = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
    />
  </Authority>
);

Policyno.displayName = 'policyNo';

export default Policyno;
