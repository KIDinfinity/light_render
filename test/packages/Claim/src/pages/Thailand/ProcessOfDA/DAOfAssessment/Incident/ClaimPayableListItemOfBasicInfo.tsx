///* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { VLD_000202, VLD_000283 } from 'claim/pages/validators/fieldValidators';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { claimPayableWithTreatmentLayout, claimPayableNoTreatmentLayout } from '../FormLayout.json';
import bpm from 'bpm/pages/OWBEntrance';

const FORMID = 'claimPayableListItem';
// @ts-ignore
@connect(
  ({
    dictionaryController,
    daOfClaimAssessmentController,
    loading,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfAssessmentDecision: dictionaryController.AssessmentDecision,
    dictsOfDenyReason: dictionaryController.Deny_Reason,
    dictsOfDenyReasonManaulAssessment:
      dictionaryController.findDictionaryByTypeCode_Deny_Reason_ManaulAssessment,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    listPolicy: daOfClaimAssessmentController.listPolicy,
    loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentPayableId, validating, incidentPayableItem }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveClaimPayableItem',
            payload: {
              changedFields,
              incidentPayableId,
              treatmentPayableId: incidentPayableItem.treatmentPayableId,
              id: incidentPayableId,
              sectionName: 'claimPayableListMap',
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveClaimPayableItem',
          payload: {
            changedFields,
            incidentPayableId,
            treatmentPayableId: incidentPayableItem.treatmentPayableId,
            id: incidentPayableId,
            sectionName: 'claimPayableListMap',
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { incidentPayableItem }: any = props;
    return formUtils.mapObjectToFields(incidentPayableItem, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => transRemarkCodeToMsg(value, true),
      claimDecision: (value: any) => (value === null ? [] : value),
      policyNo: (value: any) => (value === null ? [] : value),
      benefitTypeCode: (value: any) => (value === null ? [] : value),
      denyCode: (value: any) => (value === null ? [] : value),
    });
  },
})
class ClaimPayableListItemOfBasicInfo extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, incidentPayableId }: any = this.props;

    if (incidentPayableId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentPayableId}`,
        },
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentPayableId }: any = this.props;

    if (incidentPayableId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentPayableId}`,
        },
      });
    }
  };

  getPolicyList = () => {
    const { listPolicy }: any = this.props;
    const policyNoList = lodash.uniqBy(listPolicy, 'policyNo');
    return policyNoList;
  };

  getProductList = () => {
    const { listPolicy, form }: any = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'benefitTypeCode');

    return productNoList;
  };

  getExistCodes = () => {
    const { curIncidentPayableList, form }: any = this.props;
    const policyNo = form.getFieldValue('policyNo');
    const existCodes = lodash.map(curIncidentPayableList, (item) => {
      if (item.policyNo === policyNo) return item.benefitTypeCode;
    });
    return existCodes;
  };

  saveSnapshotFn = () => {
    bpm.buttonAction('save', { isAuto: true });
  };
  render() {
    const {
      form,
      loadingOfPolicy,
      dictsOfAssessmentDecision,
      dictsOfDenyReason,
      dictsOfDenyReasonManaulAssessment,
      loadingOfFindDictionary,
      incidentPayableItem,
      hasTreatment,
      taskNotEditable,
      listPolicy,
    }: any = this.props;
    const existCodes = this.getExistCodes();
    const policyNoList = this.getPolicyList();
    const productList = this.getProductList();
    const benefitCategoryIsL = incidentPayableItem.benefitCategory === 'L';
    const systemAmountIsEmpty = valueIsEmpty(incidentPayableItem.systemCalculationAmount);
    const isDeclined = formUtils.queryValue(incidentPayableItem.claimDecision) === 'D';
    const isManualAdd = incidentPayableItem.manualAdd === 'Y';
    const { benefitTypeCode, policyNo, policyYear } = incidentPayableItem;

    const hasAgeLayer = lodash
      .filter(listPolicy, {
        benefitTypeCode,
        policyNo,
        policyYear,
      })
      .some((item) => item.hasAgeLayer === 'Y');
    const shouldShowExtendLimit = lodash.includes(incidentPayableItem?.declineCode, 'DC172');
    return (
      <Form layout="vertical">
        <FormLayout
          json={hasTreatment ? claimPayableWithTreatmentLayout : claimPayableNoTreatmentLayout}
        >
          <FormItemNumber
            form={form}
            disabled
            formName="systemCalculationAmount"
            labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable || !benefitCategoryIsL || isDeclined}
            requiredTriggerValidate
            required={systemAmountIsEmpty && benefitCategoryIsL}
            formName="assessorOverrideAmount"
            labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            maxLength={240}
            cusTitle
            name="remark"
            formName="remark"
            labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
          />
          <FormItemSelect
            form={form}
            onChange={this.saveSnapshotFn}
            disabled={taskNotEditable}
            required
            dicts={dictsOfAssessmentDecision}
            loading={loadingOfFindDictionary}
            rules={[
              {
                validator: VLD_000202(),
              },
              {
                validator: VLD_000283(incidentPayableItem.payableAmount),
              },
            ]}
            formName="claimDecision"
            labelId="app.navigator.task-detail-of-claim-assessment.label.claim-decision"
          />
          <FormItemSelect
            form={form}
            onChange={this.saveSnapshotFn}
            disabled={taskNotEditable}
            requiredTriggerValidate
            required={isDeclined}
            loading={loadingOfFindDictionary}
            dicts={taskNotEditable ? dictsOfDenyReason : dictsOfDenyReasonManaulAssessment}
            formName="denyCode"
            labelId="venus.claim.deny-reason"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || isDeclined || !isManualAdd}
            onChange={this.saveSnapshotFn}
            required
            dicts={policyNoList}
            loading={loadingOfPolicy}
            dictCode="policyNo"
            dictName="policyNo"
            formName="policyNo"
            labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || isDeclined}
            requiredTriggerValidate
            required={!isDeclined}
            existCodes={existCodes}
            dictTypeCode="Dropdown_PRD_BenefitType"
            dicts={productList}
            loading={loadingOfPolicy}
            dictCode="benefitTypeCode"
            dictName="benefitTypeName"
            formName="benefitTypeCode"
            labelId="venus.claim.product-name"
            name="fieldOne"
          />
          {hasAgeLayer && !lodash.isNil(form.getFieldValue('incurredAge')) && (
            <FormItemInput
              form={form}
              disabled
              cusTitle
              labelTypeCode="Label_BIZ_Claim"
              name="incurredAge"
              formName="incurredAge"
              labelId="incurredAge"
            />
          )}
          {shouldShowExtendLimit && (
            <FormItemCheckbox
              form={form}
              labelTypeCode="Label_BIZ_Claim"
              name="extendLimit"
              formName="extendLimit"
              labelId="extendLimit"
            />
          )}
        </FormLayout>
      </Form>
    );
  }
}

export default ClaimPayableListItemOfBasicInfo;
