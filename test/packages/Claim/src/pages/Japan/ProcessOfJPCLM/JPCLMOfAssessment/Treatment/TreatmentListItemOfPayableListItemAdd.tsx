/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';

import { FormItemInput, FormItemSelect, FormItemNumber, formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { BenefitCategory } from 'claim/pages/utils/claim';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { isNoImplementPolicy } from 'claim/pages/Japan/ProcessOfJPCLM/utils/expectDecisionUtils';
import { VLD_000060BenefitItemCode } from 'claim/pages/validators/fieldValidators';
import json from '../FormLayout.json';

const FORMID = 'treatmentPayableListItemAdd';

const checkPayableIsNoLife = (payable) =>
  payable.benefitCategory && payable.benefitCategory !== BenefitCategory.life;
const checkPayableIsNoImplement = (payable) =>
  payable.policySetupStatus === PolicySetupStatus.NoImplement && payable.productCode;

@connect(({ JPCLMOfClaimAssessmentController, formCommonController, claimEditable }) => ({
  claimPayableListMap: JPCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
  listPolicy: JPCLMOfClaimAssessmentController.listPolicy,
  policyBackgrounds: JPCLMOfClaimAssessmentController?.policyBackgrounds,
  validating: formCommonController.validating,
  taskNotEditable: claimEditable.taskNotEditable,
  treatmentPayableListMap: JPCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap,
}))
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentPayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
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
      remark: (value) => transRemarkCodeToMsg(value),
      // benefitTypeCode: value => (value === 'none' ? '' : value),
    });
  },
})
class TreatmentItemPayableItemAdd extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  getPolicyNoList = () => {
    const { claimPayableListMap, incidentId } = this.props;
    const policyNoList = [];
    // 只可选非寿险类型的保单或RCS未配置的保单
    lodash.forEach(claimPayableListMap, (item) => {
      if (
        item.incidentId === incidentId &&
        (checkPayableIsNoLife(item) || checkPayableIsNoImplement(item))
      ) {
        policyNoList.push({
          policyNo: formUtils.queryValue(item.policyNo),
        });
      }
    });

    return lodash.uniqBy(policyNoList, 'policyNo');
  };

  getSelectablePolicyList = () => {
    const { listPolicy, claimPayableListMap, treatmentPayableItemDetail } = this.props;
    const { incidentId } = treatmentPayableItemDetail;
    const selectedBenefitType = [];
    lodash.map(claimPayableListMap, (item) => {
      if (
        item.incidentId === incidentId &&
        !lodash.isEmpty(item.benefitCategory) &&
        item.benefitCategory !== BenefitCategory.life
      ) {
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
    const selectedProduct = [];
    lodash.forEach(claimPayableListMap, (item) => {
      if (
        item.incidentId === incidentId &&
        formUtils.queryValue(item.policyNo) === policyNo &&
        (checkPayableIsNoLife(item) || checkPayableIsNoImplement(item))
      ) {
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
    const { form, treatmentPayableItemDetail } = this.props;
    const selectablePolicy = this.getSelectablePolicyList();

    const policyGrouped = lodash.groupBy(selectablePolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];

    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[form.getFieldValue('productCode')];

    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');
    const isNoImplement = isNoImplementPolicy(treatmentPayableItemDetail?.policySetupStatus);
    if (isNoImplement) {
      benefitTypeList.push({ benefitTypeCode: 'none', benefitTypeName: '' });
    }
    return benefitTypeList;
  };

  getBenefitItemList = () => {
    const { form } = this.props;
    const selectablePolicy = this.getSelectablePolicyList();
    const policyList = lodash.filter(
      selectablePolicy,
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return lodash.uniqBy(policyList, 'benefitItemCode');
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/deleteTreatmentPayableAddItem',
    });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      taskNotEditable,
      treatmentPayableItemDetail,
      treatmentPayableListMap,
    } = this.props;
    const policyNoList = this.getPolicyNoList();

    const productNoList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();

    const benefitItemList = this.getBenefitItemList();

    const isNoBelong = isNoImplementPolicy(treatmentPayableItemDetail?.policySetupStatus);

    // const benefitCategoryIsCashBenefit = treatmentPayableItemDetail?.benefitCategory === 'C';

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={() => {
          this.handleDelete();
        }}
        cardStyle={
          form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemNumber
              form={form}
              disabled
              precision={0}
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              name="row24"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
            <FormItemSelect
              form={form}
              required
              disabled={taskNotEditable}
              dicts={policyNoList}
              dictCode="policyNo"
              dictName="policyNo"
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
            />
            <FormItemSelect
              form={form}
              required
              disabled={taskNotEditable}
              dicts={productNoList}
              dictCode="coreProductCode"
              dictName="productName"
              optionShowType="name"
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isNoBelong}
              dicts={benefitTypeList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="name"
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              dicts={benefitItemList}
              dictCode="benefitItemCode"
              dictName="benefitItemName"
              optionShowType="name"
              formName="benefitItemCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
              rules={[
                {
                  validator: VLD_000060BenefitItemCode(
                    treatmentPayableListMap,
                    treatmentPayableItemDetail
                  ),
                },
              ]}
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="payableDays"
              labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
              pattern={/^\d{3}$/g}
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="assessorOverrideDays"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessor-override-days"
              pattern={/^\d{3}$/g}
            />
            <FormItemNumber
              form={form}
              disabled
              formName="reimbursementMultiple"
              labelId="app.navigator.task-detail-of-data-capture.label.reimbursement-percentage"
              pattern={/^\d{1,2}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
              name="row4"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              formName="assessorOverrideMultiple"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessor-override-percentage"
              pattern={/^\d{1,2}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
              name="row6"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="deductibleAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.deductible-amount"
              name="row4"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="assessorOverrideDeductible"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessor-override-deductible"
              name="row6"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default TreatmentItemPayableItemAdd;
