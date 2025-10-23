import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, Required, FormItemInput, Rule, Visible } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Claimant',
  field: 'firstName',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'relationshipWithInsured',
          },
          operator: '===',
          right: 'S',
        },
        {
          left: {
            domain: 'field',
            field: 'relationshipWithInsured',
          },
          operator: '===',
          right: 'O',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.first-name',
    },
    maxLength: 30,
    required: 'Y',
    // 'required-condition': {
    //   combine: '||',
    //   conditions: [
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'B',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'T',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'A',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'AE',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'BA',
    //     },
    //   ],
    // },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions =!Rule(fieldProps['editable-condition'], form, 'opusClaimDataCapture');
  const requiredConditions = true;

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
        />
      </Col>
    )
  );
};

const FirstName = ({ field, config, form, editable, layout, isShow }: any) => (
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

FirstName.displayName = 'FirstName';

export default FirstName;
