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
import { localFieldConfig } from './AcknowledgedFXFunds.config';

export { localFieldConfig } from './AcknowledgedFXFunds.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { tenant } from '@/components/Tenant';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);

  const cleanDecision = formUtils.queryValue(decision);
  const allFundConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allFundConfigList
  );
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const fxRateRiskFlag = form.getFieldValue('fxRateRiskFlag');
  const fundCode = form.getFieldValue('fundCode');
  const switchInPerc = form.getFieldValue('switchInPerc');

  const Rules = {};

  const showWarn = useMemo(() => {
    return (
      isDecision({ caseCategory }) &&
      cleanDecision !== DecisionEnum.D &&
      tenant.isTH() &&
      editable &&
      fxRateRiskFlag !== 'Y' &&
      Number(switchInPerc || 0) > 0 &&
      allFundConfigList?.find((item) => item?.fundCode === fundCode)?.fundType === 'foreign'
    );
  }, [cleanDecision, fxRateRiskFlag, switchInPerc, allFundConfigList]);

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
          warningMessage={showWarn ? warningMessage() : []}
        />
      </Col>
    )
  );
};

const AcknowledgedFXFunds = ({ isShow, layout, form, editable, config }: any) => (
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

AcknowledgedFXFunds.displayName = localFieldConfig.field;

export default AcknowledgedFXFunds;
