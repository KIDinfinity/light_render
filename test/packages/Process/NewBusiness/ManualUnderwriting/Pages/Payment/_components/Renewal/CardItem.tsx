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

const RenewalPaymentBankInfoTable = ({ form, showOnly }: IParams) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={editable && !showOnly}
      section="RenewalPaymentInfo-Table"
      formId="RenewalPaymentInfo-Table"
    >
      <Fields.Renewalpaytype />
      <Fields.NameOnCard />

      <Fields.Cardtype />

      <Fields.Creditcardno />

      <Fields.Maskedcreditcardno />

      <Fields.Sbcaca />

      <Fields.ExpiryDate />

      <Fields.Factoringhouse />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveBankCardInfo',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(RenewalPaymentBankInfoTable)
);
