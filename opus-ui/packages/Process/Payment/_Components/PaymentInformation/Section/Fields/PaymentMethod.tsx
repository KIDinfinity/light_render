import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Visible,
  FormItemSelect
} from 'basic/components/Form';
import { localFieldConfig } from './PaymentMethod.config';
import { PaymentMethod } from 'claim/pages/Enum';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { VLD_000001 } from 'claim/pages/validators/fieldValidators';

export { localFieldConfig } from './PaymentMethod.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, payoutAmount}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = true;
  const dicts = getDrowDownList('Dropdown_CLM_PaymentMethod')?.filter(option => option.dictCode === PaymentMethod.bankCount || option.dictCode === PaymentMethod.ByCheckInPayee);

  const labelId = config.label?.dictCode || fieldProps.label.dictCode
  const labelTypeCode = config.label?.dictTypeCode || fieldProps.label.dictTypeCode

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
          labelId={labelId}
          labelTypeCode={labelTypeCode}
          rules={[
            {
              validator: VLD_000001(payoutAmount, formatMessageApi({ [labelTypeCode]: labelId })),
            },
          ]}
        />
      </Col>
    )
  );
};

const PaymentMethodField = ({ field, config, isShow, layout, form, editable,payoutAmount }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} payoutAmount={payoutAmount}/>
  </Authority>
);

PaymentMethodField.displayName = localFieldConfig.field;

export default PaymentMethodField;
