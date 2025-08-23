import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Rule,
  Visible,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import React from 'react';
import { localFieldConfig } from './CreditCardNumber.config';

export { localFieldConfig } from './CreditCardNumber.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const cardType = form.getFieldValue('creditCardType');
  const bankCode = form.getFieldValue('bankCode');

  const Rules = {
    VLD_001116: Validator.VLD_001116(bankCode),
    VLD_000995: Validator.VLD_000995(cardType),
    VLD_000999: Validator.VLD_000999(16),
    VLD_001117: Validator.VLD_001117(bankCode),
  };
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
          formName={config?.name || field}
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
          labelType={config.label?.type || fieldProps.label.type}
          placeholder=""
          pattern={/.*/}
        />
      </Col>
    )
  );
};

const CreditCardNumber = ({ isShow, layout, form, editable, config }: any) => (
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
);

CreditCardNumber.displayName = localFieldConfig.field;

export default CreditCardNumber;
