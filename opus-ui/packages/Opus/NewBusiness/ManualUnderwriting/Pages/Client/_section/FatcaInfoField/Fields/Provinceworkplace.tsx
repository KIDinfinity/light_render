import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Provinceworkplace.config';

export { fieldConfig } from './Provinceworkplace.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(config['editable-condition'], form, '');
  const requiredConditions = Rule(config['required-condition'], form, '');

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
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Provinceworkplace = ({ field, form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
    />
  </Authority>
);

Provinceworkplace.displayName = 'provinceWorkPlace';

export default Provinceworkplace;
