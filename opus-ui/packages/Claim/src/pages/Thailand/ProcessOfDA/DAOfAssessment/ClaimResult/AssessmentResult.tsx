/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Card, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import {
  VLD_000010,
  VLD_000182,
  VLD_000202,
} from 'claim/pages/validators/fieldValidators';
import { shouldUpdateState } from 'claim/pages/utils/formUtils';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import {
  isReimbursement,
  isPreArrangement,
  isPartialBill,
  isOPDHospitalBill,
} from 'claim/pages/Thailand/flowConfig';
import ClaimHospitalBillingRecover from './ClaimHospitalBillingRecover';
import { AssessmentResultLayout } from '../FormLayout.json';
import styles from './AssessmentResult.less';

const FORMID = `${uuidv4()}-claimDecision`;

@connect(
  ({
    dictionaryController,
    loading,
    daOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfAssessmentDecision: dictionaryController.AssessmentDecision || [],
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    claimDecision: lodash.get(daOfClaimAssessmentController, 'claimProcessData.claimDecision'),
    claimPayableListMap: lodash.get(
      daOfClaimAssessmentController,
      'claimEntities.claimPayableListMap'
    ),
    caseCategory: lodash.get(daOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    invoiceListMap: lodash.get(daOfClaimAssessmentController, 'claimEntities.invoiceListMap'),
    incidentDecisionListMap: lodash.get(
      daOfClaimAssessmentController.claimEntities,
      'incidentDecisionListMap'
    ),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;
    if (shouldUpdateState(validating, changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveClaimDecision',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveClaimDecision',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimDecision }: any = props;

    return formUtils.mapObjectToFields(claimDecision, {
      payToHospital: (value: any) => value,
      payToCustomer: (value: any) => value,
      assessmentDecision: (value: any) => value,
      assessmentRemark: (value: any) => formatRemarkText(value),
    });
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
      claimPayableListMap,
      caseCategory,
      invoiceListMap,
      incidentDecisionListMap,
      taskNotEditable,
      validating,
    }: any = this.props;
    const isRB = isReimbursement(caseCategory);
    const isOPDHB = isOPDHospitalBill(caseCategory);
    const isPAAndNoInvoice = isPreArrangement(caseCategory) && lodash.isEmpty(invoiceListMap);
    const isClaimPayableEmpty = lodash.isEmpty(claimPayableListMap);

    return (
      <div className={styles.result}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={AssessmentResultLayout}>
              {!isRB && !isPAAndNoInvoice && (
                <FormItemNumber
                  form={form}
                  disabled
                  min={0}
                  max={999999999.99}
                  formName="payToHospital"
                  labelId="venus-claim-label-payToHospital"
                />
              )}
              {!isRB && !isPAAndNoInvoice && (
                <FormItemNumber
                  form={form}
                  disabled
                  min={0}
                  max={999999999.99}
                  formName="payToCustomer"
                  labelId="venus-claim-label-paytoCustomer"
                />
              )}
              {(isRB || isPAAndNoInvoice) && (
                <FormItemNumber
                  form={form}
                  disabled
                  min={0}
                  max={999999999.99}
                  formName="claimPayableAmount"
                  labelId="app.navigator.task-detail-of-claim-assessment.label.claim-payment-amount"
                />
              )}
              {!isPartialBill(caseCategory) && (
                <FormItemSelect
                  form={form}
                  disabled={taskNotEditable}
                  required
                  formName="assessmentDecision"
                  rules={[
                    {
                      validator: VLD_000010(
                        !isClaimPayableEmpty ? claimPayableListMap : incidentDecisionListMap,
                        isClaimPayableEmpty ? 'decision' : ''
                      ),
                    },
                    {
                      validator: VLD_000182(
                        validating,
                        !isClaimPayableEmpty ? claimPayableListMap : incidentDecisionListMap,
                        isClaimPayableEmpty ? 'decision' : ''
                      ),
                    },
                    {
                      validator: VLD_000202(),
                    },
                  ]}
                  labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-decision"
                  dicts={dictsOfAssessmentDecision}
                  loading={loadingOfFindDictionary}
                />
              )}
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                cusTitle
                maxLength={240}
                formName="assessmentRemark"
                labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
                name="remark"
              />
            </FormLayout>
          </Form>
          {isOPDHB && <ClaimHospitalBillingRecover />}
        </Card>
      </div>
    );
  }
}

export default AssessmentResult;
