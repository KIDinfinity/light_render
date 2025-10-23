import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, Visible, FormItemInput, Rule, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'bankName',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BankName',
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'bankType',
          },
          operator: '===',
          right: 'BANK',
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
            field: 'bankType',
          },
          operator: '===',
          right: 'BANK',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, bankCodeCache }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const paymentMethod = form.getFieldValue('paymentMethod');
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? !!visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          maxLength={config?.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const BankName = ({ field, config, form, editable, layout, isShow, ...res }: any) => (
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

BankName.displayName = 'BankName';

export default BankName;
