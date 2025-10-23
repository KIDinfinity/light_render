import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './BoosterDays.config';

export { localFieldConfig } from './BoosterDays.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  boosterEditable,
  originDays,
  OnRecover,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !boosterEditable
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
          labelType="inline"
          placeholder
          precision={0}
          recoverValue={originDays || 0}
          OnRecover={OnRecover}
          onHover={true}
          max={config?.max || fieldProps.max}
          min={config?.min || fieldProps.min}
        />
      </Col>
    )
  );
};

const BoosterDays = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  boosterEditable,
  originDays,
  OnRecover,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      boosterEditable={boosterEditable}
      originDays={originDays}
      OnRecover={OnRecover}
    />
  </Authority>
);

BoosterDays.displayName = 'boosterDays';

export default BoosterDays;
