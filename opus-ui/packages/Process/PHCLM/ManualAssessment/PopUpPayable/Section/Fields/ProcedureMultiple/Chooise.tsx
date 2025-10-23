import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './Chooise.config';

export { localFieldConfig } from './Chooise.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, ProcedureId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
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
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
        />
      </Col>
    )
  );
};

const Chooise = ({ field, config, isShow, layout, form, editable, ProcedureId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      ProcedureId={ProcedureId}
    />
  </Authority>
);

Chooise.displayName = localFieldConfig.field;

export default Chooise;
