import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemDatePicker,
  Validator,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';

import { useSelector } from 'dva';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Basic.Expand',
  field: 'dateOfAdmission',
  'field-props': {
    visible: 'C',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: '' }, operator: '', right: '' }],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'no-invoice-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-rules': ['admissionDateLaterIncidentDate', 'admissionDateEarlierDeathDate'],
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  isTreatmentTypeIP,
}: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

  const incidentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.incidentListMap[incidentId]
  );
  const dateTimeOfDeath = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimProcessData?.insured?.dateTimeOfDeath
  );
  const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
  const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);

  const visibleConditions = isTreatmentTypeIP;
  const editableConditions = !!isTreatmentTypeIP;
  const requiredConditions = isTreatmentTypeIP;

  const Rules = {
    admissionDateLaterIncidentDate: Validator.admissionDateLaterIncidentDate(incidentDateValue),
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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
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
  isShow,
  layout,
  form,
  editable,
  incidentId,
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
      incidentId={incidentId}
      isTreatmentTypeIP={isTreatmentTypeIP}
    />
  </Authority>
);

DateOfAdmission.displayName = 'DateOfAdmission';

export default DateOfAdmission;
