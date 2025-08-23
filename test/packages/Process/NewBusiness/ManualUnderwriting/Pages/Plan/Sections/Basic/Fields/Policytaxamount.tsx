import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';

import { useDisplayPolicyTaxAmount } from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_hooks';

import { fieldConfig } from './Policytaxamount.config';
import { add, fnPrecisionFormat } from '@/utils/precisionUtils';

export { fieldConfig } from './Policytaxamount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = useDisplayPolicyTaxAmount();
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const fieldValue = add(
    form.getFieldValue('policyTaxAmount') ?? 0,
    form.getFieldValue('advancePaymentTaxAmount') ?? 0
  ).toFixed(2);
  const formatter = () => fnPrecisionFormat(fieldValue, 2);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.['field-props']?.visible || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          formatter={formatter}
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={2}
        />
      </Col>
    )
  );
};

const Policytaxamount = ({ field, isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
    />
  </Authority>
);

Policytaxamount.displayName = 'policyTaxAmount';

export default Policytaxamount;
