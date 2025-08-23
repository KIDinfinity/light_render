import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  formUtils,
  Required,
  Rule,
  Validator,
  Visible,
} from 'basic/components/Form';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import React, { useCallback } from 'react';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { localFieldConfig } from './CVDate.config';

export { localFieldConfig } from './CVDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();
  const refreshLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/refreshEffectiveDate`]
  );
  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const disabled =
    !editable ||
    ((config?.editable || fieldProps.editable) === Editable.Conditions
      ? !editableConditions
      : (config?.editable || fieldProps.editable) === Editable.No);

  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );
  const policyContractList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyContractList
  );

  const needReCalEffective = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.needReCalEffective
  );

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const isDecisionProcess = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isDecision
  );

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const cleanDecision = formUtils.queryValue(decision);

  const isUlPolicyIndicator =
    lodash.find(policyContractList, (item) => item?.policyId === mainPolicyId)
      ?.ulPolicyIndicator === 'Y';

  const mustRule = validating
    ? {
        VLD_000834: Validator.VLD_000834(isUlPolicyIndicator ? sourceSystem : 'N', 'SRV011'),
      }
    : {};

  const Rules = cleanDecision === DecisionEnum.D || !isDecisionProcess ? {} : mustRule;

  const handleDisabledDate = useCallback(
    (date: any) => {
      return sourceSystem === 'IL' && isUlPolicyIndicator
        ? moment(date).isBefore(moment().format(), 'day')
        : false;
    },
    [sourceSystem, isUlPolicyIndicator]
  );

  const handleRefresh = (value: string) => {
    const changed = value ? { effectiveDate: value } : {};
    dispatch({
      type: `${NAMESPACE}/refreshEffectiveDate`,
      payload: {
        transactionId: transactionId,
        ...changed,
        type: 'cvDate',
      },
    });
  };

  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const warningMessage = () => {
    const warns = [];
    if (isHistory) {
      return warns;
    }
    if (needReCalEffective) {
      warns.push({
        message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000835' }),
        messageType: MessageType.Information,
      });
    }
    return warns;
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={disabled}
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
          disabledDate={handleDisabledDate}
          warningMessage={warningMessage()}
          onChange={handleRefresh}
          reloadSpin={refreshLoading}
          reload={() => {
            if (disabled || refreshLoading) {
              return;
            }
            handleRefresh('');
          }}
        />
      </Col>
    )
  );
};

const CVDate = ({ isShow, layout, form, editable, transactionId, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

CVDate.displayName = localFieldConfig.field;

export default CVDate;
