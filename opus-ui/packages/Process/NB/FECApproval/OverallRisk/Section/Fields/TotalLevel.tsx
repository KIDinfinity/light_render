import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemText, Visible } from 'basic/components/Form';
import { localFieldConfig } from './TotalLevel.config';

export { localFieldConfig } from './TotalLevel.config';

export const FormItem = ({ isShow, layout, form, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemText
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        />
      </Col>
    )
  );
};

const TotalLevel = ({ field, config, isShow, layout, form, editable }: any) => (
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

TotalLevel.displayName = localFieldConfig.field;

export default TotalLevel;
