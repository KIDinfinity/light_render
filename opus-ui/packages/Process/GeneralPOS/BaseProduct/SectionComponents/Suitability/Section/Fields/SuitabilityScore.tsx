import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Validator,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './SuitabilityScore.config';

export { localFieldConfig } from './SuitabilityScore.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_000817: Validator.VLD_000817(),
  };
  const onChangeHandler = async (e: any) => {
    if (!/^[0-9]*$/g.test(e)) {
      let errors = {};
      try {
        await form.validateFields([field]);
      } catch (error) {
        errors = error;
      }
      form.setFields({
        [field]: {
          value: e.replace(/[^0-9]/g, ''),
          errors: errors?.errors?.[field]?.errors || [],
        },
      });
    }
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
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onChange={onChangeHandler}
        />
      </Col>
    )
  );
};

const SuitabilityScore = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
    />
  </Authority>
);;

SuitabilityScore.displayName = localFieldConfig.field;

export default SuitabilityScore;
