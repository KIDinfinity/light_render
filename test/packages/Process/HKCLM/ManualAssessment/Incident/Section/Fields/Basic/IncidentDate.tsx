import React, { useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  formUtils,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector,  } from 'dva';
import { ClaimType } from 'claim/enum';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { IncidentCode } from 'claim/pages/Enum';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
import { pickDataForVLD000843 } from 'process/HKCLM/ManualAssessment/_hooks';
import { localFieldConfig } from './IncidentDate.config';

export { localFieldConfig } from './IncidentDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];
  const showWarningMSG_000855 = pickDataForVLD000843({ incidentId });
  const dateTimeOfDeath = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData?.insured?.dateTimeOfDeath
  );
  const claimTypeArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.claimTypeArray
  );
  const isCrisis = lodash.includes(formUtils.queryValue(claimTypeArray), ClaimType.Crisis);

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );
  const isclaimTypeIP = lodash.includes(formUtils.queryValue(claimTypeArray), ClaimType.IPD);
  const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
  const causeOfIncidentIllness = form.getFieldValue('causeOfIncident') === IncidentCode.Illness;
  const visibleConditions = true;
  const editableConditions =
    !((causeOfIncidentIllness && isclaimTypeIP) || isRegisterMcs) || isCrisis;
  const requiredConditions =
    form.getFieldValue('causeOfIncident') === IncidentCode.Accident || isCrisis;

  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.diagnosisListMap
  );

  const symptomDateList = lodash
    .chain(diagnosisListMap)
    .filter((item) => item?.incidentId === incidentId)
    .map((item) => formUtils.queryValue(item?.symptomDate))
    .value();

  const Rules = {
    incidentDateEarlierDeathDate: Validator.incidentDateEarlierDeathDate(dateTimeOfDeathValue),
    VLD_000607: Validator.VLD_000607(
      symptomDateList,
      formatMessageApi({ Label_BIZ_Claim: 'SymptomDate' }),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
      })
    ),
  };
  const value = form.getFieldValue(config.name || field);
  const warningMessage = useMemo(() => {
    const result: any = [];
    if (showWarningMSG_000855) {
      result.push({
        messageType: MessageType.Information,
        message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000855' }),
      });
    }
    return result;
  }, [value, showWarningMSG_000855]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          errorTake={1}
          allowFreeSelect={allowFreeSelect}
          warningMessage={warningMessage}
        />
      </Col>
    )
  );
};

const IncidentDate = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
    />
  </Authority>
);

IncidentDate.displayName = localFieldConfig.field;

export default IncidentDate;
