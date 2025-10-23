import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, FormItemInput, Required } from 'basic/components/Form';
import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.basic',
  field: 'medicalProviderDescription',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'MedicalProviderDescription',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const medicalProviderValue = form.getFieldValue('medicalProvider');
  const isOtherMedicalProvider = lodash.some(
    TreatmentListitemOfBasicInfoArray,
    (item) => item === medicalProviderValue
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        form={form}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={config?.required === Required.Yes}
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !isOtherMedicalProvider
            : config?.editable === Editable.No)
        }
      />
    </Col>
  );
};

const MedicalProviderDescription = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

MedicalProviderDescription.displayName = 'MedicalProviderDescription';

export default MedicalProviderDescription;
