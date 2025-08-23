import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { useSelector } from 'dva';

import { localFieldConfig } from './BankAccountNo.config';
import lodash from 'lodash';
export { localFieldConfig } from './BankAccountNo.config';
import { VLD_000333 } from '../../../../Validators/VLD_000333.ts';

export const FormItem = ({ isShow, layout, form, editable, field, config, labelType }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const payeeList =
    useSelector(({ paymentAllocation }: any) => paymentAllocation?.claimData?.payeeList) || [];
  const CurrentId =
    useSelector(({ paymentAllocation }: any) => paymentAllocation?.activePayeeId) || '';
  const CurrentPayee = lodash.filter(payeeList, (item) => item.id == CurrentId);

  const validators = editable ? { validator: VLD_000333(payeeList, CurrentPayee) } : {};
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
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={labelType || ''}
          rules={[validators]}
        />
      </Col>
    )
  );
};

const BankAccountNo = ({ field, config, isShow, layout, form, editable, labelType }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      labelType={labelType}
    />
  </Authority>
);

BankAccountNo.displayName = localFieldConfig.field;

export default BankAccountNo;
