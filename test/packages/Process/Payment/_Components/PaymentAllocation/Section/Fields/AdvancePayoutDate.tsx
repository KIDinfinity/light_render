import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './AdvancePayoutDate.config';


export { localFieldConfig } from './AdvancePayoutDate.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
}: any) => {
  const visibleConditions = true;
  const editableConditions = !!form.getFieldValue('advancedPayoutAmount');
  const requiredConditions = true;
  const fieldProps: any = localFieldConfig['field-props'];

  const Rules = {};
  
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          isInline
          allowFreeSelect
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
        />
      </Col>
    )
  );
};

const PhoneNo = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
}: any) => (
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

PhoneNo.displayName = localFieldConfig.field;

export default PhoneNo;
