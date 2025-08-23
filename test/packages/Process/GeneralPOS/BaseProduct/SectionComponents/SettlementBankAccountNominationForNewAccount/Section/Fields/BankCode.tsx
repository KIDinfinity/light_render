import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './BankCode.config';

export { localFieldConfig } from './BankCode.config';
import { NAMESPACE } from '../../../../activity.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  bankNewAdd,
  isInline = true,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const allBank = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allBank);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') || bankNewAdd;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} id="SettlementBankAccountSectionBankCode">
        <FormItemSelect
          getPopupContainer={() => document.getElementsByClassName('POSContainer')[0]}
          dicts={allBank}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          isInline={isInline}
          allowClear={false}
        />
      </Col>
    )
  );
};

const BankCode = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  bankNewAdd,
  isInline,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      bankNewAdd={bankNewAdd}
      isInline={isInline}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

BankCode.displayName = localFieldConfig.field;

export default BankCode;
