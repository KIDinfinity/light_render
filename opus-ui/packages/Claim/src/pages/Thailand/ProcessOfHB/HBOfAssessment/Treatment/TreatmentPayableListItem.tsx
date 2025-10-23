/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import type { ITreatment, IPolicy } from '@/dtos/claim';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  treatmentPayableItemId: string;
  treatmentPayableItem: ITreatment;
  policyBackgrounds: any;
  loadingOfPolicy: boolean;
  listPolicy: IPolicy;
  claimDecision: string;
}

@connect(
  (
    { hbOfClaimAssessmentController, formCommonController, loading, claimEditable }: any,
    { treatmentPayableItemId }: any
  ) => {
    const tempTreatment =
      hbOfClaimAssessmentController.claimEntities.treatmentPayableListMap[treatmentPayableItemId];
    const { claimDecision } =
      hbOfClaimAssessmentController.claimEntities.claimPayableListMap[tempTreatment.payableId] ||
      {};

    return {
      listPolicy: hbOfClaimAssessmentController.listPolicy,
      loadingOfPolicy: loading.effects['hbOfClaimAssessmentController/queryListPolicy'],
      policyBackgrounds: formCommonController.policyBackgrounds || {},
      treatmentPayableItem: tempTreatment,
      claimDecision,
      taskNotEditable: claimEditable.taskNotEditable,
    };
  }
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, treatmentPayableItemId } = props;
    dispatch({
      type: 'hbOfClaimAssessmentController/saveTreatmentPayableItem',
      payload: {
        changedFields,
        treatmentPayableItemId,
      },
    });
  },
  mapPropsToFields(props) {
    const { treatmentPayableItem } = props;

    return formUtils.mapObjectToFields(treatmentPayableItem, {
      remark: (value: any) => formatRemarkText(value),
    });
  },
})
class TreatmentPayableListItem extends Component<IProps> {
  handleDelete = () => {
    const { dispatch, treatmentPayableItemId, treatmentPayableItem } = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/removeTreatmentPayableItem',
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
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );
    return policyList;
  };

  render() {
    const {
      policyBackgrounds,
      form,
      loadingOfPolicy,
      treatmentPayableItem,
      taskNotEditable,
    } = this.props;
    const policyNoList = this.getPolicyList();

    return (
      <CardOfClaim
        showButton={!taskNotEditable && treatmentPayableItem.isAdd}
        handleClick={this.handleDelete}
        cardStyle={
          form.getFieldValue('policyNo') && policyBackgrounds
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
              disabled
              required
              dicts={policyNoList}
              loading={loadingOfPolicy}
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
              min={0}
              max={999}
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default TreatmentPayableListItem;
