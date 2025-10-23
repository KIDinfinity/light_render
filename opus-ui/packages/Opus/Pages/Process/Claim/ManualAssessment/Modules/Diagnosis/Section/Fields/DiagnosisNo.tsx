import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required } from 'basic/components/Form';
import { VLD_001175 } from 'claim/pages/validators/fieldValidators';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Diagnosis',
  field: 'diagnosisNo',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'DiagnosisNo',
    },
    maxLength: 100,
    required: 'N',
    visible: 'Y',
    'x-rules': ['VLD_001175'],
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const isCINameEditable = false;
  const isCINameRequired = false;

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? isCINameEditable
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        maxLength={config?.maxLength || fieldProps.maxLength}
        required={
          config.required === Required.Conditions ||
          localFieldConfig['field-props'].required === Required.Conditions
            ? isCINameRequired
            : (config.required || fieldProps.required) === Required.Yes
        }
        rules={[
          {
            validator: VLD_001175(),
          },
        ]}
      />
    </Col>
  );
};

const DiagnosisNo = ({ field, config, form, editable, layout, isShow }: any) => (
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

DiagnosisNo.displayName = 'DiagnosisNo';

export default DiagnosisNo;
