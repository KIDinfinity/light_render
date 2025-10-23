import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';

import {
  Authority,
  Editable,
  Visible,
  Validator,
  FormItemInput,
  Rule,
  Required,
  formUtils,
} from 'basic/components/Form';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'paymentAllocation.bankAccount',
  field: 'passbookCode',
  'field-props': {
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
          right: 'POST',
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
            field: 'bankType',
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
            field: 'bankType',
          },
          operator: '===',
          right: 'POST',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 25,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 25,
      },
    },
    'x-rules': ['VLD_000592', 'VLD_000593'],
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, payeeId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const { payeeList } = useSelector(({ [NAMESPACE]: modelnamespace }: any) => ({
    payeeList: modelnamespace?.paymentModal?.datas?.payeeList,
  }));
  const paymentMethod = formUtils.queryValue(
    lodash.find(payeeList, { id: payeeId })?.paymentMethod
  );
  const bankCode = form.getFieldValue('bankCode');

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const isPrem = paymentMethod === 'PREM';
  const Rules = {
    VLD_000592: Validator.VLD_000592(isPrem),
    VLD_000593: Validator.VLD_000593(
      config?.maxLength || localFieldConfig['field-props'].maxLength,
      isPrem
    ),
  };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
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
