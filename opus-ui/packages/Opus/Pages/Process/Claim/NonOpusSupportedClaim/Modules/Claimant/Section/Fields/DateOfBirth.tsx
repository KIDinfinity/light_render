import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemDatePicker,
  Rule,
} from 'basic/components/Form';
import { RuleByData } from 'basic/components/Form/Rule';
import useGetIsCorporatePolicy from '../../../../_models/functions/useGetIsCorporatePolicy';

const localFieldConfig = {
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_003',
  section: 'Claimant',
  field: 'dateOfBirth',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'relationshipWithInsured' },
          operator: '===',
          right: 'S',
        },
        {
          left: { domain: 'field', field: 'relationshipWithInsured' },
          operator: '===',
          right: 'O',
        },
      ],
    },
    dateFormat: 'L',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          combine: '&&',
          conditions: [
            {
              left: { domain: 'field', field: 'isCorporatePolicy' },
              operator: '===',
              right: 'N',
            },
            {
              left: { domain: 'field', field: 'relationshipWithInsured' },
              operator: 'in',
              right: ['B', 'AE', 'T'],
            },
          ],
        },
        {
          combine: '&&',
          conditions: [
            {
              left: { domain: 'field', field: 'isCorporatePolicy' },
              operator: '===',
              right: 'Y',
            },
            {
              left: { domain: 'field', field: 'relationshipWithInsured' },
              operator: '===',
              right: 'B',
            },
          ],
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
    },
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
  const isCorporatePolicy = useGetIsCorporatePolicy();

  const visibleConditions = true;
  const editableConditions = !Rule(
    fieldProps['editable-condition'],
    form,
    'opusNonOpusClaimManagement'
  );
  const requiredConditions = !RuleByData(fieldProps['required-condition'], {
    isCorporatePolicy,
    ...form.getFieldsValue(),
  });

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
          format={config.dateFormat || fieldProps.dateFormat}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
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

const DateOfBirth = ({ field, config, isShow, layout, form, editable }: any) => (
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
