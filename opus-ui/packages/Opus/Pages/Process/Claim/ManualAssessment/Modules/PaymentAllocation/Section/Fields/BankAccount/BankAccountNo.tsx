import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Validator,
  Visible,
  formUtils,
  Rule,
} from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation.bankAccount',
  field: 'bankAccountNo',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BankAccountNo',
    },
    editable: 'C',
    'editable-condition': {
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
    'x-rules': ['VLD_000592', 'VLD_000593'],
    maxLength: 7,
    'x-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 24,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config, paymentMethod }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const isPrem = formUtils.queryValue(paymentMethod) === 'PREM';
  const Rules = {
    VLD_000592: Validator.VLD_000592(isPrem),
    VLD_000593: Validator.VLD_000593(config?.maxLength || fieldProps.maxLength, isPrem),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          form={form}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          maxLength={config?.maxLength || fieldProps.maxLength}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          name={config?.name}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const BankAccountNo = ({ field, config, form, editable, layout, isShow, paymentMethod }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      paymentMethod={paymentMethod}
    />
  </Authority>
);

BankAccountNo.displayName = 'bankAccountNo';

export default BankAccountNo;
