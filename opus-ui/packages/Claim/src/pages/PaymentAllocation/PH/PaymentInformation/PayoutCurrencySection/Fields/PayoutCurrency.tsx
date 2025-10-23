import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Required,
  Visible,
  FormItemSelect
} from 'basic/components/Form';
import { localFieldConfig } from './PayoutCurrency.config';
import { PaymentMethod } from 'claim/pages/Enum';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import styles from './field.less'

export { localFieldConfig } from './PayoutCurrency.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, bankList }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = form.getFieldValue('paymentMethod') === PaymentMethod.bankCount;
  const editableConditions = true;
  const requiredConditions = true;

  const dicts = getDrowDownList('Dropdown_CFG_Currency');

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
          className={styles.field}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const BankBranch = ({ field, config, isShow, layout, form, bankList, editable }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} bankList={bankList} />
  </Authority>
);

BankBranch.displayName = localFieldConfig.field;

export default BankBranch;
