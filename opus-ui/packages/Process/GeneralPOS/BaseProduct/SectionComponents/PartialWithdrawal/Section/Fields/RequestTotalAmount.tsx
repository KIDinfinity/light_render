import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './RequestTotalAmount.config';
import { useSelector } from 'dva';
export { localFieldConfig } from './RequestTotalAmount.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { LimitTypeEnum, DecisionEnum } from 'process/GeneralPOS/common/Enum';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const currency = policyInfo?.policyFundDOList?.[0]?.currency;
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const limitData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.limitData);

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const cleanDecision = formUtils.queryValue(decision);
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const mustRule = validating
    ? {
        VLD_000914: Validator.VLD_000914(
          currency,
          limitData?.[LimitTypeEnum.MinimumRedemptionAmount]
        ),
      }
    : {};

  const Rules = cleanDecision === DecisionEnum.D ? {} : mustRule;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          precision={2}
          pattern={/.*/}
        />
      </Col>
    )
  );
};

const RequestTotalAmount = ({ isShow, layout, form, editable, config }: any) => (
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

RequestTotalAmount.displayName = localFieldConfig.field;

export default RequestTotalAmount;
