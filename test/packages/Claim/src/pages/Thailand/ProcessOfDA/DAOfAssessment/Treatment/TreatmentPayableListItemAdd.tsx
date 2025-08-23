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
import { filterBenefitList } from 'claim/pages/utils/formUtils';
import { getTreatmentPayableList } from 'claim/pages/utils/selector';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItemAdd';

const mapStateToProps = (
  {
    daOfClaimAssessmentController,
    loading,
    dictionaryController,
    formCommonController,
    claimEditable,
  }: any,
  { incidentId, treatmentId }: any
) => {
  let policyNoList: any = [];
  // 只可选非寿险类型的保单
  const { claimEntities } = daOfClaimAssessmentController;
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
    listPolicy: daOfClaimAssessmentController.listPolicy,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
    curTreatmentPayableList: getTreatmentPayableList(
      treatmentId,
      daOfClaimAssessmentController.claimEntities.treatmentPayableListMap
    ),
    treatmentPayableListMap: daOfClaimAssessmentController.claimEntities.treatmentPayableListMap,
    policyBackgrounds: formCommonController.policyBackgrounds,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentPayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
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
      remark: (value: any) => formatRemarkText(value),
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
    const { dispatch, form }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form }: any = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  getProductList = () => {
    const { listPolicy, form }: any = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'benefitTypeCode');

    return productNoList;
  };

  getBenefitItemPolicyList = () => {
    const { listPolicy, form }: any = this.props;
    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );
    return policyList;
  };

  handleDelete = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/removeTreatmentPayableAddItem',
    });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      loadingOfPolicy,
      policyNoList,
      treatmentPayableListMap,
      taskNotEditable,
    }: any = this.props;

    const productNoList = this.getProductList();

    const benefitItemCodeAdded: string[] = [];
    lodash.forEach(lodash.values(treatmentPayableListMap), (item: any) => {
      benefitItemCodeAdded.push(formUtils.queryValue(item.benefitItemCode));
    });
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
              disabled={taskNotEditable}
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
              disabled={taskNotEditable}
              dicts={productNoList}
              loading={loadingOfPolicy}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              formName="benefitTypeCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              labelId="venus.claim.product-name"
            />
            <FormItemSelect
              form={form}
              required
              dicts={this.getBenefitItemPolicyList()}
              loading={loadingOfPolicy}
              dictCode="benefitItemCode"
              dictTypeCode="Dropdown_PRD_BenefitItem"
              dictName="benefitItemName"
              optionShowType="both"
              existCodes={benefitItemCodeAdded}
              filterList={filterBenefitList(policyNoList)}
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
