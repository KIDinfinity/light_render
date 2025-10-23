import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
} from 'basic/components/Form';
import { VLD_000929 } from 'claim/pages/validators/fieldValidators';
import { formUtils } from 'basic/components/Form';
import { localFieldConfig } from './SharedPercentage.config';

export { localFieldConfig } from './SharedPercentage.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, benefitItem }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const sumPercentage = benefitItem?.beneficiaryList?.reduce(
    (sum, item) =>
      sum + (formUtils.queryValue(item?.beneficiaryPercentage) || 0),
    0
  ) || 0;
  const currentValue = form.getFieldValue('beneficiaryPercentage');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          isInline
          rules={[
            {
              validator: VLD_000929(sumPercentage - currentValue, benefitItem?.policyNo),
            },
          ]}
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
          maxLength={config?.maxLength || fieldProps.maxLength}
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

const SharedPercentage = ({ field, config, isShow, layout, form, editable, benefitItem }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} benefitItem={benefitItem} />
  </Authority>
);

SharedPercentage.displayName = localFieldConfig.field;

export default SharedPercentage;
