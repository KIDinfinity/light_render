import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'JPADMED',
  field: 'medicalProviderExpireDate',
  'field-props': {
    dateFormat: 'L',
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'advancedMedical.medicalProvider.exprirationDate',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        format={config.dateFormat || fieldProps.dateFormat}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
      />
    </Col>
  );
};

const MedicalProviderExpireDate = ({ field, config, form, editable, layout, isShow }: any) => (
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

MedicalProviderExpireDate.displayName = 'MedicalProviderExpireDate';

export default MedicalProviderExpireDate;
