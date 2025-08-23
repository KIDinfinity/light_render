/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import { filterBenefitList } from 'claim/pages/utils/formUtils';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
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
  validating: boolean;
}

@connect(
  (
    { daOfClaimAssessmentController, formCommonController, loading, claimEditable }: any,
    { treatmentPayableItemId }: any
  ) => {
    const tempTreatment =
      daOfClaimAssessmentController.claimEntities.treatmentPayableListMap[treatmentPayableItemId];
    const claimDecision =
      daOfClaimAssessmentController.claimEntities.claimPayableListMap[tempTreatment?.payableId]
        ?.claimDecision;

    return {
      listPolicy: daOfClaimAssessmentController.listPolicy,
      loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
      policyBackgrounds: formCommonController.policyBackgrounds,
      treatmentPayableItem: tempTreatment,
      claimDecision: formUtils.queryValue(claimDecision),
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
    };
  }
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, treatmentPayableItemId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId,
              id: treatmentPayableItemId,
              sectionName: 'treatmentPayableListMap',
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveTreatmentPayableItem',
          payload: {
            changedFields,
            treatmentPayableItemId,
            id: treatmentPayableItemId,
            sectionName: 'treatmentPayableListMap',
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { treatmentPayableItem } = props;
    return formUtils.mapObjectToFields(treatmentPayableItem, {
      remark: (value: any) => transRemarkCodeToMsg(value, true),
    });
  },
})
class TreatmentPayableListItem extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, treatmentPayableItemId } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${treatmentPayableItemId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentPayableItemId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${treatmentPayableItemId}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, treatmentPayableItemId, treatmentPayableItem } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/removeTreatmentPayableItem',
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

  handleBenefitItemCode = (e: any) => {
    const { dispatch, treatmentPayableItem } = this.props;
    const params = formUtils.cleanValidateData({ ...treatmentPayableItem, ...e });

    if (params.benefitItemCode)
      params.payableDays = lodash.isFinite(params.payableDays) ? params.payableDays : 1;
    dispatch({
      type: 'daOfClaimAssessmentController/getOverrideAmount',
      payload: { params },
    });
  };

  handlePayableDays = (e: any) => {
    const { dispatch, treatmentPayableItem } = this.props;

    const params = formUtils.cleanValidateData({ ...treatmentPayableItem, ...e });

    if (params.benefitItemCode && lodash.isNumber(params.payableDays))
      dispatch({
        type: 'daOfClaimAssessmentController/getOverrideAmount',
        payload: { params },
      });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      loadingOfPolicy,
      treatmentPayableItem,
      claimDecision,
      taskNotEditable,
    } = this.props;
    const policyNoList = this.getPolicyList();
    const systemAmountIsEmpty = valueIsEmpty(treatmentPayableItem.systemCalculationAmount);
    const isDeclined = claimDecision === 'D';
    return isDeclined ? null : (
      <CardOfClaim
        showButton={!taskNotEditable && treatmentPayableItem?.manualAdd === 'Y'}
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
              disabled={taskNotEditable || isDeclined}
              requiredTriggerValidate
              required={systemAmountIsEmpty}
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable || isDeclined}
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
              disabled={taskNotEditable || isDeclined}
              dicts={policyNoList}
              loading={loadingOfPolicy}
              dictCode="benefitItemCode"
              dictTypeCode="Dropdown_PRD_BenefitItem"
              dictName="benefitItemName"
              optionShowType="both"
              filterList={filterBenefitList(policyNoList)}
              formName="benefitItemCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
              onChange={(e: any) => {
                this.handleBenefitItemCode({ benefitItemCode: e });
              }}
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable || isDeclined}
              formName="payableDays"
              precision={0}
              labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
              onChange={(e: any) => {
                this.handlePayableDays({ payableDays: e });
              }}
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
