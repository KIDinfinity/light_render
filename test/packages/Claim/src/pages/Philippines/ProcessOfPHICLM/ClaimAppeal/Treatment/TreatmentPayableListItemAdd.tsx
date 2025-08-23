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
import { withContextData } from '@/components/_store';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import CaseCategory from 'enum/CaseCategory';
import { treatmentPayableLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItemAdd';

const mapStateToProps = (
  { PHCLMOfAppealCaseController, formCommonController, claimEditable },
  { incidentId }
) => {
  let policyNoList = [];
  // 只可选非寿险类型的保单
  const { claimEntities } = PHCLMOfAppealCaseController;
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
    policyNoList = lodash.compact([...policyNoList, obj]);
  });

  return {
    policyNoList,
    listPolicy: PHCLMOfAppealCaseController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
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
            type: 'PHCLMOfAppealCaseController/saveEntry',
            target: 'saveTreatmentPayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfAppealCaseController/saveFormData',
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
      remark: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      claimAdjustment: (value: any) => value,
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

  getProductList = () => {
    const { listPolicy, form } = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  };

  getBenefitTypeList = () => {
    const { listPolicy, form } = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];

    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[form.getFieldValue('productCode')];

    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/removeTreatmentPayableAddItem',
    });
  };

  render() {
    const { policyBackgrounds, form, policyNoList, withData, taskNotEditable } = this.props;
    const productNoList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();
    const { caseType, originalCaseCategory }: any = withData || {};

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
          <FormLayout json={treatmentPayableLayout}>
            {ECaseType.originCase !== caseType && (
              <FormItemNumber
                form={form}
                formName="claimAdjustment"
                required
                min={-Number.MAX_VALUE}
                pattern={
                  /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
                }
                formatter={fnPrecisionFormatNegative}
                name="claimAdjustment"
                disabled={taskNotEditable || CaseCategory.PH_AP_CTG01 === originalCaseCategory}
                labelId="venus_claim.label.claimAdjustment"
              />
            )}
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
            />
            <FormItemNumber
              form={form}
              formName="payableDays"
              labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
              pattern={/^\d{1,3}$/g}
            />
            <FormItemNumber
              form={form}
              formName="assessorOverrideAmount"
              labelTypeCode="Label_CLM_Payable"
              labelId="AssessAmount"
            />
            <FormItemInput
              form={form}
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default withContextData(TreatmentPayableListItemAdd);
