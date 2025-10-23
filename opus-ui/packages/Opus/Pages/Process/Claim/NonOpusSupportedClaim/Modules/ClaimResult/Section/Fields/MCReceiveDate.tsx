import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required, Visible } from 'basic/components/Form';

import { localFieldConfig } from './MCReceiveDate.config';

export { localFieldConfig } from './MCReceiveDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const requiredConditions = false;
  const editableConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          form={form}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : config?.required === Required.Yes
          }
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.No)
          }
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          formName={field || fieldProps.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          allowFreeSelect
        />
      </Col>
    )
  );
};

const MCReceiveDate = ({ field, config, form, editable, insured, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      insured={insured}
    />
  </Authority>
);

MCReceiveDate.displayName = 'firstMcReceiveDate';

export default MCReceiveDate;
