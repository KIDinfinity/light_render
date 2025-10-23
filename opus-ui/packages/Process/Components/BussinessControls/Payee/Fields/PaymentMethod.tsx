import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Validator,
  Rule,
  Visible,
  Required,
} from 'basic/components/Form';
import PaymentMethodHook from '../_hooks/PaymentMethodHook';
import { localFieldConfig } from './PaymentMethod.config';

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config = {},
  payeeId,
  NAMESPACE,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps?.['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps?.['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps?.['required-condition'], form, '');

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict']?.dictTypeCode
      ]
  );

  const extraProps = PaymentMethodHook({ NAMESPACE, payeeId });

  const payee = useSelector(
    (state: any) => state?.[NAMESPACE]?.claimEntities?.payeeListMap?.[payeeId]
  );
  const insured = useSelector((state: any) => state?.[NAMESPACE]?.claimProcessData?.insured);
  const { firstName: payeeFirstName, surname: payeeLastName } = payee || {};
  const { firstName: insuredFirstName, surname: insuredLastName } = insured || {};

  const premiumPaymentMethod = lodash.get(payee, 'payeeContactList[0].premiumPaymentMethod');

  const Rules = {
    VLD_000604: Validator.VLD_000604(premiumPaymentMethod),
    VLD_000676: Validator.VLD_000676({
      payeeFirstName,
      payeeLastName,
      insuredLastName,
      insuredFirstName,
    }),
    VLD_000612: Validator.VLD_000612(form),
  };
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
            (config?.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.Yes)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
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

const PaymentMethod = ({ field, config,
  form,
  editable,
  layout,
  isShow,
  payeeId,
  insured,
  id,
  NAMESPACE,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} insured={insured}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      payeeId={payeeId}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

PaymentMethod.displayName = localFieldConfig.field;

export default PaymentMethod;
