import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from './Section';

const Withdrawal = ({ form, showOnly = false }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      editable={editable && !showOnly}
      section="WithdrawalPaymentInfo-Table"
      formId="WithdrawalPaymentInfo-Table"
    >
      <Fields.Refundpaytype />
      <Fields.BankAcctName />

      <Fields.BankAccountNo />

      <Fields.BankName />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveBankInfo',
          payload: {
            changedFields,
            id,
            type: 'W',
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item, refundPayType } = props;

      return formUtils.mapObjectToFields({ ...item, refundPayType });
    },
  })(Withdrawal)
);
