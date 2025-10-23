import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'diagnosis',
  field: 'diagnosisDescription',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'DiagnosisDescription',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
      />
    </Col>
  );
};

const DiagnosisDescription = ({ field, config, form, editable, layout, isShow }: any) => (
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

DiagnosisDescription.displayName = 'DiagnosisDescription';

export default DiagnosisDescription;
