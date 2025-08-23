import React, { PureComponent } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { claimPayableWithTreatmentLayout, claimPayableNoTreatmentLayout } from '../FormLayout.json';

const FORMID = 'claimPayableListItem';

@connect(
  ({
    dictionaryController,
    bpOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfClaimDecision: dictionaryController.Dropdown_CLM_ClaimDecision,
    dictsOfExGratiaCode: dictionaryController.Dropdown_CLM_ExGratiaCode,
    listPolicy: bpOfClaimAssessmentController.listPolicy,
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
          dispatch({
            type: 'bpOfClaimAssessmentController/saveEntry',
            target: 'saveClaimPayableItem',
            payload: {
              changedFields,
              incidentPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfClaimAssessmentController/saveFormData',
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

    return formUtils.mapObjectToFields(incidentPayableItem, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => value,
      claimDecision: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      exGratiaCode: (value: any) => value,
      exGratiaReason: (value: any) => value,
    });
  },
})
class ClaimPayableListItemOfBasicInfo extends PureComponent {
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
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  };

  getBenefitTypeList = () => {
    const { listPolicy, form }: any = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[form.getFieldValue('productCode')];
    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
  };

  render() {
    const {
      form,
      dictsOfClaimDecision,
      incidentPayableItem,
      hasTreatment,
      taskNotEditable,
      dictsOfExGratiaCode,
    }: any = this.props;

    const policyNoList = this.getPolicyList();
    const productList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();
    const benefitCategoryIsL = incidentPayableItem.benefitCategory === 'L';
    const systemAmountIsEmpty = valueIsEmpty(incidentPayableItem.systemCalculationAmount);
    const isDeclined =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;
    const isExGratia =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.exGratia;

    return (
      <Form layout="vertical">
        <FormLayout
          json={hasTreatment ? claimPayableWithTreatmentLayout : claimPayableNoTreatmentLayout}
        >
          <FormItemCurrency
            form={form}
            disabled
            formName="systemCalculationAmount"
            labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
            hiddenPrefix
          />
          <FormItemCurrency
            form={form}
            disabled={taskNotEditable || !benefitCategoryIsL || isDeclined}
            required={!isDeclined && systemAmountIsEmpty && benefitCategoryIsL}
            formName="assessorOverrideAmount"
            labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
            hiddenPrefix
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
            disabled={taskNotEditable}
            required
            dicts={dictsOfClaimDecision}
            formName="claimDecision"
            labelId="app.navigator.task-detail-of-claim-assessment.label.claim-decision"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || !isExGratia}
            required={isExGratia}
            dicts={dictsOfExGratiaCode}
            optionShowType="both"
            formName="exGratiaCode"
            labelId="ExGratiaCode"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable || !isExGratia}
            formName="exGratiaReason"
            labelId="ExGratiaReason"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={policyNoList}
            dictCode="policyNo"
            dictName="policyNo"
            formName="policyNo"
            labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={productList}
            dictCode="coreProductCode"
            dictName="productName"
            optionShowType="both"
            formName="productCode"
            labelId="app.navigator.task-detail-of-claim-assessment.label.product"
            name="fieldOne"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={benefitTypeList}
            dictCode="benefitTypeCode"
            dictName="benefitTypeName"
            optionShowType="both"
            formName="benefitTypeCode"
            labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
            name="fieldOne"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ClaimPayableListItemOfBasicInfo;
