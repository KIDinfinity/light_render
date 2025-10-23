import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Visible,
  FormItemSelect
} from 'basic/components/Form';
import { localFieldConfig } from './BankBranch.config';
import { PaymentMethod } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';
import { VLD_000001 } from 'claim/pages/validators/fieldValidators';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export { localFieldConfig } from './BankBranch.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, bankList, payoutAmount }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = form.getFieldValue('paymentMethod') === PaymentMethod.bankCount;
  const editableConditions = true;

  const dicts = bankList?.map(bank => ({
    dictCode: bank?.id,
    dictName: `${formUtils.queryValue(bank.bankName || bank.bankCode) || ''} ${formUtils.queryValue(bank.branchName || bank.branchCode) || ''}`
  }))

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
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={[
            {
              validator: VLD_000001(payoutAmount,formatMessageApi({ [config.label?.dictTypeCode || fieldProps.label.dictTypeCode]: config.label?.dictCode || fieldProps.label.dictCode })),
            },
          ]}
        />
      </Col>
    )
  );
};

const BankBranch = ({ field, config, isShow, layout, form, bankList, editable , payoutAmount}: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} bankList={bankList} payoutAmount={payoutAmount}/>
  </Authority>
);

BankBranch.displayName = localFieldConfig.field;

export default BankBranch;
