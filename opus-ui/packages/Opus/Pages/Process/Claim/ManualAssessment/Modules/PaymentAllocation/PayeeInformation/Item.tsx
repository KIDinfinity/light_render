import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { ReactComponent as TrashIcon } from 'opus/Assets/trash.svg';
import Section, { PayeeInformationFields } from '../Section';
import styles from './index.less';

const ActionComponent = ({ payeeId }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deletePayee`,
      payload: {
        payeeId,
      },
    });
  };
  return (
    <div className={styles.btnWrapa}>
      <div className={styles.icon} onClick={handleDelete}>
        <TrashIcon />
      </div>
    </div>
  );
};

const PayeeInformation = ({ form, item }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.item}>
      <Section
        form={form}
        editable={editable}
        section="paymentAllocation.payeeInformation"
        formId={`paymentAllocation-${item?.id}`}
      >
        <PayeeInformationFields.FirstName />
        <PayeeInformationFields.IsCorporation />
        <PayeeInformationFields.LifeJClientNo />
        <PayeeInformationFields.PayeeType />
        <PayeeInformationFields.PrePaymentDate />
        <PayeeInformationFields.PaymentMethod />
        <PayeeInformationFields.PaymentType />
        <PayeeInformationFields.SurName />
        <PayeeInformationFields.TransferClassification />
        <PayeeInformationFields.AccountType />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFieldsO: any) {
      const { dispatch, item } = props;
      const changedFields = { ...changedFieldsO };

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePayeeInfo',
          payload: {
            changedFields,
            id: item?.id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields({
        ...item,
        accountType: item?.payeeBankAccountList?.[0]?.accountType,
        bankType: item?.payeeBankAccountList?.[0]?.bankType,
      });
    },
  })(PayeeInformation)
);
