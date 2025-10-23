import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Payable.OPTreatmentPayable',
  field: 'payableDays',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'claimDecision' },
          operator: '!==',
          right: 'D',
        },
      ],
    },
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.payable-days',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const dicts = [
    {
      dictCode: 1,
      dictName: '1',
    },
    {
      dictCode: 0,
      dictName: '0',
    },
  ];

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            (config.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
          labelTypeCode={
            config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          placeholder=""
          labelType="inline"
        />
      </Col>
    )
  );
};

const PayableDays = ({ field, config, isShow, layout, form, editable }: any) => (
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

PayableDays.displayName = localFieldConfig.field;

export default PayableDays;
