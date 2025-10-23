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
  field: 'icuFromDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.form-date',
    },
    visible: 'Y',
    editable: 'C',
    required: 'C',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'x-rules': ['fromIcuDateEarlierDischargeDate', 'fromIcuDateLaterAdmissionDate'],
  },
};

const FormItem = ({ isShow, layout, form, editable, isTreatmentTypeIP, field, config }: any) => {
  const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');
  const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
  const isIcu = form.getFieldValue('icu') === 1;
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
        required={
          config?.required === Required.Conditions ? isIcu : config?.required === Required.Yes
        }
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
        name={config?.name}
        partner="icuToDate"
      />
    </Col>
  );
};

const ICUFromDate = ({ field, config, form, editable, isTreatmentTypeIP, layout, isShow }: any) => (
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

ICUFromDate.displayName = 'ICUFromDate';

export default ICUFromDate;
