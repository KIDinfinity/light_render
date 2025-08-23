/* eslint-disable import/named */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash, { get } from 'lodash';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { isNoImplementPolicy } from 'claim/pages/Japan/ProcessOfJPCLM/utils/expectDecisionUtils';
import { VLD_000060BenefitItemCode } from 'claim/pages/validators/fieldValidators';
import json from '../FormLayout.json';

const FORMID = 'treatmentPayableListItem';

@connect(
  (
    { JPCLMOfClaimAssessmentController, formCommonController, claimEditable },
    { treatmentPayableItemId }
  ) => {
    const tempTreatment =
      JPCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap[
        treatmentPayableItemId
      ];
    return {
      listPolicy: JPCLMOfClaimAssessmentController.listPolicy,
      policyBackgrounds: JPCLMOfClaimAssessmentController?.policyBackgrounds,
      treatmentPayableItem: tempTreatment,
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
      treatmentPayableListMap:
        JPCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap,
      incidentPayableItem: get(
        JPCLMOfClaimAssessmentController,
        `claimEntities.claimPayableListMap[${tempTreatment.payableId}]`,
        {}
      ),
    };
  }
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, treatmentPayableItemId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
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
      remark: (value) => transRemarkCodeToMsg(value),
      // benefitTypeCode: value => (value === 'none' ? '' : value),
    });
  },
})
class TreatmentListItemOfPayableListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, treatmentPayableItemId } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID}-${treatmentPayableItemId}`,
        },
      });
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentPayableItemId } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID}-${treatmentPayableItemId}`,
        },
      });
    });
  };

  handleDelete = () => {
    const { dispatch, treatmentPayableItemId, treatmentPayableItem } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/deleteTreatmentPayableItem',
      payload: {
        claimPayableItemId: treatmentPayableItem.payableId,
        treatmentPayableItemId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form } = this.props;

    const policyList = listPolicy?.filter?.(
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return lodash.uniqBy(policyList, 'benefitItemCode');
  };

  render() {
    const {
      form,
      taskNotEditable,
      policyBackgrounds,
      incidentPayableItem,
      treatmentPayableListMap,
    } = this.props;
    const policyNoList = this.getPolicyList();
    const isNoBelong = isNoImplementPolicy(incidentPayableItem?.policySetupStatus);
    const isDeclined =
      formUtils.queryValue(incidentPayableItem?.claimDecision) === ClaimDecision.deny;

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        cardStyle={
          form.getFieldValue('policyNo') && policyBackgrounds
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
              disabled={taskNotEditable || isDeclined}
              formName="assessorOverrideAmount"
              precision={0}
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
              optionShowType="name"
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
            />
            <FormItemSelect
              form={form}
              disabled
              dicts={policyNoList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="name"
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || isNoBelong}
              dicts={policyNoList}
              dictCode="benefitItemCode"
              dictName="benefitItemName"
              optionShowType="name"
              formName="benefitItemCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
              rules={[
                {
                  validator: VLD_000060BenefitItemCode(
                    treatmentPayableListMap,
                    incidentPayableItem
                  ),
                },
              ]}
            />
            <FormItemNumber
              form={form}
              disabled
              formName="systemPayableDays"
              precision={0}
              labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
              pattern={/^\d{1,3}$/g}
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || isNoBelong || isDeclined}
              precision={0}
              formName="assessorOverrideDays"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessor-override-days"
              pattern={/^\d{1,3}$/g}
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
              disabled={taskNotEditable || isNoBelong || isDeclined}
              formName="assessorOverrideMultiple"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessor-override-percentage"
              name="row6"
              pattern={/^\d{1,2}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
            />
            <FormItemNumber
              form={form}
              disabled
              precision={0}
              formName="systemDeductibleAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.deductible-amount"
              name="row4"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || isNoBelong || isDeclined}
              precision={0}
              formName="assessorOverrideDeductible"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessor-override-deductible"
              // pattern={/^\d{1,2}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
              name="row6"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default TreatmentListItemOfPayableListItem;
