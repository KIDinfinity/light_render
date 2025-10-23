import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Rule,
  Visible,
  Required,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Claimant',
  field: 'dateOfBirth',
  'field-props': {
    dateFormat: 'L',
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
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          combine: '&&',
          conditions: [
            {
              left: {
                domain: 'activity',
                dataPath: 'claimProcessData.owner.gender',
              },
              operator: '!==',
              right: 'C',
            },
            {
              left: {
                domain: 'field',
                field: 'relationshipWithInsured',
              },
              operator: 'in',
              right: ['B', 'AE', 'T'],
            },
          ],
        },
        {
          combine: '&&',
          conditions: [
            {
              left: {
                domain: 'activity',
                dataPath: 'claimProcessData.owner.gender',
              },
              operator: '===',
              right: 'C',
            },
            {
              left: {
                domain: 'field',
                field: 'relationshipWithInsured',
              },
              operator: 'in',
              right: ['B'],
            },
          ],
        },
      ],
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, 'opusClaimDataCapture');
  const requiredConditions = !Rule(fieldProps['required-condition'], form, 'opusClaimDataCapture');

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
          format={localFieldConfig['field-props'].dateFormat}
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

const DateOfBirth = ({ field, config, form, editable, layout, isShow }: any) => (
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

DateOfBirth.displayName = 'DateOfBirth';

export default DateOfBirth;
