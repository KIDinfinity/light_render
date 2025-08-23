import React from 'react';
import { connect, useDispatch, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils, FormCard } from 'basic/components/Form';

import { getPayeeDefaultData, getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import Section, { Fields } from './Section';

const Payee = ({ form, payee }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const payeeListMap = useSelector(
    (state: any) => state.JPCLMOfDataCapture.claimEntities.payeeListMap
  );
  const premiumPaymentMethod = lodash.get(payee, 'payeeContactList[0].premiumPaymentMethod');

  const payeeId = getDefaultPayeeId(payeeListMap);
  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/payeeDelete',
      payload: {
        payeeId,
      },
    });
  };

  const bankCodeCache = formUtils.queryValue(payee.bankCodeCache);

  return (
    <FormCard showButton={editable} handleClick={handleDelete}>
      <Section form={form} editable={editable}>
        <Fields.AccountHolder />

        <Fields.AccountType />
        <Fields.BankAccountNo bankCodeCache={bankCodeCache} />
        <Fields.BankCode bankCodeCache={bankCodeCache} />
        <Fields.Banktype />
        <Fields.BankName bankCodeCache={bankCodeCache} />
        <Fields.BranchCode bankCodeCache={bankCodeCache} />
        <Fields.BranchName bankCodeCache={bankCodeCache} />
        <Fields.FirstName />
        <Fields.Organization />
        <Fields.BizClientId />
        <Fields.PassbookCode bankCodeCache={bankCodeCache} />
        <Fields.PassbookNo bankCodeCache={bankCodeCache} />
        <Fields.PayeeType />
        <Fields.PaymentMethod payeeId={payeeId} premiumPaymentMethod={premiumPaymentMethod} />
        <Fields.PaymentType />
        <Fields.Surname />
        <Fields.TransferAccount />
        <Fields.NewBankAccount />
        <Fields.AccountHolderClientId />
        <Fields.BankDescription />
      </Section>
      <Section form={form} editable={editable}>
        <Fields.Address />
        <Fields.Email />
        <Fields.PhoneNo />
        <Fields.PostCode />
        <Fields.SMS />
        <Fields.Address2 />
      </Section>
    </FormCard>
  );
};

export default connect(({ formCommonController, JPCLMOfDataCapture }: any, { payeeId }: any) => ({
  validating: formCommonController.validating,
  payee: JPCLMOfDataCapture.claimEntities?.payeeListMap?.[payeeId],
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'payeeUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'payeeUpdate',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { payee } = props;
      const mapPayee = getPayeeDefaultData(payee);

      return formUtils.mapObjectToFields(mapPayee);
    },
  })(Payee)
);
