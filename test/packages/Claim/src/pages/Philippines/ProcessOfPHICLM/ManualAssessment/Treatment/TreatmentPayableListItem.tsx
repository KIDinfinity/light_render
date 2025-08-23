import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash, { get } from 'lodash';
import { policyItemName } from '@/utils/utils';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { checkTretmentPayableList } from 'claimBasicProduct/pages/validators';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItem';

const mapStateToProps = (
  { PHCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { treatmentPayableItemId }: any
) => {
  const treatmentPayableItem =
    PHCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap[treatmentPayableItemId];
  const claimPayableItem =
    PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap[
      treatmentPayableItem.payableId
    ];
  const isShowCalculation = !lodash.isEmpty(treatmentPayableItem.process);
  return {
    listPolicy: PHCLMOfClaimAssessmentController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    treatmentPayableItem,
    isShowCalculation,
    benefitCategory: claimPayableItem.benefitCategory,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    incidentPayableItem: get(
      PHCLMOfClaimAssessmentController,
      `claimEntities.claimPayableListMap[${treatmentPayableItem.payableId}]`,
      {}
    ),
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, treatmentPayableItemId, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
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
    const { treatmentPayableItem } = props;

    return formUtils.mapObjectToFields(treatmentPayableItem, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      benefitItemCode: (value: any) => value,
      payableDays: (value: any) => value,
      benefitAmountPerDay: (value: any) => value,
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
    const { dispatch, form, treatmentPayableItemId } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${treatmentPayableItemId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentPayableItemId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${treatmentPayableItemId}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, treatmentPayableItemId, treatmentPayableItem } = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/removeTreatmentPayableItem',
      payload: {
        claimPayableItemId: treatmentPayableItem.payableId,
        treatmentPayableItemId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form } = this.props;

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
    const { dispatch, listPolicy, treatmentPayableItem } = this.props;

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
      existBenefitItem,
    } = this.props;
    const benefitCategoryIsCashBenefit = benefitCategory === 'C';
    const policyNoList = this.getPolicyList();
    const isDeclined =
      formUtils.queryValue(incidentPayableItem?.claimDecision) === ClaimDecision.deny;

    return (
      <CardOfClaim
        showButton={!taskNotEditable && !treatmentPayableItem.registered}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            <FormItemNumber
              form={form}
              disabled
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
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
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || !benefitCategoryIsCashBenefit}
              formName="assessorOverrideAmount"
              labelId="AssessAmount"
              labelTypeCode="Label_CLM_Payable"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
            {benefitCategoryIsCashBenefit && (
              <FormItemSelect
                form={form}
                required
                disabled={taskNotEditable}
                dicts={policyNoList}
                existCodes={existBenefitItem}
                dictCode="benefitItemCode"
                dictName="benefitItemName"
                optionShowType="both"
                formName="benefitItemCode"
                labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
                rules={[
                  {
                    validator: (rule: any, value: any, callback: Function) =>
                      checkTretmentPayableList(
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
              />
            )}
            {benefitCategoryIsCashBenefit && (
              <FormItemNumber
                form={form}
                disabled={taskNotEditable}
                precision={0}
                formName="benefitAmountPerDay"
                labelId="BenefitAmountPerDay"
              />
            )}
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default TreatmentPayableListItem;
