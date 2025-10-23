import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';

const localFieldConfig = {
  section: 'Incident.Check',
  field: 'isDrinking',
  'field-props': {
    visible: 'N',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'trafficAccidentFlag' },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'RelatedToAlcohol',
    },
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
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 24,
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

  const editableConditions = Rule(fieldProps['editable-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? true
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCheckbox
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
            (config.required || fieldProps.required) === Required.Conditions
              ? true
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          valueType="letter"
        />
      </Col>
    )
  );
};

const RelatedToAlcohol = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

RelatedToAlcohol.displayName = localFieldConfig.field;

export default RelatedToAlcohol;
