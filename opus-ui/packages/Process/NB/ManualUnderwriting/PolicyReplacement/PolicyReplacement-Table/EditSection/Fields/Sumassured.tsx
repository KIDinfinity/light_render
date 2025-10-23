import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Sumassured.config';

export { fieldConfig } from './Sumassured.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  index,
  replaceInforce,
  paidByPolicyLoan,
  config,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions =
    index === 0
      ? replaceInforce === '1' || paidByPolicyLoan === '1'
      : RuleByForm(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
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
          hiddenPrefix
          labelType="inline"
          precision={0}
          placeholder=" "
          objectName="nb.policyList.replacementInfoList"
          objectFieldName="sumAssured"
        />
      </Col>
    )
  );
};

const Sumassured = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  index,
  replaceInforce,
  paidByPolicyLoan,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      index={index}
      replaceInforce={replaceInforce}
      paidByPolicyLoan={paidByPolicyLoan}
    />
  </Authority>
);

Sumassured.displayName = 'sumAssured';

export default Sumassured;
