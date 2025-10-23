import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
} from 'basic/components/Form';

const localFieldConfig = {
  section: 'Incident.Check',
  field: 'assaultRelatedFlag',
  'field-props': {
    visible: 'N',
    editable: 'Y',
    required: 'N',
    expand: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'RelatedToAssaultHit',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 24,
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
              ? false
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

const RelatedToAssaultHit = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

RelatedToAssaultHit.displayName = localFieldConfig.field;

export default RelatedToAssaultHit;
