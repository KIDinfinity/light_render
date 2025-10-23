import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Visible,
  FormItemDatePicker,
  Required,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './ExpiryDate.config';
export { fieldConfig } from './ExpiryDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
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
          allowFreeSelect
          allowClear
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Accountnumber = ({ field, config, form, editable, layout, isShow, required }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      required={required}
    />
  </Authority>
);

Accountnumber.displayName = 'bankAcctToDate';

export default Accountnumber;
