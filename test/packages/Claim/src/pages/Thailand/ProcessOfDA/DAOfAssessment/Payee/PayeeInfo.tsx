import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { Validator, formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelectPlus, FormItemSelect } from 'basic/components/Form/FormItem';
import CardOfClaim from 'basic/components/Form/FormCard';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { payeeLayout } from '../FormLayout.json';
import styles from './PayeeInfo.less';

const FORMID = 'payee';

const seachCustom: any = new SeachCustom();
const { handleBank, handleBankBranch } = seachCustom;

// @ts-ignore
@connect(
  (
    {
      dictionaryController,
      daOfClaimAssessmentController,
      formCommonController,
      claimEditable,
    }: any,
    { payeeId }: any
  ) => ({
    dictsOfPaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod_Reimbursement,
    payee: lodash.get(daOfClaimAssessmentController.claimEntities, `payeeListMap[${payeeId}]`),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfCustomerRole: dictionaryController.Dropdown_NewPayee_CustomerRole,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeId, validating } = props;

    const finalChangedFields = changedFields;
    if (lodash.has(changedFields, 'organization')) {
      finalChangedFields.organization = changedFields.organization.value ? 1 : 0;
    }
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'savePayee',
            payload: {
              changedFields,
              payeeId,
              seachCustom,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'savePayee',
          payload: {
            changedFields,
            payeeId,
            seachCustom,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { payee } = props;

    return formUtils.mapObjectToFields(payee);
  },
})
class PayeeInfo extends Component<any> {
  registeForm = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, payeeId }: any = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/removePayeeInfoItem',
      payload: {
        payeeId,
      },
    });
  };

  render() {
    const { form, dictsOfPaymentMethod, taskNotEditable, payee, dictsOfCustomerRole } = this.props;

    const isPaymentMethodBank = form.getFieldValue('paymentMethod') === '01';

    const bankCode = form.getFieldValue('bankCode');

    return (
      <div className={styles.payee}>
        <CardOfClaim
          cardStyle={{ backgroundColor: 'var(--card-1-bg-color)' }}
          className={'card1BgColor'}
          showButton={!taskNotEditable && payee.isAdd}
          handleClick={this.handleDelete}
        >
          <Form layout="vertical">
            <FormLayout json={payeeLayout}>
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                formName="paymentMethod"
                labelId="app.navigator.task-detail-of-data-capture.label.payment-method"
                dicts={dictsOfPaymentMethod}
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                requiredTriggerValidate
                required={isPaymentMethodBank}
                formName="customerRole"
                labelId="Customer Role"
                dicts={dictsOfCustomerRole}
              />
              <FormItemSelectPlus
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
                requiredTriggerValidate
                required={isPaymentMethodBank}
                formName="bankCode"
                searchName="bank"
                name="fieldTwo"
                labelId="app.navigator.task-detail-of-data-capture.label.bank-code"
                optionShowType="both"
                searchCustom={handleBank}
              />
              <FormItemSelectPlus
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
                requiredTriggerValidate
                required={isPaymentMethodBank}
                formName="branchCode"
                searchName="bankBranch"
                name="fieldTwo"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.titel.bank-branch-code"
                optionShowType="both"
                extraData={bankCode}
                searchCustom={(postData: any) => handleBankBranch(postData, bankCode)}
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
                requiredTriggerValidate
                required={isPaymentMethodBank}
                formName="bankAccountName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.bank-account-name"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
                requiredTriggerValidate
                required={isPaymentMethodBank}
                formName="bankAccountNo"
                maxLength={15}
                rules={[
                  {
                    validator: Validator.VLD_000002(10, 15),
                  },
                ]}
                labelId="app.navigator.task-detail-of-data-capture.label.bank-account-no"
              />
            </FormLayout>
          </Form>
        </CardOfClaim>
      </div>
    );
  }
}

export default PayeeInfo;
