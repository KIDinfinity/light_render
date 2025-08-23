import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';

import { useSelector } from 'dva';


const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Diagnosis',
  field: 'existingCancerDiagnosis',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'existingCancerDiagnosis',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_Indicator' },
    'x-layout': {
      //  TODO: 动态layout
      // 880px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 12,

        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },

    'treatment-no-invoice-layout': {
      // 880px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
    'no-treatment-layout': {
      // 880px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          form={form}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          dicts={dicts}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          name={config?.name}
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

const ExistingCancerDiagnosis = ({ field, config, isShow, layout, form, editable }: any) => (
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

ExistingCancerDiagnosis.displayName = localFieldConfig.field;

export default ExistingCancerDiagnosis;
