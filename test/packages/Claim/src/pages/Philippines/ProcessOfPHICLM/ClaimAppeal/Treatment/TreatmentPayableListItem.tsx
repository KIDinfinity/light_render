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
import { withContextData } from '@/components/_store';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { SwitchEnum } from 'claim/pages/utils/claim';
import CaseCategory from 'enum/CaseCategory';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';
import { BenefitCategory } from '../_models/dto';

const FORMID = 'treatmentPayableListItem';

const mapStateToProps = (
  { PHCLMOfAppealCaseController, formCommonController, claimEditable }: any,
  { treatmentPayableItemId, withData: { caseType } }: any
) => {
  const { claimEntities } = caseType
    ? PHCLMOfAppealCaseController[caseType]
    : PHCLMOfAppealCaseController;

  const treatmentPayableItem = claimEntities.treatmentPayableListMap[treatmentPayableItemId];
  const claimPayableItem = claimEntities.claimPayableListMap[treatmentPayableItem.payableId];
  const isShowCalculation = !lodash.isEmpty(treatmentPayableItem.process);

  return {
    listPolicy: PHCLMOfAppealCaseController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    treatmentPayableItem,
    isShowCalculation,
    benefitCategory: claimPayableItem.benefitCategory,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    incidentPayableItem: get(
      claimEntities,
      `claimPayableListMap[${treatmentPayableItem.payableId}]`,
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
            type: 'PHCLMOfAppealCaseController/saveEntry',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfAppealCaseController/saveFormData',
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
      claimAdjustment: (value: any) => value,
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
      type: 'PHCLMOfAppealCaseController/removeTreatmentPayableItem',
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
      benefitCategory,
      taskNotEditable: notEditable,
      incidentPayableItem,
      withData,
    } = this.props;
    const { caseType, appealNotEditable, originalCaseCategory }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    const isCashless = benefitCategory === BenefitCategory.cashless;
    const policyNoList = this.getPolicyList();
    const isDeclined =
      formUtils.queryValue(incidentPayableItem?.claimDecision) === ClaimDecision.deny;

    return (
      <CardOfClaim
        showButton={!taskNotEditable && treatmentPayableItem.manualAdd === SwitchEnum.YES}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            {(ECaseType.originCase !== caseType ||
              CaseCategory.PH_AP_CTG01 === originalCaseCategory) && (
              <FormItemNumber
                form={form}
                disabled={
                  !isCashless ||
                  taskNotEditable ||
                  CaseCategory.PH_AP_CTG01 === originalCaseCategory
                }
                formName="claimAdjustment"
                min={-Number.MAX_VALUE}
                pattern={
                  /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
                }
                formatter={fnPrecisionFormatNegative}
                required
                name="claimAdjustment"
                labelId="venus_claim.label.claimAdjustment"
              />
            )}
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
              disabled
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
            {isCashless && (
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
            {isCashless && (
              <FormItemNumber
                form={form}
                required
                disabled={taskNotEditable || isDeclined}
                formName="payableDays"
                labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
                pattern={/^\d{1,3}$/g}
              />
            )}
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default withContextData(TreatmentPayableListItem);
