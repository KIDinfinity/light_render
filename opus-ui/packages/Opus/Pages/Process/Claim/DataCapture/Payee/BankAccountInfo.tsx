import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { getPayeeDefaultData } from 'claim/pages/utils/getPayeeDefaultData';
import Section, { Fields } from './Section';

const BankAccountInfo = ({ form, payeeItem }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const bankCodeCache = formUtils.queryValue(payeeItem?.bankCodeCache);

  return (
    <Section form={form} formId="payee-BankAccountInfo" editable={editable}>
      <Fields.AccountHolder />
      <Fields.BankName bankCodeCache={bankCodeCache} />
      <Fields.BranchCode bankCodeCache={bankCodeCache} />
      <Fields.AccountHolderClientId />
      <Fields.BankCode bankCodeCache={bankCodeCache} />
      <Fields.BranchName bankCodeCache={bankCodeCache} />
      <Fields.BankAccountNo bankCodeCache={bankCodeCache} />
      <Fields.PassbookCode bankCodeCache={bankCodeCache} />
      <Fields.PassbookNo bankCodeCache={bankCodeCache} />
      <Fields.NewBankAccount />
      <Fields.BankDescription />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimDataCapture/saveEntry',
              target: 'payeeUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'opusClaimDataCapture/saveFormData',
            target: 'payeeUpdate',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { payeeItem } = props;
      const mapPayee = getPayeeDefaultData(payeeItem);

      return formUtils.mapObjectToFields(mapPayee);
    },
  })(BankAccountInfo)
);
