import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localConfig } from '../index';
import { localFieldConfig } from './WorkNo.config';

export { localFieldConfig } from './WorkNo.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj,
  OnRecover,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          recoverValue={recoverObj[localFieldConfig.field]}
          OnRecover={OnRecover}
          onChange={(e: any) => {
            const hasLetter = new RegExp(/[a-zA-Z]+/);
            if (hasLetter.test(e)) {
              form.setFieldsValue({ [localFieldConfig.field]: e.replace(/[a-zA-Z]+/g, '') });
            }
          }}
        />
      </Col>
    )
  );
};

const WorkNo = ({ isShow, layout, form, editable, section, recoverObj, OnRecover }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        recoverObj={recoverObj}
        OnRecover={OnRecover}
      />
    </ElementConfig.Field>
  </Authority>
);

WorkNo.displayName = localFieldConfig.field;

export default WorkNo;
