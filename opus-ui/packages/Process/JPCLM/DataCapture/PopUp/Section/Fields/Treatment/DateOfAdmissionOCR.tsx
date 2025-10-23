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

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUp.Treatment',
  field: 'dateOfAdmissionOCR',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: 'field', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'OCRDateOfAdmission',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-rules': [],
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
  const fieldProps: any = localFieldConfig['field-props'];

  const incidentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.incidentListMap[incidentId]
  );
  const dateTimeOfDeath = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.insured?.dateTimeOfDeath
  );
  const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
  const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);

  const visibleConditions = true;
  const editableConditions = !!isTreatmentTypeIP; //Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = isTreatmentTypeIP; //Rule(fieldProps['required-condition'], form, '');

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
        />
      </Col>
    )
  );
};

const DateOfAdmissionOCR = ({
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

DateOfAdmissionOCR.displayName = 'DateOfAdmissionOCR';

export default DateOfAdmissionOCR;
