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
import lodash from 'lodash';
import { localFieldConfig } from './SurName.config';

export { localFieldConfig } from './SurName.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isInline = true,
  recoverObj,
  OnRecover,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};
  const otherParams = {
    recoverValue: recoverObj[localFieldConfig.field],
    OnRecover,
  };
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
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => {
              return Rules[rule];
            })
          )}
          allowClear
          autoComplete="off"
          isInline={isInline}
          {...otherParams}
        />
      </Col>
    )
  );
};

const SurName = ({
  isShow,
  layout,
  form,
  editable,
  isInline,
  config,
  recoverObj,
  OnRecover,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isInline={isInline}
      config={config}
      field={localFieldConfig.field}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
    />
  </Authority>
);

SurName.displayName = localFieldConfig.field;

export default SurName;
