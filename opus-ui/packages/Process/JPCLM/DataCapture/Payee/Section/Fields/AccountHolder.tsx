import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Rule,
  Required,
  Validator,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'accountHolder',
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
          right: 'PREM',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'Accountholder',
    },
    maxLength: 60,
    required: 'Y',
    // 'required-condition': {
    //   combine: '||',
    //   conditions: [
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'paymentMethod',
    //       },
    //       operator: '===',
    //       right: '01',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'paymentMethod',
    //       },
    //       operator: '===',
    //       right: 'POST',
    //     },
    //   ],
    // },
    visible: 'Y',
    'x-rules': ['accountHolderTextValidate'],
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const isRequired = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');
  const isPaymentMethodPremiumAccount = Rule(
    fieldProps['editable-condition'],
    form,
    'JPCLMOfDataCapture'
  );
  const accountHolder = form.getFieldValue('accountHolder');

  const Rules = {
    accountHolderTextValidate: Validator.VLD_000558(),
  };

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? isPaymentMethodPremiumAccount && accountHolder
            : config?.editable === Editable.Yes)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
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
  );
};

const AccountHolder = ({ field, config, form, editable, layout, isShow }: any) => (
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

AccountHolder.displayName = 'AccountHolder';

export default AccountHolder;
