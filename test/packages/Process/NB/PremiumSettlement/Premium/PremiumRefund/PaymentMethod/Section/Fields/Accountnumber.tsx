import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Visible, Rule } from 'basic/components/Form';
import useHandleGetBankInfoRequired from 'process/NB/PremiumSettlement/_hooks/useHandleGetBankInfoRequired';
import { fieldConfig } from './Accountnumber.config';

export { fieldConfig } from './Accountnumber.config';

const FormItem = ({ isShow, layout, form, editable, field, config, required }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = useHandleGetBankInfoRequired();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          required={requiredConditions && required}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Accountnumber = ({ field, config, form, editable, layout, isShow, required }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      required={required}
    />
  </Authority>
);

Accountnumber.displayName = 'bankAcctNo';

export default Accountnumber;
