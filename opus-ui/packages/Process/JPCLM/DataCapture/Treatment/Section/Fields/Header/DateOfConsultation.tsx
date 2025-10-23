import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Validator,
  formUtils,
} from 'basic/components/Form';

import lodash from 'lodash';

import { IncidentCode } from 'claim/pages/Enum';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.header',
  field: 'dateOfConsultation',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
    },
    visible: 'N',
    editable: 'C',
    required: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': ['consultationDateLaterIncidentDate', 'consultationDateEarlierDeathDate'],
  },
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  incidentItem,
  insured,
  field,
  config,
}: any) => {
  const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
  const dateTimeOfDeathValue = formUtils.queryValue(insured?.dateTimeOfDeath);
  const treatmentTypeValue = form.getFieldValue('treatmentType');
  const isTreatmentTypeOP = treatmentTypeValue === IncidentCode.OutPatient;
  const fieldProps: any = fieldConfig['field-props'];
  const Rules = {
    consultationDateLaterIncidentDate: Validator.consultationDateLaterIncidentDate(
      incidentDateValue
    ),
    consultationDateEarlierDeathDate: Validator.consultationDateEarlierDeathDate(
      dateTimeOfDeathValue
    ),
  };
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !isTreatmentTypeOP
            : config?.editable === Editable.No)
        }
        required={
          config?.required === Required.Conditions
            ? isTreatmentTypeOP
            : config?.required === Required.Yes
        }
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
        name={config?.name}
      />
    </Col>
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
    />
  </Authority>
);

DateOfConsultation.displayName = 'DateOfConsultation';

export default DateOfConsultation;
