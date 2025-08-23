import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section/index';

export default connect(({ claimEditable, formCommonController }) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
}))(
  Form.create({
    mapPropsToFields(props) {
      const selectedBank = props.payee.payeeBankAccountList?.find(({ isSelect }) => isSelect) || {};
      const selectedBankId = selectedBank?.id;
      return formUtils.mapObjectToFields({ ...props.payee, selectedBankId, ...selectedBank });
    },
    onFieldsChange(props, changedFields) {
      const { dispatch, payee, validating }: any = props;

      if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'paymentAllocation/saveEntry',
              target: 'savePaymentMethod',
              payload: {
                changedFields,
                id: payee?.id,
              },
            });
          });
        } else {
          dispatch({
            type: 'paymentAllocation/saveFormData',
            target: 'savePaymentMethod',
            payload: {
              changedFields,
              id: payee?.id,
            },
          });
        }
      }
    },
  })(({ form, taskNotEditable, payee, totalPayoutAmount }) => {
    return (
      <Section
        form={form}
        editable={!taskNotEditable}
        section="paymentMethod"
        formId={`payeePaymentInfo${payee?.id}`}
      >
        <Fields.AccountHolder />
        <Fields.PaymentMethod payoutAmount={totalPayoutAmount} />
        <Fields.SourceBank payoutAmount={totalPayoutAmount} />
        <Fields.BankAccount />
        <Fields.BankBranch
          bankList={payee?.payeeBankAccountList}
          payoutAmount={totalPayoutAmount}
        />
      </Section>
    );
  })
);
