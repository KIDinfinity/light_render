import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash, { get } from 'lodash';
import { policyItemName } from '@/utils/utils';

import { ClaimDecision } from 'claim/pages/utils/claim';
import {
  checkTretmentPayableListByItemCode,
  checkTretmentPayableListByTypeCode,
} from 'claimBasicProduct/pages/validators';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { FormItemNumber, FormItemCurrency, formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import AccidentBenefitList from '../AccidentBenefit/AccidentBenefitList';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItem';

const mapStateToProps = (
  { HKCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { treatmentPayableItemId }: any
) => {
  const treatmentPayableItem =
    HKCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap[treatmentPayableItemId];
  const claimPayableItem =
    HKCLMOfClaimAssessmentController.claimEntities.claimPayableListMap[
      treatmentPayableItem.payableId
    ];
  const isShowCalculation = !lodash.isEmpty(treatmentPayableItem.process);
  return {
    listPolicy: HKCLMOfClaimAssessmentController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    treatmentPayableItem,
    isShowCalculation,
    benefitCategory: claimPayableItem.benefitCategory,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    incidentPayableItem: get(
      HKCLMOfClaimAssessmentController,
      `claimEntities.claimPayableListMap[${treatmentPayableItem.payableId}]`,
      {}
    ),
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, treatmentPayableItemId, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
          target: 'saveTreatmentPayableItem',
          payload: {
            changedFields,
            treatmentPayableItemId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { treatmentPayableItem }: any = props;
    return formUtils.mapObjectToFields(treatmentPayableItem, {
      remark: (value: any) => transRemarkCodeToMsg(value, true),
    });
  },
})
class TreatmentPayableListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, treatmentPayableItemId }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${treatmentPayableItemId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentPayableItemId }: any = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${treatmentPayableItemId}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, treatmentPayableItemId, treatmentPayableItem }: any = this.props;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/removeTreatmentPayableItem',
      payload: {
        claimPayableItemId: treatmentPayableItem.payableId,
        treatmentPayableItemId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form }: any = this.props;

    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return policyList;
  };

  handleOpenCalculationModel = () => {
    const { dispatch, listPolicy, treatmentPayableItem }: any = this.props;

    const benefitItemCode = formUtils.queryValue(treatmentPayableItem.benefitItemCode);
    const benefitItemName = policyItemName(listPolicy, benefitItemCode);

    dispatch({
      type: 'calculationPath/openHospitalIncomeModal',
      payload: {
        detail: treatmentPayableItem,
        benefitItemName,
      },
    });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      treatmentPayableItem,
      curTreatmentPayableList,
      isShowCalculation,
      benefitCategory,
      taskNotEditable,
      incidentPayableItem,
      listPolicy,
      treatmentPayableItemId,
    }: any = this.props;
    const benefitCategoryIsCashBenefit = benefitCategory === eBenefitCategory.Cashless;
    const isAccident = benefitCategory === eBenefitCategory.Aipa;
    const policyNoList = this.getPolicyList();
    const isDeclined =
      formUtils.queryValue(incidentPayableItem?.claimDecision) === ClaimDecision.deny;
    const policyCurrency = treatmentPayableItem?.policyCurrency;

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            <FormItemCurrency
              form={form}
              disabled
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
              isShowCalculation={isShowCalculation}
              handleOpen={this.handleOpenCalculationModel}
              hiddenPrefix
              hiddenDropDown
              currencyCode={policyCurrency}
            />
            <FormItemCurrency
              form={form}
              disabled={
                taskNotEditable || (!benefitCategoryIsCashBenefit && !isAccident) || isDeclined
              }
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
              hiddenPrefix
              hiddenDropDown
              suffixEditable={false}
              currencyCode={policyCurrency}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
            <FormItemSelect
              form={form}
              disabled
              required
              dicts={policyNoList}
              dictCode="policyNo"
              dictName="policyNo"
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
            />
            <FormItemSelect
              form={form}
              disabled
              required
              dicts={policyNoList}
              dictCode="coreProductCode"
              dictName="productName"
              optionShowType="both"
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
            />
            <FormItemSelect
              form={form}
              disabled
              required
              dicts={policyNoList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="both"
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
              rules={[
                {
                  validator: (rule: any, value: any, callback: Function) =>
                    checkTretmentPayableListByTypeCode(
                      rule,
                      value,
                      callback,
                      listPolicy,
                      curTreatmentPayableList,
                      treatmentPayableItem
                    ),
                },
              ]}
            />
            {benefitCategoryIsCashBenefit && (
              <FormItemSelect
                form={form}
                required
                disabled={taskNotEditable}
                dicts={policyNoList}
                dictCode="benefitItemCode"
                dictName="benefitItemName"
                optionShowType="both"
                formName="benefitItemCode"
                labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
                rules={[
                  {
                    validator: (rule: any, value: any, callback: Function) =>
                      checkTretmentPayableListByItemCode(
                        rule,
                        value,
                        callback,
                        curTreatmentPayableList,
                        treatmentPayableItem
                      ),
                  },
                ]}
              />
            )}
            {benefitCategoryIsCashBenefit && (
              <FormItemNumber
                form={form}
                required={!isDeclined}
                disabled={taskNotEditable || isDeclined}
                formName="payableDays"
                labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
                pattern={/^\d{1,3}$/g}
                hiddenPrefix
              />
            )}
          </FormLayout>
        </Form>
        {isAccident && <AccidentBenefitList treatmentPayableId={treatmentPayableItemId} />}
        {/* <AccidentBenefitList treatmentPayableId={treatmentPayableItemId} /> */}
      </CardOfClaim>
    );
  }
}

export default TreatmentPayableListItem;
