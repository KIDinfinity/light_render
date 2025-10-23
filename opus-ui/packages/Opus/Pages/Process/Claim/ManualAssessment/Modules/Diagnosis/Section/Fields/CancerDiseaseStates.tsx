import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const localFieldConfig = {
  section: 'Diagnosis',
  field: 'cancerDiseaseStates',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'cancerDiseaseStates',
    },
    required: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_cancerStates',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        dicts={dicts}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
        // existCodes={existCodes}
      />
    </Col>
  );
};

const CancerDiseaseStates = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  incidentId,
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
    />
  </Authority>
);

CancerDiseaseStates.displayName = 'CancerDiseaseStates';

export default CancerDiseaseStates;
