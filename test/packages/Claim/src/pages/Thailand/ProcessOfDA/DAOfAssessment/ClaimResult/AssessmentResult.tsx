/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Card, Form, Icon } from 'antd';
import { formUtils, Validator } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemTextArea from 'basic/components/Form/FormItem/FormItemTextArea';
import {
  VLD_000010,
  VLD_000182,
  VLD_000202,
  VLD_001114,
} from 'claim/pages/validators/fieldValidators';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import {
  isReimbursement,
  isPreArrangement,
  isPartialBill,
  isOPDHospitalBill,
} from 'claim/pages/Thailand/flowConfig';
import ClaimHospitalBillingRecover from './ClaimHospitalBillingRecover';
import { AssessmentResultLayout, OPDHBAssessmentResultLayout } from '../FormLayout.json';
import styles from './AssessmentResult.less';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';

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
    Dropdown_CLM_AssessmentRemarkTemplate:
      dictionaryController.Dropdown_CLM_AssessmentRemarkTemplate || [],
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
    requireAssessmentRemarkFlag:
      lodash.get(daOfClaimAssessmentController, 'claimProcessData.requireAssessmentRemarkFlag') ||
      0,
    showAssessmentRemarkDropdown:
      lodash.get(daOfClaimAssessmentController, 'claimProcessData.showAssessmentRemarkDropdown') ||
      0,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
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

  clearRemarkHandle = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/clearAssessmentRemark',
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
      simpleDiseaseFlag,
      requireAssessmentRemarkFlag,
      showAssessmentRemarkDropdown,
      claimDecision,
    }: any = this.props;
    const isRB = isReimbursement(caseCategory);
    const isOPDHB = isOPDHospitalBill(caseCategory);
    const isPAAndNoInvoice = isPreArrangement(caseCategory) && lodash.isEmpty(invoiceListMap);
    const isClaimPayableEmpty = lodash.isEmpty(claimPayableListMap);
    const { Dropdown_CLM_AssessmentRemarkTemplate } = getDrowDownList([
      'Dropdown_CLM_AssessmentRemarkTemplate',
    ]);
    const remarkIsEmpty = lodash.isEmpty(formUtils.queryValue(claimDecision?.assessmentRemark));
    const remarkTemplateIsEmpty = lodash.isEmpty(
      formUtils.queryValue(claimDecision?.assessmentRemarkTemplate)
    );

    const showSelectRemark = remarkTemplateIsEmpty && showAssessmentRemarkDropdown;
    const showRemoveIcon =
      !lodash.isEmpty(formUtils.queryValue(claimDecision?.assessmentRemarkTemplate)) ||
      !remarkIsEmpty;

    return (
      <div className={styles.result}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={isOPDHB ? OPDHBAssessmentResultLayout : AssessmentResultLayout}>
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
              {isOPDHB ? (
                <FormItemInput
                  form={form}
                  disabled={taskNotEditable}
                  cusTitle
                  maxLength={240}
                  formName="assessmentRemark"
                  labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
                  name="remark"
                />
              ) : showSelectRemark ? (
                <FormItemSelect
                  form={form}
                  disabled={taskNotEditable}
                  placeholder={'Please select'}
                  required={requireAssessmentRemarkFlag === 1}
                  formName="assessmentRemarkTemplate"
                  name="remark"
                  labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
                  dicts={Dropdown_CLM_AssessmentRemarkTemplate}
                  className={styles.remarkTemplate}
                />
              ) : (
                <div name="remark" className={styles.remarkBox}>
                  <FormItemTextArea
                    form={form}
                    disabled={taskNotEditable}
                    cusTitle
                    formName="assessmentRemark"
                    labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
                    autoSize
                    requiredTriggerValidate
                    required={requireAssessmentRemarkFlag === 1}
                    rules={[
                      {
                        validator: VLD_001114(),
                      },
                      { validator: Validator.VLD_000002(undefined, 1000) },
                    ]}
                  />
                  {showRemoveIcon && (
                    <Icon
                      type="close-circle"
                      theme="filled"
                      onClick={this.clearRemarkHandle}
                      className={styles.remarkClearIcon}
                    />
                  )}
                </div>
              )}
            </FormLayout>
          </Form>
          {isOPDHB && <ClaimHospitalBillingRecover />}
        </Card>
      </div>
    );
  }
}

export default AssessmentResult;
