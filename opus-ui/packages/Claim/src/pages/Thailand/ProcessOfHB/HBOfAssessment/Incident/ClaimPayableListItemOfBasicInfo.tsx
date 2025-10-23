/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { claimPayableWithTreatmentLayout, claimPayableNoTreatmentLayout } from '../FormLayout.json';

const FORMID = 'claimPayableListItem';

@connect(
  (
    { dictionaryController, hbOfClaimAssessmentController, loading, claimEditable }: any,
    { incidentPayableId }: any
  ) => ({
    dictsOfAssessmentDecision: dictionaryController.AssessmentDecision,
    dictsOfDenyReason: dictionaryController.Deny_Reason,
    dictsOfDenyReasonManaulAssessment:
      dictionaryController.findDictionaryByTypeCode_Deny_Reason_ManaulAssessment,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    listPolicy: hbOfClaimAssessmentController.listPolicy,
    loadingOfPolicy: loading.effects['hbOfClaimAssessmentController/queryListPolicy'],
    incidentPayableItem:
      hbOfClaimAssessmentController.claimEntities.claimPayableListMap[incidentPayableId],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentPayableId } = props;
    dispatch({
      type: 'hbOfClaimAssessmentController/saveClaimPayableItem',
      payload: {
        changedFields,
        incidentPayableId,
      },
    });
  },
  mapPropsToFields(props) {
    const { incidentPayableItem } = props;
    return formUtils.mapObjectToFields(incidentPayableItem, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => formatRemarkText(value),
      claimDecision: (value: any) => (value === null ? [] : value),
      policyNo: (value: any) => (value === null ? [] : value),
      benefitTypeCode: (value: any) => (value === null ? [] : value),
      denyCode: (value: any) => (value === null ? [] : value),
    });
  },
})
class ClaimPayableListItemOfBasicInfo extends Component {
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

  render() {
    const {
      form,
      taskNotEditable,
      loadingOfPolicy,
      dictsOfAssessmentDecision,
      loadingOfFindDictionary,
      incidentPayableItem,
      hasTreatment,
      dictsOfDenyReason,
      dictsOfDenyReasonManaulAssessment,
      existProduceCodes,
      listPolicy,
    }: any = this.props;

    const existCodes = lodash.map(existProduceCodes, (item) => {
      if (lodash.includes(item, form.getFieldValue('policyNo'))) return item[1];
    });

    const policyNoList = this.getPolicyList();
    const productList = this.getProductList();
    const benefitCategoryIsL = incidentPayableItem.benefitCategory === 'L';
    const systemAmountIsEmpty = valueIsEmpty(incidentPayableItem.systemCalculationAmount);
    const isDeclined = formUtils.queryValue(incidentPayableItem.claimDecision) === 'D';

    const { benefitTypeCode, policyNo, policyYear } = incidentPayableItem;

    const hasAgeLayer = lodash
      .filter(listPolicy, {
        benefitTypeCode,
        policyNo,
        policyYear,
      })
      .some((item) => item.hasAgeLayer === 'Y');

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
            disabled
            required={systemAmountIsEmpty && benefitCategoryIsL}
            formName="assessorOverrideAmount"
            labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
          />
          <FormItemInput
            form={form}
            disabled
            maxLength={240}
            name="remark"
            formName="remark"
            labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
          />
          <FormItemSelect
            form={form}
            disabled
            required
            dicts={dictsOfAssessmentDecision}
            loading={loadingOfFindDictionary}
            formName="claimDecision"
            labelId="app.navigator.task-detail-of-claim-assessment.label.claim-decision"
          />
          <FormItemSelect
            form={form}
            disabled
            loading={loadingOfFindDictionary}
            dicts={taskNotEditable ? dictsOfDenyReason : dictsOfDenyReasonManaulAssessment}
            formName="denyCode"
            labelId="venus.claim.deny-reason"
          />
          <FormItemSelect
            form={form}
            disabled
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
            disabled
            required={!isDeclined}
            existCodes={existCodes}
            dicts={productList}
            loading={loadingOfPolicy}
            dictCode="benefitTypeCode"
            dictName="benefitTypeName"
            formName="benefitTypeCode"
            dictTypeCode="Dropdown_PRD_BenefitType"
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
        </FormLayout>
      </Form>
    );
  }
}

export default ClaimPayableListItemOfBasicInfo;
