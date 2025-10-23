import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required } from 'basic/components/Form';

export const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Basic.Expand',
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
  },
};

const FormItem = ({ isShow, layout, form, editable, isTreatmentTypeIP, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
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
        formName={field || localFieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
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
