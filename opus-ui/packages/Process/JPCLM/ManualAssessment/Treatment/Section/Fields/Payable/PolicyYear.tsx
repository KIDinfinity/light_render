import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Validator,
} from 'basic/components/Form';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { localFieldConfig } from './PolicyYear.config';

export { localFieldConfig } from './PolicyYear.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  calculateByPolicyYear,
  treatmentPayableItem,
  curTreatmentPayableList,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const visibleConditions = lodash.includes(
    [CalculateByPolicyYear.Y, CalculateByPolicyYear.F],
    calculateByPolicyYear
  );
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = {
    checkClaimPayableListByPolicyYear: Validator.checkClaimPayableListByPolicyYear(
      listPolicy,
      curTreatmentPayableList,
      treatmentPayableItem
    ),
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
          formatter={(value: any) => {
            if (calculateByPolicyYear === CalculateByPolicyYear.F) {
              return value > 1 ? 2 : value;
            }
            return value;
          }}
          precision={0}
          min={0}
          max={999999999.99}
        />
      </Col>
    )
  );
};

const PolicyYear = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  calculateByPolicyYear,
  treatmentPayableItem,
  curTreatmentPayableList,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      calculateByPolicyYear={calculateByPolicyYear}
      treatmentPayableItem={treatmentPayableItem}
      curTreatmentPayableList={curTreatmentPayableList}
    />
  </Authority>
);

PolicyYear.displayName = localFieldConfig.field;

export default PolicyYear;
