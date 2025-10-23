import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Rule,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';

import { getDrowDownList } from '@/utils/dictFormatMessage';

import { localFieldConfig } from './PaymentMethod.config';

export { localFieldConfig } from './PaymentMethod.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={form.getFieldValue('idx') === 0 ? '' : 'inline'}
        />
      </Col>
    )
  );
};

const PaymentMethod = ({ field, config, isShow, layout, form, editable }: any) => (
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

PaymentMethod.displayName = localFieldConfig.field;

export default PaymentMethod;
