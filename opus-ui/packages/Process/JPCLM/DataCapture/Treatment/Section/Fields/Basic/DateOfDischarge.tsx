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
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
import lodash from 'lodash';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.basic',
  field: 'dateOfDischarge',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-discharge',
    },
    visible: 'C',
    required: 'C',
    editable: 'C',
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
    'x-rules': ['dischargeDateEarlierDeathDate', 'dischargeDateLaterAdmissionDate'],
  },
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  insured,
  isTreatmentTypeIP,
}: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const dateTimeOfDeathValue = formUtils.queryValue(insured?.dateTimeOfDeath);
  const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');
  const fieldProps: any = fieldConfig['field-props'];
  const Rules = {
    dischargeDateEarlierDeathDate: Validator.dischargeDateEarlierDeathDate(dateTimeOfDeathValue),
    dischargeDateLaterAdmissionDate: Validator.dischargeDateLaterAdmissionDate(
      dateOfAdmissionValue
    ),
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
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          name={config?.name}
          partner="dateOfAdmission"
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const DateOfDischarge = ({
  field,
  config,
  form,
  editable,
  insured,
  isTreatmentTypeIP,
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
      isTreatmentTypeIP={isTreatmentTypeIP}
      insured={insured}
    />
  </Authority>
);

DateOfDischarge.displayName = 'DateOfDischarge';

export default DateOfDischarge;
