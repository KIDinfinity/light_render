import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemCurrency,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ConfigExpense } from '../../_hooks';
import { localFieldConfig } from './Expense.config';

export { localFieldConfig } from './Expense.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  NAMESPACE,
  namespaceType,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { Rules, extraConfig } = ConfigExpense({ NAMESPACE, namespaceType, invoiceId: id });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCurrency
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          suffixEditable
          hiddenPrefix
          labelType={config.label?.type || fieldProps.label.type}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const Expense = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  id,
  NAMESPACE,
  namespaceType,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
      namespaceType={namespaceType}
    />
  </Authority>
);

Expense.displayName = localFieldConfig.field;

export default Expense;
