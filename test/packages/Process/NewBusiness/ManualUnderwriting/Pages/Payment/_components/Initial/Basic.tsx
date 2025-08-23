import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from './Section';

interface IParams {
  form: any;
  showOnly: boolean;
}

const Basic = ({ form, showOnly }: IParams) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={editable && !showOnly}
      section="InitialPaymentInfo-Table"
      formId="InitialPaymentInfo-Table"
    >
      <Fields.Paytype />
      <Fields.AccountNo />

      <Fields.Transactionno />

      <Fields.Paymentdate />

      <Fields.Dateofdeduction />

      <Fields.Policyinitialpremium />

      <Fields.Reason />

      <Fields.Deductionstatus />

      <Fields.Paidamount />

      <Fields.Paymentoption />

      <Fields.PaymentMethodType />

      <Fields.CardIssuerCountry />

      <Fields.HaveCreditCard />

      <Fields.Premiumshortfall />

      <Fields.Paymentreferenceno />
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
          target: 'updatePaymentList',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Basic)
);
