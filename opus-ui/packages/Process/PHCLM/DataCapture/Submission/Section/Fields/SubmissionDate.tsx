import React from 'react';
import { Col } from 'antd';
import { Editable, FormItemDatePicker, Required, Visible, Rule } from 'basic/components/Form';
import { localFieldConfig } from './SubmissionDate.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
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
          format={config.dateFormat || fieldProps.dateFormat}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          showTime
          getCalendarContainer={() => document.body}
          mode="date"
        />
      </Col>
    )
  );
};

const SubmissionDate = ({ field, config, isShow, layout, form, editable }: any) => (
  <FormItem
    field={field}
    config={config}
    isShow={isShow}
    layout={layout}
    form={form}
    editable={editable}
  />
);

SubmissionDate.displayName = localFieldConfig.field;

export default SubmissionDate;
