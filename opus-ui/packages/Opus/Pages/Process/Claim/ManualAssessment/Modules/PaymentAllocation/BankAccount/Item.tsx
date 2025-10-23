import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector, useDispatch } from 'dva';

import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import Section, { BankAccountFields } from '../Section';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const seachCustom = new SeachCustom();
const { handleBank, handleBankBranch } = seachCustom;

const ActionComponent = ({ payeeId, bankAccountId, actions }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deleteBankAccount`,
      payload: {
        payeeId,
        bankAccountId,
      },
    });
  };
  return (
    <div className={styles.btnWrapa}>
      {React.isValidElement(actions) && <div className={styles.actions}> {actions}</div>}
      <DeleteButton className={styles.icon} handleDelete={handleDelete} />
    </div>
  );
};

const BankAccount = ({ form, item, payeeId, paymentMethod }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.item}>
      <Section
        form={form}
        editable={editable}
        section="paymentAllocation.bankAccount"
        formId={`paymentAllocation-${item?.id}`}
      >
        <BankAccountFields.AccountHolder />
        <BankAccountFields.BankType />
        <BankAccountFields.AccountHolderID itemId={item?.id} payeeId={payeeId} />
        <BankAccountFields.BankCode handleDict={handleBank} payeeId={payeeId} />
        <BankAccountFields.BankName handleDict={handleBank} payeeId={payeeId} />
        <BankAccountFields.BranchCode handleDict={handleBankBranch} payeeId={payeeId} />
        <BankAccountFields.BranchName handleDict={handleBankBranch} payeeId={payeeId} />
        <BankAccountFields.BankAccountNo payeeId={payeeId} paymentMethod={paymentMethod} />
        <BankAccountFields.BankDescription />
        <BankAccountFields.NewBankAccount />
        <BankAccountFields.PassbookCode payeeId={payeeId} />
        <BankAccountFields.PassbookNo payeeId={payeeId} />
        {/* <BankAccountFields.AccountType /> */}
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, payeeId, item } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveBankAccount',
          payload: {
            changedFields,
            id: item?.id,
            payeeId,
            seachCustom,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(BankAccount)
);
