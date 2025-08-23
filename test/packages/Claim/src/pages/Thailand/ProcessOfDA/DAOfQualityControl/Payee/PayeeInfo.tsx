import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import lodash from 'lodash';

import CardOfClaim from 'basic/components/Form/FormCard';

import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemInput,
  FormItemSelectPlus,
  FormItemSelect,
  formUtils,
  Validator,
} from 'basic/components/Form';
import type { IDictionary } from '@/dtos/dicts';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { payeeLayout } from '../FormLayout.json';
import styles from './PayeeInfo.less';

const FORMID = 'payee';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loadingOfFindDictionary: boolean;
  dictsOfPaymentMethod: IDictionary[];
  payeeId: string;
  validating: boolean;
  payee: any;
  taskNotEditable: boolean;
}

const seachCustom: any = new SeachCustom();
const { handleBank, handleBankBranch } = seachCustom;

// @ts-ignore
@connect(
  (
    { dictionaryController, daOfClaimCaseController, formCommonController, claimEditable }: any,
    { payeeId }: any
  ) => ({
    dictsOfPaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod_Reimbursement,
    payee: lodash.get(daOfClaimCaseController.claimEntities, `payeeListMap[${payeeId}]`),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfCustomerRole: dictionaryController.Dropdown_NewPayee_CustomerRole,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimCaseController/saveEntry',
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
          type: 'daOfClaimCaseController/saveFormData',
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

    return formUtils.mapObjectToFields(payee, {
      payeeType: (value: string | object) => value,
      relationshipWithInsured: (value: string | object) => value,
      firstName: (value: string | object) => value,
      middleName: (value: string | object) => value,
      surname: (value: string | object) => value,
      organization: (value: number) => value === 1,
      identityType: (value: string | object) => value,
      identityNo: (value: string | object) => value,
      phoneNo: (value: string | object) => value,
      paymentMethod: (value: string | object) => value,
      bankCode: (value: string | object) => value,
      branchCode: (value: string | object) => value,
      bankAccountName: (value: string | object) => value,
      bankAccountNo: (value: string | object) => value,
    });
  },
})
class PayeeInfo extends Component<IProps> {
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
      type: 'daOfClaimCaseController/removePayeeInfoItem',
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
                requiredTriggerValidate
                required={isPaymentMethodBank}
                disabled={taskNotEditable}
                formName="customerRole"
                labelId="Customer Role"
                dicts={dictsOfCustomerRole}
              />
              <FormItemSelectPlus
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
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
