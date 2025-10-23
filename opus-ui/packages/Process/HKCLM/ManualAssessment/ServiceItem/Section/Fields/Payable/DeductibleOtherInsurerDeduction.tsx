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

import { localFieldConfig } from './DeductibleOtherInsurerDeduction.config';

export { localFieldConfig } from './DeductibleOtherInsurerDeduction.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, onRecover }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          recoverValue={form.getFieldValue('systemDeductibleOtherInsurerDeduction')}
          OnRecover={onRecover}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const DeductibleOtherInsurerDeduction = ({ field, config, isShow, layout, form, editable, onRecover }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      onRecover={onRecover}
    />
  </Authority>
);

DeductibleOtherInsurerDeduction.displayName = 'DeductibleOtherInsurerDeduction';

export default DeductibleOtherInsurerDeduction;
