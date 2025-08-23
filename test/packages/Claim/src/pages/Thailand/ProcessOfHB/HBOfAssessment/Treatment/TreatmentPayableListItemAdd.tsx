/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItemAdd';

const mapStateToProps = (
  {
    hbOfClaimAssessmentController,
    loading,
    dictionaryController,
    formCommonController,
    claimEditable,
  }: any,
  { incidentId }: any
) => {
  let policyNoList: any = [];
  // 只可选非寿险类型的保单
  const { claimEntities } = hbOfClaimAssessmentController;
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
    listPolicy: hbOfClaimAssessmentController.listPolicy,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    loadingOfPolicy: loading.effects['hbOfClaimAssessmentController/queryListPolicy'],
    policyBackgrounds: formCommonController.policyBackgrounds,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;
    dispatch({
      type: 'hbOfClaimAssessmentController/saveTreatmentPayableAddItem',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { treatmentPayableItemDetail } = props;
    return formUtils.mapObjectToFields(treatmentPayableItemDetail, {
      remark: (value: any) => value,
    });
  },
})
class TreatmentPayableListItemAdd extends Component {
  getProductList = () => {
    const { listPolicy, form }: any = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  };

  handleDelete = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/removeTreatmentPayableAddItem',
    });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      loadingOfPolicy,
      policyNoList,
      taskNotEditable,
    }: any = this.props;

    const productNoList = this.getProductList();

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
          <FormLayout json={claimPayableWithTreatmentLayout}>
            <FormItemNumber
              form={form}
              disabled
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
            />
            <FormItemInput
              form={form}
              disabled
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
            <FormItemSelect
              form={form}
              required
              disabled
              dicts={policyNoList}
              loading={loadingOfPolicy}
              dictCode="policyNo"
              dictName="policyNo"
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
            />
            <FormItemSelect
              form={form}
              required
              disabled
              dicts={productNoList}
              loading={loadingOfPolicy}
              dictCode="coreProductCode"
              dictName="benefitTypeName"
              formName="productCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              labelId="venus.claim.product-name"
            />
            <FormItemSelect
              form={form}
              required
              disabled
              dicts={policyNoList}
              loading={loadingOfPolicy}
              dictCode="benefitItemCode"
              dictTypeCode="Dropdown_PRD_BenefitItem"
              dictName="benefitItemName"
              optionShowType="both"
              formName="benefitItemCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="payableDays"
              labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
              pattern={/^\d{1,3}$/g}
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default TreatmentPayableListItemAdd;
