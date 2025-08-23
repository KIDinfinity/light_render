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
import { localFieldConfig } from './PayableAmount.config';

export { localFieldConfig } from './PayableAmount.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { useSelector, useDispatch } from 'dva';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );
  const cleanDecision = formUtils.queryValue(decision);
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const loanAvailableAmt = form.getFieldValue('loanAvailableAmt');

  const mustRule = validating
    ? {
        VLD_001003: Validator.VLD_001003(loanAvailableAmt),
      }
    : {
        VLD_001001: Validator.VLD_001001(field),
      };

  const Rules =
    cleanDecision === DecisionEnum.D
      ? {
          VLD_001001: Validator.VLD_001001(field),
        }
      : mustRule;

  const handleChangeLoanRequest = (e) => {
    dispatch({
      type: `${NAMESPACE}/getLoanQuotation`,
      payload: {
        transactionId,
        payableAmount: e,
      },
    });
  };
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
          labelId={fieldProps.label.dictCode}
          labelTypeCode={fieldProps.label.dictTypeCode}
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
          onChange={(e) => {
            handleChangeLoanRequest(e);
          }}
        />
      </Col>
    )
  );
};

const PayableAmount = ({ isShow, layout, form, editable, config, transactionId }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
      transactionId={transactionId}
    />
  </Authority>
);

PayableAmount.displayName = localFieldConfig.field;

export default PayableAmount;
