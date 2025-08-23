import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemAutoSizeTextArea,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './LongDescription.config';

export { fieldConfig } from './LongDescription.config';

const FormItem = ({ isShow, layout, form, editable, field, config, labelType }: any) => {
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
        <FormItemAutoSizeTextArea
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
          labelType={labelType}
          hiddenPrefix
          precision={0}
          placeholder=" "
          maxLength={1000}
          autoSize={true}
        />
      </Col>
    )
  );
};

const LongDescription = ({ field, config, form, editable, layout, isShow, labelType }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      labelType={labelType}
    />
  </Authority>
);

LongDescription.displayName = 'longDescription';

export default LongDescription;
