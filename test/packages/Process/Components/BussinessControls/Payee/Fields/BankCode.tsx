import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Visible,
  FormItemSelectPlus,
  Rule,
  Required,
} from 'basic/components/Form';
import BankCodeHook from '../_hooks/BankCodeHook';
import { localFieldConfig } from './BankCode.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const extraProps = BankCodeHook({ NAMESPACE, form });

  const visibleConditions = Rule(fieldProps?.['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps?.['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps?.['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
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
          optionShowType="both"
          required={
            config.required === Required.Conditions || fieldProps.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          {...extraProps}
        />
      </Col>
    )
  );
};

const BankCode = ({ field, config, form, editable, layout, isShow, id, NAMESPACE }: any) => (
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

BankCode.displayName = localFieldConfig.field;

export default BankCode;
