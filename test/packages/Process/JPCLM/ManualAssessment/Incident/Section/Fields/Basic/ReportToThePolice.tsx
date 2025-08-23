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
import { useSelector } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Basic',
  field: 'reportToThePolice',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    expand: 'N',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'trafficAccidentFlag' },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ReportToThePolice',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_Indicator' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
    },

    'no-treatment-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 20,
      },
    },
    'no-invoice-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 20,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 20,
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
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

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
        />
      </Col>
    )
  );
};

const ReportToThePolice = ({ field, config, isShow, layout, form, editable }: any) => (
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

ReportToThePolice.displayName = 'ReportToThePolice';

export default ReportToThePolice;
