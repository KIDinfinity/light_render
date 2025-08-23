import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  Visible,
  Validator,
  FormItemInput,
  Rule,
  Required,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'passbookCode',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: 'POST',
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
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'PostbankID',
    },
    maxLength: 5,
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
          right: 'POST',
        },
        {
          left: {
            domain: 'field',
            field: 'BankType',
          },
          operator: '===',
          right: 'POST',
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
          right: 'POST',
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
        order: 17,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
    'x-rules': ['VLD_000592', 'VLD_000593'],
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  let visible = Rule(fieldProps['visible-condition'], form, 'JPCLMOfDataCapture');
  const isPaymentMethodPremiumAccount = Rule(
    fieldProps['editable-condition'],
    form,
    'JPCLMOfDataCapture'
  );
  const paymentMethod = form.getFieldValue('paymentMethod');
  const bankCode = form.getFieldValue('bankCode');
  visible = visible || (paymentMethod === 'PREM' && bankCode === '9900');
  const isRequired = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');
  const isPrem = paymentMethod === 'PREM';
  const Rules = {
    VLD_000592: Validator.VLD_000592(isPrem),
    VLD_000593: Validator.VLD_000593(
      config?.maxLength || localFieldConfig['field-props'].maxLength,
      isPrem
    ),
  };

  return (config?.visible === Visible.Conditions ? visible : config?.visible === Visible.Yes) ? (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !isPaymentMethodPremiumAccount
            : config?.editable === Editable.Yes)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        maxLength={config?.maxLength || localFieldConfig['field-props'].maxLength}
        required={
          config.required === Required.Conditions ||
          localFieldConfig['field-props'].required === Required.Conditions
            ? isRequired
            : (config.required || fieldProps.required) === Required.Yes
        }
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
      />
    </Col>
  ) : null;
};

const PassbookCode = ({ field, config, form, editable, layout, isShow, ...res }: any) => (
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

PassbookCode.displayName = 'PassbookCode';

export default PassbookCode;
