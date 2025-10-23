import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Reasonforpolicyreplacement.config';

export { fieldConfig } from './Reasonforpolicyreplacement.config';

const FormItem = ({
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
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions =
    index === 0
      ? replaceInforce === '1' || paidByPolicyLoan === '1'
      : RuleByForm(fieldProps['required-condition'], form);

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {((type) => {
          switch (type) {
            case 'Text':
              return (
                <FormItemInput
                  disabled={
                    !editable ||
                    ((config?.['field-props']?.editable || fieldProps.editable) ===
                    Editable.Conditions
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
                  precision={0}
                  labelType="inline"
                  placeholder=" "
                />
              );
            case 'Dropdown':
            default:
              return (
                <FormItemSelect
                  dicts={dicts}
                  disabled={
                    !editable ||
                    ((config?.['field-props']?.editable || fieldProps.editable) ===
                    Editable.Conditions
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
                  precision={0}
                  labelType="inline"
                  getPopupContainer={() => document.body}
                  placeholder=" "
                />
              );
          }
        })(config?.fieldType)}
      </Col>
    )
  );
};

const Reasonforpolicyreplacement = ({
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

Reasonforpolicyreplacement.displayName = 'reasonForPolicyReplacement';

export default Reasonforpolicyreplacement;
