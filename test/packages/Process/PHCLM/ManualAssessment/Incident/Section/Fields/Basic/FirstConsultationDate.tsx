import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Validator,
  formUtils,
} from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ClaimTypeArray } from 'claim/enum/claimTypeArray';
import lodash from 'lodash';
import { useGetInputLimitDate } from 'process/PHCLM/_hooks';

import { localFieldConfig } from './FirstConsultationDate.config';

export { localFieldConfig } from './FirstConsultationDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];
  const claimTypeArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.claimTypeArray
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = lodash.includes(
    formUtils.queryValue(claimTypeArray),
    ClaimTypeArray.inPatient,
    ClaimTypeArray.CI
  );

  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.diagnosisListMap
  );

  const symptomDateList = lodash
    .chain(diagnosisListMap)
    .filter((item) => item?.incidentId === incidentId)
    .map((item) => formUtils.queryValue(item?.symptomDate))
    .value();

  const Rules = {
    VLD_000607: Validator.VLD_000607(
      symptomDateList,
      formatMessageApi({ Label_BIZ_Claim: 'SymptomDate' }),
      formatMessageApi({
        Label_BIZ_Claim: 'FirstConsultationDate',
      })
    ),
    VLD_000607_incidentDate: Validator.VLD_000607(
      form.getFieldValue('incidentDate'),
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
      }),
      formatMessageApi({
        Label_BIZ_Claim: 'FirstConsultationDate',
      })
    ),
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
        />
      </Col>
    )
  );
};

const FirstConsultationDate = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
}: any) => (
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

FirstConsultationDate.displayName = localFieldConfig.field;

export default FirstConsultationDate;
