import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  Visible,
  Validator,
  FormItemInput,
  Rule,
  Required,
} from 'basic/components/Form';
import BankAccountNoHook from '../_hooks/BankAccountNoHook';
import { localFieldConfig } from './BankAccountNo.config';
import { Region, tenant } from '@/components/Tenant';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const paymentMethod = form.getFieldValue('paymentMethod');
  const isPrem = paymentMethod === 'PREM';
  const Rules = {
    VLD_000592: Validator.VLD_000592(isPrem),
    VLD_000593: Validator.VLD_000593(config?.maxLength || fieldProps.maxLength, isPrem),
    VLD_000002: tenant.region({
      [Region.TH]: Validator.VLD_000002(10, 15),
      [Region.HK]: Validator.VLD_000002(6, 9),
    }),
  };

  const extraProps = BankAccountNoHook();

  const visibleConditions = Rule(fieldProps?.['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps?.['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps?.['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            (config.editable === Editable.Conditions
              ? !editableConditions
              : config.editable === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            config.required === Required.Conditions || fieldProps.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          {...extraProps}
        />
      </Col>
    )
  );
};

const BankAccountNo = ({ field, config, form, editable, layout, isShow, id, NAMESPACE }: any) => (
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

BankAccountNo.displayName = localFieldConfig.field;

export default BankAccountNo;
