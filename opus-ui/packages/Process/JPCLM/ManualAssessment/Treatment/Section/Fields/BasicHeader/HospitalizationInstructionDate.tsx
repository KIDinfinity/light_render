import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Validator,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';

export const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Basic.Header',
  field: 'hospitalizationInstructionDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'HospitalizationInstructionDate',
    },
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'treatmentType' }, operator: '===', right: 'IP' },
      ],
    },
    editable: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': ['fromIcuDateEarlierDischargeDate', 'fromIcuDateLaterAdmissionDate'],
  },
};

const FormItem = ({ isShow, layout, form, editable, isTreatmentTypeIP, field, config }: any) => {
  const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');
  const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
  const fieldProps: any = localFieldConfig['field-props'];
  const Rules = {
    fromIcuDateEarlierDischargeDate: Validator.fromIcuDateEarlierDischargeDate(
      dateOfDischargeValue
    ),
    fromIcuDateLaterAdmissionDate: Validator.fromIcuDateLaterAdmissionDate(dateOfAdmissionValue),
  };

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          form={form}
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !isTreatmentTypeIP
              : config?.editable === Editable.No)
          }
          required={config?.required === Required.Yes}
          formName={field || localFieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          name={config?.name}
        />
      </Col>
    )
  );
};

const HospitalizationInstructionDate = ({ field, config,
  form,
  editable,
  isTreatmentTypeIP,
  layout,
  isShow,
}: any) => (
  <Authority>

    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isTreatmentTypeIP={isTreatmentTypeIP}
    />
  </Authority>
);

HospitalizationInstructionDate.displayName = 'HospitalizationInstructionDate';

export default HospitalizationInstructionDate;
