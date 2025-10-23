import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemCheckbox, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'diagnosis',
  field: 'criticalIllness',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.critical-illness-indicator',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'treatment-no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemCheckbox
        disabled={(config?.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
      />
    </Col>
  );
};

const CriticalIllness = ({ field, config, form, editable, layout, isShow }: any) => (
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

CriticalIllness.displayName = 'CriticalIllness';

export default CriticalIllness;
