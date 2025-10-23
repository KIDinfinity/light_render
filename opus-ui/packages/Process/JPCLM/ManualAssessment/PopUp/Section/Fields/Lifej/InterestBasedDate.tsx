import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  FormItemDatePicker,
  Required,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './InterestBasedDate.config';

export { localFieldConfig } from './InterestBasedDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = false;

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

const InterestBasedDate = ({ field, config, form, isShow, editable, layout }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      layout={layout}
      isShow={isShow}
      form={form}
      editable={editable}
    />
  </Authority>
);

InterestBasedDate.displayName = 'InterestBasedDate';

export default InterestBasedDate;
