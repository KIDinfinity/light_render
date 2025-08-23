import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, Visible, FormItemInput, Rule } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'address',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.address',
    },
    maxLength: 240,
    required: false,
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'firstName',
          },
          operator: '===',
          right: {
            domain: 'activity',
            dataPath: 'claimProcessData.claimant.firstName',
          },
        },
        {
          left: {
            domain: 'field',
            field: 'surname',
          },
          operator: '===',
          right: {
            domain: 'activity',
            dataPath: 'claimProcessData.claimant.surname',
          },
        },
      ],
    },
    expand: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const isEditable = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');
  const isVisible = Rule(fieldProps['visible-condition'], form, 'JPCLMOfDataCapture');

  return (
    (config?.visible === Visible.Conditions ? !isVisible : config?.visible === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemInput
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? isEditable
              : config?.editable === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
          labelTypeCode={
            config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
          }
          maxLength={config?.maxLength || localFieldConfig['field-props'].maxLength}
          required={config.required || localFieldConfig['field-props'].required}
        />
      </Col>
    )
  );
};

const Address = ({ field, config, form, editable, layout, isShow }: any) => (
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

Address.displayName = 'Address';

export default Address;
