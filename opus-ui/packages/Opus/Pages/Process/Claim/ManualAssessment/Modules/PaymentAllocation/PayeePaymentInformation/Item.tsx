import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { ReactComponent as DeleteIcon } from 'opus/Modules/Envoy/Assets/delete.svg';
import { ReactComponent as DeleteDisabledIcon } from 'opus/Modules/Envoy/Assets/deleteDisabled.svg';
import Section, { PayeePaymentInformationFields } from '../Section';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const ActionComponent = ({ policyBenefitId, beneficiaryId, actions, isLastBeneficiary }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (isLastBeneficiary) return;
    if (policyBenefitId) {
      dispatch({
        type: `${NAMESPACE}/deletePayeePaymentInformation`,
        payload: {
          policyBenefitId,
          beneficiaryId,
        },
      });
    } else {
      dispatch({
        type: `${NAMESPACE}/deletePayeePaymentInformationTemp`,
        payload: {
          beneficiaryId,
        },
      });
    }
  };
  return (
    <div className={styles.btnWrapa}>
      {React.isValidElement(actions) && <div className={styles.actions}> {actions}</div>}
      <DeleteButton
        icon={isLastBeneficiary ? DeleteDisabledIcon : DeleteIcon}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const PayeePaymentInformation = ({
  form,
  policyBenefitId,
  item,
  actions,
  isLastBeneficiary,
}: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.klip}>
      <Section
        form={form}
        editable={editable}
        section="paymentAllocation.payeePaymentInformation"
        actionComponent={
          editable && (
            <ActionComponent
              policyBenefitId={policyBenefitId}
              beneficiaryId={item?.id}
              actions={actions}
              isLastBeneficiary={isLastBeneficiary}
            />
          )
        }
        formId={`paymentAllocation-${item?.id}`}
      >
        <PayeePaymentInformationFields.PolicyNo policyBenefitId={policyBenefitId} />
        <PayeePaymentInformationFields.PayeeType />
        <PayeePaymentInformationFields.PolicyAmount />
        <PayeePaymentInformationFields.Payee />
        <PayeePaymentInformationFields.SharedPercentage />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, item, policyBenefitId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveBeneficiary',
          payload: {
            changedFields,
            id: item?.id,
            policyBenefitId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(PayeePaymentInformation)
);
