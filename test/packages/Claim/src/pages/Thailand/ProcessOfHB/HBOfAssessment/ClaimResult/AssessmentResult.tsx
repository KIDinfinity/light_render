/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { isReimbursement } from 'claim/pages/Thailand/flowConfig';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import { AssessmentResultLayout } from '../FormLayout.json';
import styles from './AssessmentResult.less';

const FORMID = 'claimDecision';

@connect(
  ({
    dictionaryController,
    loading,
    hbOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfAssessmentDecision: dictionaryController.AssessmentDecision || [],
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    claimDecision: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.claimDecision'),
    caseCategory: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    amount: lodash.get(hbOfClaimAssessmentController, 'claimHospitalBillingDetail.amount'),
    adjustAmount: lodash.get(hbOfClaimAssessmentController, 'claimHospitalBillAdjust.adjustAmount'),
    adjustReason: lodash.get(hbOfClaimAssessmentController, 'claimHospitalBillAdjust.adjustReason'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'hbOfClaimAssessmentController/saveEntry',
            target: 'saveClaimDecision',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'hbOfClaimAssessmentController/saveFormData',
          target: 'saveClaimDecision',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimDecision, amount, adjustAmount, adjustReason }: any = props;

    return formUtils.mapObjectToFields(
      { ...claimDecision, amount, adjustAmount, adjustReason },
      {
        payToHospital: (value: any) => value,
        payToCustomer: (value: any) => value,
        assessmentDecision: (value: any) => value,
        assessmentRemark: (value: any) => formatRemarkText(value),
        amount: (value: any) => value,
        adjustAmount: (value: any) => value,
        adjustReason: (value: any) => value,
      }
    );
  },
})
class AssessmentResult extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form }: any = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form }: any = this.props;
    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const {
      form,
      loadingOfFindDictionary,
      dictsOfAssessmentDecision,
      caseCategory,
      taskNotEditable,
    }: any = this.props;
    const isRB = isReimbursement(caseCategory);

    const adjustAmountValue = form.getFieldValue('adjustAmount');

    return (
      <div className={styles.result}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={AssessmentResultLayout}>
              {!isRB && (
                <FormItemNumber
                  form={form}
                  disabled
                  min={0}
                  max={999999999.99}
                  formName="payToHospital"
                  labelId="venus-claim-label-payToHospital"
                />
              )}
              {!isRB && (
                <FormItemNumber
                  form={form}
                  disabled
                  min={0}
                  max={999999999.99}
                  formName="payToCustomer"
                  labelId="venus-claim-label-paytoCustomer"
                />
              )}
              {isRB && (
                <FormItemNumber
                  form={form}
                  disabled
                  min={0}
                  max={999999999.99}
                  formName="claimPayableAmount"
                  labelId="app.navigator.task-detail-of-claim-assessment.label.claim-payment-amount"
                />
              )}
              <FormItemSelect
                form={form}
                disabled
                required
                formName="assessmentDecision"
                labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-decision"
                dicts={dictsOfAssessmentDecision}
                loading={loadingOfFindDictionary}
              />
              <FormItemInput
                form={form}
                disabled
                maxLength={240}
                formName="assessmentRemark"
                labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
                name="remark"
              />
              <FormItemNumber
                form={form}
                disabled
                min={0}
                max={999999999.99}
                formName="amount"
                labelId="Hospital Bill Amount"
              />
              <FormItemNumber
                form={form}
                disabled={taskNotEditable}
                min={0}
                max={999999999.99}
                formName="adjustAmount"
                labelId="Adjust Amount"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                required={lodash.isNumber(adjustAmountValue)}
                formName="adjustReason"
                maxLength={240}
                labelId="Adjust Reason"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AssessmentResult;
