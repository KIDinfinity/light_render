import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { checkTretmentPayableListByTypeCode } from 'claimBasicProduct/pages/validators';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItemAdd';

const mapStateToProps = (
  { HKCLMOfClaimAssessmentController, formCommonController },
  { incidentId }
) => {
  let policyNoList = [];
  // 只可选非寿险类型的保单
  const { claimEntities } = HKCLMOfClaimAssessmentController;
  const claimPayableListEntries = Object.entries(claimEntities.claimPayableListMap);
  const claimPayableList = [];
  lodash.map(claimPayableListEntries, (item) => {
    if (item[1].incidentId === incidentId && item[1].benefitCategory !== 'L') {
      claimPayableList.push(item[1]);
    }
  });
  const policyList = lodash.uniqBy(formUtils.cleanValidateData(claimPayableList), 'policyNo');
  lodash.map(policyList, (item) => {
    const obj = {
      policyNo: item.policyNo,
    };
    policyNoList = [...policyNoList, obj];
  });

  return {
    policyNoList,
    listPolicy: HKCLMOfClaimAssessmentController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    validating: formCommonController.validating,
    claimPayableListMap: claimEntities.claimPayableListMap,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentPayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
          target: 'saveTreatmentPayableAddItem',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { treatmentPayableItemDetail } = props;

    return formUtils.mapObjectToFields(treatmentPayableItemDetail, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => transRemarkCodeToMsg(value, true),
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
    });
  },
})
class TreatmentPayableListItemAdd extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  getSelectablePolicyList = () => {
    const { listPolicy, claimPayableListMap, treatmentPayableItemDetail } = this.props;
    const { incidentId } = treatmentPayableItemDetail;
    const selectedBenefitType: any = [];
    lodash.map(claimPayableListMap, (item) => {
      if (item.incidentId === incidentId && !lodash.isEmpty(item.benefitCategory)) {
        selectedBenefitType.push(formUtils.queryValue(item.benefitTypeCode));
      }
    });

    return lodash.filter(listPolicy, (policy) =>
      lodash.includes(selectedBenefitType, policy.benefitTypeCode)
    );
  };

  getProductList = () => {
    const { form, listPolicy, claimPayableListMap, treatmentPayableItemDetail } = this.props;
    const policyNo = form.getFieldValue('policyNo');
    const { incidentId } = treatmentPayableItemDetail;
    const selectedProduct: any = [];
    lodash.forEach(claimPayableListMap, (item) => {
      if (item.incidentId === incidentId && formUtils.queryValue(item.policyNo) === policyNo) {
        selectedProduct.push(formUtils.queryValue(item.productCode));
      }
    });
    const selectablePolicy = lodash.filter(listPolicy, (policy) =>
      lodash.includes(selectedProduct, policy.coreProductCode)
    );
    const productNoList = lodash.uniqBy(selectablePolicy, 'coreProductCode');

    return productNoList;
  };

  getBenefitTypeList = () => {
    const { form } = this.props;
    const selectablePolicy = this.getSelectablePolicyList();

    const policyGrouped = lodash.groupBy(selectablePolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];

    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[form.getFieldValue('productCode')];

    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/removeTreatmentPayableAddItem',
    });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      policyNoList,
      treatmentPayableItemDetail,
      curTreatmentPayableList,
      listPolicy,
    } = this.props;
    const productNoList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();
    const policyCurrency = treatmentPayableItemDetail?.policyCurrency;

    return (
      <CardOfClaim
        showButton
        handleClick={() => {
          this.handleDelete();
        }}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: 'var(--claim-card-treatmentpayablelistitem-bg-color)' }
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
              hiddenPrefix
              hiddenDropDown
              currencyCode={policyCurrency}
            />
            <FormItemCurrency
              form={form}
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
              hiddenPrefix
              hiddenDropDown
              suffixEditable={false}
              currencyCode={policyCurrency}
            />
            <FormItemInput
              form={form}
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
            <FormItemSelect
              form={form}
              required
              dicts={policyNoList}
              dictCode="policyNo"
              dictName="policyNo"
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
            />
            <FormItemSelect
              form={form}
              required
              dicts={productNoList}
              dictCode="coreProductCode"
              dictName="productName"
              optionShowType="both"
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
            />
            <FormItemSelect
              form={form}
              required
              dicts={benefitTypeList}
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
                      treatmentPayableItemDetail
                    ),
                },
              ]}
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default TreatmentPayableListItemAdd;
