import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FormComponentProps } from 'antd/es/form';
import NewPayeeSelection from './NewPayeeSelection';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemInput,
  FormItemSelectPlus,
  formUtils,
  FormItemSelect,
} from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import json from '../layout/FormLayout.json';
import styles from './PayeeInfo.less';

interface ISProps extends FormComponentProps {
  payeeItem: object;
  form: any;
  validating: boolean;
  dispatch?: any;
}

const seachCustom: any = new SeachCustom();
const { handleBankBranch } = seachCustom;

@connect(
  (
    { daOfClaimAssessmentController, claimEditable, dictionaryController }: any,
    { payeeId }: any
  ) => ({
    payeeItem: daOfClaimAssessmentController.claimEntities.payeeListMap[payeeId],
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfCustomerRole: dictionaryController.Dropdown_NewPayee_CustomerRole,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeId, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'savePayee',
            payload: {
              changedFields,
              payeeId,
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
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { payeeItem }: any = props;
    return formUtils.mapObjectToFields(payeeItem, {});
  },
})
class PayeeList extends Component<ISProps> {
  render() {
    const { payeeItem, form, taskNotEditable, payeeId, dictsOfCustomerRole }: any = this.props;
    return (
      <div className={styles.payee}>
        {payeeItem.paymentMethod !== '02' && (
          <Card
            title={formatMessageApi({
              Label_BIZ_Claim:
                'app.navigator.task-detail-of-claim-assessment.beneficiary.titel.new-payee',
            })}
            bordered={false}
          >
            <div className={styles.content}>
              <div className={styles.formLeft}>
                <NewPayeeSelection payeeId={payeeId} />
              </div>
              <div className={styles.formRight}>
                <Form layout="vertical" className="policyBenefitListItemOfBasicInfo">
                  <FormLayout json={json}>
                    <FormItemSelectPlus
                      form={form}
                      formName="branchCode"
                      searchName="bankBranch"
                      name="fieldTwo"
                      disabled={taskNotEditable}
                      labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.titel.bank-branch-code"
                      optionShowType="both"
                      searchCustom={(postData: any) => handleBankBranch(postData, '')}
                    />
                    <FormItemInput
                      form={form}
                      disabled
                      formName="bankAccountName"
                      labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.bank-account-name"
                    />
                    <FormItemInput
                      form={form}
                      disabled
                      formName="bankAccountNo"
                      labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.bank-accountNo"
                    />
                    <FormItemSelect
                      form={form}
                      disabled
                      formName="customerRole"
                      labelId="Customer Role"
                      dicts={dictsOfCustomerRole}
                    />
                  </FormLayout>
                </Form>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default PayeeList;
