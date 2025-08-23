import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  formUtils,
  Required,
  Rule,
  Visible,
  Validator,
} from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useGetInputLimitDate } from 'process/PHCLM/_hooks';
import { localFieldConfig } from './DateOfAdmission.config';

export { localFieldConfig } from './DateOfAdmission.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentItem }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

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

  const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const disableConditions =
    (form.getFieldValue('treatmentType') === 'OP' &&
      lodash.includes(formUtils.queryValue(incidentItem?.claimTypeArray), 'PA')) ||
    !!isRegisterMcs;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_000607: Validator.VLD_000607(
      symptomDateList,
      formatMessageApi({ Label_BIZ_Claim: 'SymptomDate' }),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
      })
    ),
    VLD_000607_incidentDate: Validator.VLD_000607(
      formUtils.queryValue(lodash.get(incidentItem, 'incidentDate')),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
      }),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
      })
    ),
    VLD_000607_firstConsultationDate: Validator.VLD_000607(
      formUtils.queryValue(lodash.get(incidentItem, 'firstConsultationDate')),
      formatMessageApi({
        Label_BIZ_Claim: 'FirstConsultationDate',
      }),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
      })
    ),
    admissionDateEarlierDeathDate: Validator.admissionDateEarlierDeathDate(dateTimeOfDeathValue),
  };

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
              ? disableConditions
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
        />
      </Col>
    )
  );
};

const DateOfAdmission = ({ field, config, isShow, layout, form, editable, incidentItem }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentItem={incidentItem}
    />
  </Authority>
);

DateOfAdmission.displayName = localFieldConfig.field;

export default DateOfAdmission;
