import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Editable, FormItemSelect, Required, Visible, Rule } from 'basic/components/Form';

import { localFieldConfig } from './ProductCodeAdd.config';
export { localFieldConfig } from './ProductCodeAdd.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const existCodes = form.getFieldValue('existCodes');

  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = lodash.isEmpty(existCodes);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={form.getFieldValue('dicts')}
          existCodes={existCodes}
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
            fieldProps.required === Required.Conditions
              ? requiredConditions
              : fieldProps.required === Required.Yes
          }
          optionShowType="value"
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
