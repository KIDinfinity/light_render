import React, { useCallback } from 'react';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import moment from 'moment';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

import { localFieldConfig } from './EffectiveDate.config';

export { localFieldConfig } from './EffectiveDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(
    config['visible-condition'] || fieldProps['visible-condition'],
    form,
    ''
  );
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
  const requiredConditions = Rule(
    config['required-condition'] || fieldProps['required-condition'],
    form,
    ''
  );
  const refreshLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/refreshEffectiveDate`]
  );
  const disabled =
    !editable ||
    ((config?.editable || fieldProps.editable) === Editable.Conditions
      ? !editableConditions
      : (config?.editable || fieldProps.editable) === Editable.No);

  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );
  const needReCalEffective = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.needReCalEffective
  );
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const policyContractList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyContractList
  );
  const isUlPolicyIndicator =
    lodash.find(policyContractList, (item) => item?.policyId === mainPolicyId)
      ?.ulPolicyIndicator === 'Y';
  const transactionTypeCode = form.getFieldValue('transactionTypeCode');

  const isDecisionProcess = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isDecision
  );

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const cleanDecision = formUtils.queryValue(decision);

  let Rules = {
    VLD_000834: Validator.VLD_000834(sourceSystem, transactionTypeCode),
    VLD_000859: Validator.VLD_000859(sourceSystem),
  };
  if (transactionTypeCode === 'SRV011') {
    const mustRule = validating
      ? {
          VLD_000834: Validator.VLD_000834(
            isUlPolicyIndicator ? sourceSystem : 'N',
            transactionTypeCode
          ),
        }
      : {};
    Rules = cleanDecision === DecisionEnum.D || !isDecisionProcess ? {} : mustRule;
  }

  const handleDisabledDate = useCallback(
    (date: any) => {
      if (transactionTypeCode === 'SRV011') {
        return sourceSystem === 'IL' && isUlPolicyIndicator
          ? moment(date).isBefore(moment().format(), 'day')
          : false;
      }
      return sourceSystem === 'IL'
        ? !moment(date).isBetween(moment().format(), moment().add(1, 'month').format(), 'day', '[]')
        : !moment(date).isBetween(
            moment().subtract(1, 'month').format(),
            moment().add(1, 'month').format(),
            'day',
            '[]'
          );
    },
    [sourceSystem, transactionTypeCode, isUlPolicyIndicator]
  );

  const handleRefresh = (value: string) => {
    const changed = value ? { effectiveDate: value } : {};
    dispatch({
      type: `${NAMESPACE}/refreshEffectiveDate`,
      payload: {
        transactionId: id,
        ...changed,
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
          getCalendarContainer={() =>
            document.getElementById('PayoutOptionSection') ||
            document.getElementById('layoutContent') ||
            document.body
          }
          placement="bottomLeft"
        />
      </Col>
    )
  );
};

const EffectiveDate = ({ isShow, layout, form, editable, transactionId, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={transactionId}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

EffectiveDate.displayName = localFieldConfig.field;

export default EffectiveDate;
