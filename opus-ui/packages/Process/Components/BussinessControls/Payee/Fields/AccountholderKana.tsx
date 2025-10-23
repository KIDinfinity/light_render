import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Rule,
  Visible,
  Required,
} from 'basic/components/Form';
import { localFieldConfig } from './AccountholderKana.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps?.['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps?.['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps?.['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.Yes)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            config.required === Required.Conditions || fieldProps.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const AccountholderKana = ({ field, config, form, editable, layout, isShow, id, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

AccountholderKana.displayName = localFieldConfig.field;

export default AccountholderKana;
