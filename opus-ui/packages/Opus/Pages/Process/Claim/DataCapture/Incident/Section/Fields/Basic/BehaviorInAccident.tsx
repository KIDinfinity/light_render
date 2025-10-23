import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible, Rule } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Incident.Basic',
  field: 'behaviorInAccident',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BehaviorInAccident',
    },
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'causeOfIncident' },
          operator: '===',
          right: 'A',
        },
      ],
    },
    required: 'N',
    'x-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_BehaviorInAccident',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode || fieldConfig?.['field-props']?.['x-dict']?.dictTypeCode)
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');


  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
        <Col {...layout}>
          <FormItemSelect
            form={form}
            disabled={!editable || config?.editable === Editable.No}
            required={config?.required === Required.Yes}
            dicts={dicts}
            formName={field || fieldConfig.field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            name={config?.name}
          />
        </Col>
      )
  );
};

const BehaviorInAccident = ({ field, config, form, editable, layout, isShow }: any) => (
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

BehaviorInAccident.displayName = 'BehaviorInAccident';

export default BehaviorInAccident;
