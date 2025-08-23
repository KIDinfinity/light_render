import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './AcknowledgedNonrecommendedFunds.config';

export { localFieldConfig } from './AcknowledgedNonrecommendedFunds.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { tenant } from '@/components/Tenant';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { formatMessageApi } from '@/utils/dictFormatMessage';

function checkFail(riskToleranceLevel, fundRiskLevel) {
  if (Number(riskToleranceLevel) === 1) {
    return Number(fundRiskLevel) > 1;
  }
  if (Number(riskToleranceLevel) === 2) {
    return Number(fundRiskLevel) > 4;
  }
  if (Number(riskToleranceLevel) === 3) {
    return Number(fundRiskLevel) > 5;
  }
  if (Number(riskToleranceLevel) === 4) {
    return Number(fundRiskLevel) > 7;
  }
  if (Number(riskToleranceLevel) === 5) {
    return Number(fundRiskLevel) > 8;
  }
  return false;
}

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );

  const riskToleranceLevel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.suitability
        ?.riskToleranceLevel
  );

  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);

  const cleanDecision = formUtils.queryValue(decision);
  const cleanRiskToleranceLevel = formUtils.queryValue(riskToleranceLevel);
  const allFundConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allFundConfigList
  );
  const riskAwareness = form.getFieldValue('riskAwareness');
  const fundCode = form.getFieldValue('fundCode');
  const switchInPerc = form.getFieldValue('switchInPerc');
  const fundRiskLevel = allFundConfigList?.find(
    (item) => item?.dictCode === fundCode
  )?.fundRiskLevel;

  const showWarn = useMemo(() => {
    return (
      isDecision({ caseCategory }) &&
      cleanDecision !== DecisionEnum.D &&
      tenant.isTH() &&
      editable &&
      Number(switchInPerc || 0) > 0 &&
      (lodash.isNumber(cleanRiskToleranceLevel) || !lodash.isEmpty(cleanRiskToleranceLevel)) &&
      (lodash.isNumber(fundRiskLevel) || !lodash.isEmpty(fundRiskLevel)) &&
      checkFail(cleanRiskToleranceLevel, fundRiskLevel) &&
      riskAwareness !== 'Y'
    );
  }, [cleanDecision, switchInPerc, cleanRiskToleranceLevel, fundRiskLevel, riskAwareness]);

  const Rules = {};

  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const warningMessage = () => {
    const warns = [];
    if (isHistory) {
      return warns;
    }
    if (showWarn) {
      warns.push({
        message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000889' }),
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
        <FormItemSelect
          dicts={dicts}
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
          isInline
          warningMessage={warningMessage()}
        />
      </Col>
    )
  );
};

const AcknowledgedNonrecommendedFunds = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

AcknowledgedNonrecommendedFunds.displayName = localFieldConfig.field;

export default AcknowledgedNonrecommendedFunds;
