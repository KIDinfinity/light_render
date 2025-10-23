import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.basic',
  field: 'hospitalizationInstructionDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'HospitalizationInstructionDate',
    },
    visible: 'Y',
    editable: 'Y',
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
    'x-rules': ['fromIcuDateEarlierDischargeDate', 'fromIcuDateLaterAdmissionDate'],
  },
};

const FormItem = ({ isShow, layout, form, editable, isTreatmentTypeIP, field, config }: any) => {
  const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');
  const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
  const fieldProps: any = fieldConfig['field-props'];
  const Rules = {
    fromIcuDateEarlierDischargeDate: Validator.fromIcuDateEarlierDischargeDate(
      dateOfDischargeValue
    ),
    fromIcuDateLaterAdmissionDate: Validator.fromIcuDateLaterAdmissionDate(dateOfAdmissionValue),
  };
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !isTreatmentTypeIP
            : config?.editable === Editable.No)
        }
        required={config?.required === Required.Yes}
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

const HospitalizationInstructionDate = ({
  field,
  config,
  form,
  editable,
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
    />
  </Authority>
);

HospitalizationInstructionDate.displayName = 'HospitalizationInstructionDate';

export default HospitalizationInstructionDate;
