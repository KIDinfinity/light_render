import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Validator,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';

export const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'OtherProcedure.Payable',
  field: 'radioTherapyReasonDate1',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'RadioTherapyReasonDate1',
    },
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'benefitCategory' }, operator: '!==', right: 'CIC' },
      ],
    },
    editable: 'Y',
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
    'x-rules': ['VLD_000700'],
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = {
    VLD_000700: Validator.VLD_000700({
      radioDateList: form.getFieldValue('radioDateList'),
      claimDecision: form.getFieldValue('claimDecision'),
    }),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules']).map((rule: any) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const RadioTherapyReasonDate1 = ({ field, config, form, editable, layout, isShow }: any) => (
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

RadioTherapyReasonDate1.displayName = 'RadioTherapyReasonDate1';

export default RadioTherapyReasonDate1;
