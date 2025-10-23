import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemInput, Rule } from 'basic/components/Form';


const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Diagnosis',
  field: 'criticalIllnessName',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    expand: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'criticalIllness' }, operator: '!==', right: 1 },
      ],
    },
    required: 'N',
    // 'required-condition': {
    //   combine: '||',
    //   conditions: [
    //     { left: { domain: 'field', field: 'criticalIllness' }, operator: '===', right: 1 },
    //   ],
    // },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.critical-illness-name',
    },
    maxLength: 100,
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 12,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(
    fieldProps['editable-condition'],
    form,
    'opusClaimAssessment'
  );
  const requiredConditions = Rule(fieldProps['required-condition'], form, 'opusClaimAssessment');

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
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

const CriticalIllnessName = ({ field, config, isShow, layout, form, editable }: any) => (
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

CriticalIllnessName.displayName = 'CriticalIllnessName';

export default CriticalIllnessName;
