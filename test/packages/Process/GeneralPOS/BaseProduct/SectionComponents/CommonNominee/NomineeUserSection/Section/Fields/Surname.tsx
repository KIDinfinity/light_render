import React, { useEffect } from 'react';
import { Col } from 'antd';
import { Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './Surname.config';

export { localFieldConfig } from './Surname.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isAdd,
  addHandle,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const value = form.getFieldValue(field);

  useEffect(() => {
    if (isAdd && !lodash.isEmpty(value)) {
      form.setFieldsValue({ [field]: '' });
    }
  }, [value]);

  const blurHandle = (e) => {
    const value = e.currentTarget.value;
    if (isAdd) {
      addHandle(value, field);
    }
  };

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          allowClear
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
            isAdd
              ? false
              : (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onBlur={blurHandle}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
