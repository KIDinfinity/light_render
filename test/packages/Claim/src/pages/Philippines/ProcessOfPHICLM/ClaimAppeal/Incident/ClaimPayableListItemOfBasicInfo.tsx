import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { FormItemNumber, FormItemCheckbox, FormItemInput } from 'basic/components/Form/FormItem';
import { ClaimDecision, SwitchEnum } from 'claim/pages/utils/claim';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { withContextData } from '@/components/_store';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import CaseCategory from 'enum/CaseCategory';

import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { lifePayableWithTreatmentLayout, lifePayableNoTreatmentLayout } from '../FormLayout.json';

const FORMID = 'claimPayableListItemLife';

@connect(
  ({
    dictionaryController,
    PHCLMOfAppealCaseController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfClaimDecision: dictionaryController.Dropdown_CLM_PHClaimDecision,
    dictsOfDenyDecision: dictionaryController.Dropdown_CLM_PHDenyReason,
    dictsOfRedFlag: dictionaryController.Dropdown_CLM_PHRedFlag,
    listPolicy: PHCLMOfAppealCaseController.listPolicy,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentPayableId, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          // debugger;
          dispatch({
            type: 'PHCLMOfAppealCaseController/saveEntry',
            target: 'saveClaimPayableItem',
            payload: {
              changedFields,
              incidentPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfAppealCaseController/saveFormData',
          target: 'saveClaimPayableItem',
          payload: {
            changedFields,
            incidentPayableId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { incidentPayableItem }: any = props;

    const data = {
      ...incidentPayableItem,
      benefitItemCode: incidentPayableItem?.lifePayable?.benefitItemCode,
      policyDuration: [
        incidentPayableItem?.policyDurationYears,
        incidentPayableItem?.policyDurationMonths,
      ],
    };
    return formUtils.mapObjectToFields(data, {
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      benefitItemCode: (value: any) => value,
      amountType: (value: any) => value,
      calculationAmount: (value: any) => value,
      reimbursementPercentage: (value: any) => value,
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      claimDecision: (value: any) => value,
      denyCode: (value: any) => value,
      denyWithRescission: (value: any) => value,
      claimWithExGratia: (value: any) => value,
      redFlag: (value: any) => value,
      beyondNel: (value: any) => value,
      contestableClaim: (value: any) => value,
      policyDuration: (value: any) => {
        if (!lodash.isArray(value)) return 0;
        const years = lodash.get(value, 0, 0);
        const months = lodash.get(value, 1, 0);
        return formatMessageApi({ Label_CLM_Payable: 'year-month' }, years, months);
      },
      remark: (value: any) => value,
      claimAdjustment: (value: any) => value,
      appealRequestDecision: (value: any) => value,
    });
  },
})
class ClaimPayableListItemOfLife extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  get policyList() {
    const { listPolicy }: any = this.props;

    const policyNoList = lodash.uniqBy(listPolicy, 'policyNo');
    return policyNoList;
  }

  get productList() {
    const { listPolicy, form }: any = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  }

  get benefitTypeList() {
    const { listPolicy, form }: any = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[form.getFieldValue('productCode')];
    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
  }

  get benefitItemList() {
    const {
      listPolicy,
      incidentPayableItem: { lifePayable = {} },
    }: any = this.props;

    return lodash
      .chain(listPolicy)
      .compact()
      .filter(
        (item) =>
          item.policyNo === formUtils.queryValue(lifePayable.policyNo) &&
          item.coreProductCode === formUtils.queryValue(lifePayable.productCode) &&
          item.benefitTypeCode === formUtils.queryValue(lifePayable.benefitTypeCode)
      )
      .value();
  }

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

  render() {
    const {
      form,
      dictsOfClaimDecision,
      incidentPayableItem,
      hasTreatment,
      taskNotEditable: notEditable,
      dictsOfDenyDecision,
      dictsOfRedFlag,
      withData,
    }: any = this.props;
    const isDeclined =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;
    const isLife =
      formUtils.queryValue(incidentPayableItem.benefitCategory) === eBenefitCategory.Life;
    const isManual = incidentPayableItem.manualAdd === SwitchEnum.YES;
    const { caseType, appealNotEditable, originalCaseCategory }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;
    return (
      <Form layout="vertical">
        <FormLayout
          json={hasTreatment ? lifePayableWithTreatmentLayout : lifePayableNoTreatmentLayout}
        >
          {(ECaseType.originCase !== caseType ||
            CaseCategory.PH_AP_CTG01 === originalCaseCategory) && (
            <FormItemNumber
              form={form}
              disabled={
                (!isLife && !isManual) ||
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
              labelId="venus_claim.label.claimAdjustment"
            />
          )}
          {(ECaseType.originCase !== caseType ||
            CaseCategory.PH_AP_CTG01 === originalCaseCategory) && (
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              dicts={dictsOfClaimDecision}
              formName="appealRequestDecision"
              labelId="venus_claim.label.appealRequestDecison"
            />
          )}
          <FormItemNumber
            form={form}
            disabled
            precision={2}
            formName="systemCalculationAmount"
            labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
          />
          s
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={this.policyList}
            dictCode="policyNo"
            dictName="policyNo"
            formName="policyNo"
            labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={this.productList}
            dictCode="coreProductCode"
            dictName="productName"
            optionShowType="both"
            formName="productCode"
            labelId="app.navigator.task-detail-of-claim-assessment.label.product"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={this.benefitTypeList}
            dictCode="benefitTypeCode"
            dictName="benefitTypeName"
            optionShowType="both"
            formName="benefitTypeCode"
            labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
          />
          {isLife && (
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              dicts={this.benefitItemList}
              dictCode="benefitItemCode"
              dictName="benefitItemName"
              optionShowType="both"
              formName="benefitItemCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
            />
          )}
          <FormItemNumber
            form={form}
            disabled
            formName="assessorOverrideAmount"
            labelTypeCode="Label_CLM_Payable"
            labelId="AssessAmount"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={dictsOfClaimDecision}
            formName="claimDecision"
            labelTypeCode="Label_CLM_Payable"
            labelId="ClaimDecision"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || !isDeclined}
            dicts={dictsOfDenyDecision}
            required={isDeclined}
            formName="denyCode"
            labelTypeCode="Label_CLM_Payable"
            labelId="DenyReason"
          />
          <FormItemCheckbox
            form={form}
            labelTypeCode="Label_CLM_Payable"
            labelId="DenywithRescissionCheck"
            formName="denyWithRescission"
            disabled={taskNotEditable || !isDeclined}
          />
          <FormItemCheckbox
            form={form}
            labelTypeCode="Label_CLM_Payable"
            labelId="ClaimwithExGratia"
            formName="claimWithExGratia"
            disabled={taskNotEditable || !isDeclined}
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfRedFlag}
            formName="redFlag"
            labelId="RedFlag"
            labelTypeCode="Label_CLM_Payable"
          />
          <FormItemCheckbox
            form={form}
            labelTypeCode="Label_CLM_Payable"
            labelId="BeyondNEL"
            formName="beyondNel"
            disabled
          />
          <FormItemCheckbox
            form={form}
            labelTypeCode="Label_CLM_Payable"
            labelId="ContestableClaim"
            formName="contestableClaim"
            disabled={taskNotEditable}
          />
          <FormItemInput
            form={form}
            labelTypeCode="Label_CLM_Payable"
            labelId="PolicyDuration"
            formName="policyDuration"
            disabled
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            name="remark"
            formName="remark"
            labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default withContextData(ClaimPayableListItemOfLife);
