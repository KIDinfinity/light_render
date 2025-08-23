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
import { checkClaimPayableListByTypeCode } from 'claimBasicProduct/pages/validators';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { tenant } from '@/components/Tenant';
import { VLD_000402, VLD_000283HK } from 'claim/pages/validators/fieldValidators';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { DenyCode } from 'claim/pages/Enum';
import { claimPayableWithTreatmentLayout, claimPayableNoTreatmentLayout } from '../FormLayout.json';

const FORMID = 'claimPayableListItem';

@connect(
  ({
    dictionaryController,
    HKCLMOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfClaimDecision: dictionaryController.Dropdown_CLM_ClaimDecision,
    dictsOfDenyCode: dictionaryController.Dropdown_CLM_DenyCode,
    listPolicy: HKCLMOfClaimAssessmentController.listPolicy,
    dictsOfExGratiaCode: dictionaryController.Dropdown_CLM_ExGratiaCode,
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
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
            target: 'saveClaimPayableItem',
            payload: {
              changedFields,
              incidentPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
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
      remark: (value: any) => transRemarkCodeToMsg(value, true),
      claimDecision: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      exGratiaCode: (value: any) => value,
      exGratiaReason: (value: any) => value,
      denyReason: (value: any) => value,
      denyCode: (value: any) => value,
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

  policyNoChange = async (value: any) => {
    const { dispatch, incidentPayableItem, listPolicy }: any = this.props;
    const { id, policyNo } = incidentPayableItem;
    const systemCurrency = tenant.currency();
    const policyCurrency = lodash.find(
      listPolicy,
      (item) => item.policyNo === formUtils.queryValue(policyNo)
    )?.policyCurrency;
    if (!value) {
      return;
    }

    // TODO find benefitCategory
    await dispatch({
      type: 'HKCLMOfClaimAssessmentController/getExchangeRateForPolicy',
      payload: {
        policyCurrency: policyCurrency || systemCurrency,
        payableId: id,
      },
    });
    await dispatch({
      type: 'HKCLMOfClaimAssessmentController/getExchangeRateForInvoice',
      payload: {
        policyCurrency: policyCurrency || systemCurrency,
        payableId: id,
      },
    });
  };

  decisionOnChange = async (value) => {
    const { dispatch, incidentPayableItem, listPolicy }: any = this.props;
    const { policyNo, policyCurrency, exchangeRatePolicyPayout, id } = incidentPayableItem;
    const systemCurrency = tenant.currency();
    const currency =
      policyCurrency ||
      lodash.find(listPolicy, (item) => item.policyNo === formUtils.queryValue(policyNo))
        ?.policyCurrency;
    if (value !== ClaimDecision.deny && !exchangeRatePolicyPayout) {
      await dispatch({
        type: 'HKCLMOfClaimAssessmentController/getExchangeRateForPolicy',
        payload: {
          policyCurrency: currency || systemCurrency,
          payableId: id,
        },
      });
      await dispatch({
        type: 'HKCLMOfClaimAssessmentController/getExchangeRateForInvoice',
        payload: {
          policyCurrency: currency || systemCurrency,
          payableId: id,
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
      taskNotEditable,
      dictsOfExGratiaCode,
      dictsOfDenyCode,
      curIncidentPayableList,
      listPolicy,
    }: any = this.props;

    const policyNoList = this.getPolicyList();
    const productList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();
    const benefitCategoryIsL = incidentPayableItem.benefitCategory === 'L';
    const systemAmountIsEmpty = valueIsEmpty(incidentPayableItem.systemCalculationAmount);
    const isDeclined =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;
    const isNA = formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.NA;
    const isOtherDeny = formUtils.queryValue(incidentPayableItem.denyCode) === DenyCode.Other;
    const isExGratia =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.exGratia;
    const policyCurrency = incidentPayableItem?.policyCurrency;
    const productCode = form.getFieldValue('productCode');
    const benefitTypeCode = form.getFieldValue('benefitTypeCode');

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
            hiddenDropDown
            currencyCode={policyCurrency}
          />
          <FormItemCurrency
            form={form}
            disabled={taskNotEditable || !benefitCategoryIsL || isDeclined || isNA}
            required={!isDeclined && systemAmountIsEmpty && benefitCategoryIsL}
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
            cusTitle
            formName="remark"
            labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={dictsOfClaimDecision}
            formName="claimDecision"
            rules={[
              {
                validator: VLD_000283HK(incidentPayableItem, 'incident'),
              },
              {
                validator: VLD_000402(),
              },
            ]}
            onChange={this.decisionOnChange}
            labelId="app.navigator.task-detail-of-claim-assessment.label.claim-decision"
          />
          <FormItemSelect
            form={form}
            required={isDeclined}
            disabled={taskNotEditable || !isDeclined}
            dicts={dictsOfDenyCode}
            optionShowType="both"
            formName="denyCode"
            labelId="DenyCode"
          />
          <FormItemInput
            form={form}
            required={isOtherDeny}
            disabled={taskNotEditable || !isOtherDeny}
            formName="denyReason"
            labelId="DenyReason"
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
            required={!isDeclined && !productCode}
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
            required={!isNA && !isDeclined && !benefitTypeCode}
            dicts={benefitTypeList}
            dictCode="benefitTypeCode"
            dictName="benefitTypeName"
            optionShowType="both"
            formName="benefitTypeCode"
            onChange={this.policyNoChange}
            labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
            name="fieldOne"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  checkClaimPayableListByTypeCode(
                    rule,
                    value,
                    callback,
                    listPolicy,
                    curIncidentPayableList,
                    incidentPayableItem
                  ),
              },
            ]}
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ClaimPayableListItemOfBasicInfo;
