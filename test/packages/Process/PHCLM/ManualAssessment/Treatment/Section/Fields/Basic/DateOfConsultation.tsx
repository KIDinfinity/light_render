import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Validator,
  formUtils,
  Visible,
  Rule
} from 'basic/components/Form';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import { useGetInputLimitDate } from 'process/PHCLM/_hooks';

import { IncidentCode } from 'claim/pages/Enum';

import { localFieldConfig } from './DateOfConsultation.config';

export { localFieldConfig } from './DateOfConsultation.config';

const FormItem = ({ isShow, layout, form, editable, incidentItem, field, config }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const dateTimeOfDeath = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData.insured?.dateTimeOfDeath
  );

  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.diagnosisListMap
  );
  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const symptomDateList = lodash
    .chain(diagnosisListMap)
    .filter((item) => item?.incidentId === formUtils.queryValue(lodash.get(incidentItem, 'id')))
    .map((item) => formUtils.queryValue(item?.symptomDate))
    .value();

  const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
  const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
  const treatmentTypeValue = form.getFieldValue('treatmentType');
  const isTreatmentTypeOP = treatmentTypeValue === IncidentCode.OutPatient;
  const fieldProps: any = localFieldConfig['field-props'];

  const Rules = {
    VLD_000607: Validator.VLD_000607(
      symptomDateList,
      formatMessageApi({ Label_BIZ_Claim: 'SymptomDate' }),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
      })
    ),
    VLD_000607_incidentDate: Validator.VLD_000607(
      formUtils.queryValue(lodash.get(incidentItem, 'incidentDate')),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
      }),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
      })
    ),
    VLD_000607_firstConsultationDate: Validator.VLD_000607(
      formUtils.queryValue(lodash.get(incidentItem, 'firstConsultationDate')),
      formatMessageApi({
        Label_BIZ_Claim: 'FirstConsultationDate',
      }),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
      })
    ),
    consultationDateEarlierDeathDate: Validator.consultationDateEarlierDeathDate(
      dateTimeOfDeathValue
    ),
  };
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemDatePicker
          form={form}
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !!isRegisterMcs || !isTreatmentTypeOP
              : config?.editable === Editable.No)
          }
          required={
            config?.required === Required.Conditions
              ? isTreatmentTypeOP
              : config?.required === Required.Yes
          }
          formName={field || localFieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          name={config?.name}
          errorTake={1}
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const DateOfConsultation = ({
  field,
  config,
  form,
  editable,
  incidentItem,
  insured,
  layout,
  isShow,
  isTreatmentTypeIP,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentItem={incidentItem}
      insured={insured}
      isTreatmentTypeIP={isTreatmentTypeIP}
    />
  </Authority>
);

DateOfConsultation.displayName = 'DateOfConsultation';

export default DateOfConsultation;
