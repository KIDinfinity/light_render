import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Payee, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Payee';

const ClaimantSection = ({ form, payeeId, NAMESPACE }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <>
      <Payee.Section
        form={form}
        editable={editable}
        section="Payee"
        id={payeeId}
        NAMESPACE={NAMESPACE}
      >
        <Fields.AccountHolder />
        <Fields.AccountType />
        <Fields.BankAccountNo />
        <Fields.BankCode />
        <Fields.Banktype />
        <Fields.BankName />
        <Fields.BranchCode />
        <Fields.BranchName />
        <Fields.FirstName />
        <Fields.Organization />
        <Fields.BizClientId />
        <Fields.PassbookCode />
        <Fields.PassbookNo />
        <Fields.PayeeType />
        <Fields.PaymentMethod payeeId={payeeId} />
        <Fields.PaymentType />
        <Fields.Surname />
        <Fields.TransferAccount />
        <Fields.NewBankAccount />
        <Fields.AccountHolderClientId />
        <Fields.BankDescription />
        <Fields.IdentityNo />
        <Fields.IdentityType />
        <Fields.ContactType />
      </Payee.Section>
      <Payee.Section
        form={form}
        editable={editable}
        section="Payee"
        NAMESPACE={NAMESPACE}
        id={payeeId}
      >
        <Fields.Address />
        <Fields.Email />
        <Fields.PhoneNo />
        <Fields.PostCode />
        <Fields.SMS />
        <Fields.Address2 />
      </Payee.Section>
    </>
  );
};

export default connect((state: any, { NAMESPACE, payeeId }: any) => ({
  validating: state?.formCommonController.validating,
  payee: state?.[NAMESPACE].claimEntities?.payeeListMap?.[payeeId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, NAMESPACE } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveClaimant',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveClaimant',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { claimant } = props;
      return formUtils.mapObjectToFields(claimant);
    },
  })(ClaimantSection)
);
