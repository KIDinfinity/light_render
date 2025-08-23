import { Col } from 'antd';
import lodash from 'lodash';
import React from 'react';

import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
  Validator,
} from 'basic/components/Form';

import { localFieldConfig } from './DeductibleAmount.config';

export { localFieldConfig } from './DeductibleAmount.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  benefitTypeData,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_000736: Validator.VLD_000736(benefitTypeData),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const DeductibleAmount = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  benefitTypeData,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      benefitTypeData={benefitTypeData}
    />
  </Authority>
);

DeductibleAmount.displayName = localFieldConfig.field;

export default DeductibleAmount;
