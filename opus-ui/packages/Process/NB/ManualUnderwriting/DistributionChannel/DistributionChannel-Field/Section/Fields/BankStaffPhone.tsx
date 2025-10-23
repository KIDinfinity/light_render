import { Col } from 'antd';
import { Editable, FormItemNumber, RuleByForm, Visible } from 'basic/components/Form';
import React from 'react';
import { fieldConfig } from './BankStaffPhone.config';

export { fieldConfig };

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}

const BankStaffPhone = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = false;
  const requiredConditions = false;

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
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredConditions}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

BankStaffPhone.displayName = 'bankStaffPhone';

export default BankStaffPhone;
