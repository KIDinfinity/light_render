import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Validator,
  formUtils,
  Visible,
} from 'basic/components/Form';

import lodash from 'lodash';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.basic',
  field: 'dateOfAdmission',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
    },
    visible: 'C',
    required: 'C',
    editable: 'C',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': ['admissionDateLaterIncidentDate', 'admissionDateEarlierDeathDate'],
  },
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  insured,
  incidentItem,
  isTreatmentTypeIP,
  field,
  config,
}: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
  const dateTimeOfDeathValue = formUtils.queryValue(insured?.dateTimeOfDeath);
  const fieldProps: any = fieldConfig['field-props'];
  const Rules = {
    admissionDateLaterIncidentDate: Validator.admissionDateLaterIncidentDate(incidentDateValue),
    admissionDateEarlierDeathDate: Validator.admissionDateEarlierDeathDate(dateTimeOfDeathValue),
  };

  const visibleConditions = isTreatmentTypeIP;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemDatePicker
          form={form}
          required={
            config?.required === Required.Conditions
              ? isTreatmentTypeIP
              : config?.required === Required.Yes
          }
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !isTreatmentTypeIP
              : config?.editable === Editable.No)
          }
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          name={config?.name}
          partner="dateOfDischarge"
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const DateOfAdmission = ({
  field,
  config,
  form,
  editable,
  isTreatmentTypeIP,
  insured,
  incidentItem,
  layout,
  isShow,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      {...{ form, editable, insured, incidentItem, isTreatmentTypeIP }}
    />
  </Authority>
);

DateOfAdmission.displayName = 'DateOfAdmission';

export default DateOfAdmission;
