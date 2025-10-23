import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useExistUsdpayoutidByCoreCode from 'process/NB/ManualUnderwriting/_hooks/useExistUsdpayoutidByCoreCode';
import { fieldConfig } from './BankAccountNo.config';

export { fieldConfig } from './BankAccountNo.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useExistUsdpayoutidByCoreCode();

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
              ? editableConditions
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const BankAccountNo = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={config?.field}
      config={lodash.get(config, 'field-props')}
    />
  </Authority>
);

BankAccountNo.displayName = 'bankAcctNo';

export default BankAccountNo;
