import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './Planname.config';

export { fieldConfig } from './Planname.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  return (
    isShow &&
    ((config['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config['field-props'].name || field}
          labelId={config['field-props'].label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config['field-props'].label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config['field-props'].required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          labelType="inline"
          precision={0}
        />
      </Col>
    )
  );
};

const Planname = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);
Planname.displayName = 'planName';

export default Planname;
