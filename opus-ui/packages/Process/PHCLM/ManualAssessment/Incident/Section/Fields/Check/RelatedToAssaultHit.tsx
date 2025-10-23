import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './RelatedToAssaultHit.config';

export { localFieldConfig } from './RelatedToAssaultHit.config';

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
