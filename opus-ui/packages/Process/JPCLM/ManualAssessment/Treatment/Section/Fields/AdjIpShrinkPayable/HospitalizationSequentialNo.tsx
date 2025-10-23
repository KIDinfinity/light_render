import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.AdjIpShrinkPayable',
  field: 'hospitalizationSequentialNo',
  'field-props': {
    // TODO：需要国际化
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: '変更前入院通算No.',
    },
    editable: 'N',
    expand: 'Y',
    required: 'N',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'payableDays' }, operator: '!==', right: '0' },
      ],
    },
    visible: 'Y',
    maxLength: 9,
    'x-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'treatment-no-invoice-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};
export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = false;

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
          formName={field || localFieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          name={config?.name}
          maxLength={config?.maxLength}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const HospitalizationSequentialNo = ({ field, config, form, editable, layout, isShow }: any) => (
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

HospitalizationSequentialNo.displayName = localFieldConfig.field;

export default HospitalizationSequentialNo;
