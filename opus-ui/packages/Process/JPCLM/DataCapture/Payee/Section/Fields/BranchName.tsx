import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, Visible, FormItemInput, Rule, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'branchName',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BranchName',
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: '01',
        },
      ],
    },
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: '01',
        },
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: 'T',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 16,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, bankCodeCache }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  let visible = Rule(fieldProps['visible-condition'], form, 'JPCLMOfDataCapture');
  const isRequired = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');
  const paymentMethod = form.getFieldValue('paymentMethod');
  const bankCode = form.getFieldValue('bankCode');
  visible = visible || (paymentMethod === 'PREM' && bankCodeCache && bankCodeCache !== '9900');

  return (config?.visible === Visible.Conditions ? visible : config?.visible === Visible.Yes) ? (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={config.editable === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
        required={
          config.required === Required.Conditions ||
          localFieldConfig['field-props'].required === Required.Conditions
            ? isRequired
            : (config.required || fieldProps.required) === Required.Yes
        }
      />
    </Col>
  ) : null;
};

const BranchName = ({ field, config, form, editable, layout, isShow, ...res }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      {...res}
    />
  </Authority>
);

BranchName.displayName = 'BranchName';

export default BranchName;
