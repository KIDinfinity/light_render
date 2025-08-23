/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import type { ITreatment, IPolicy } from '@/dtos/claim';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import AccidentBenefitPayableList from '../AccidentBenefit/AccidentBenefitPayableList';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'treatmentPayableListItemOfAI';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  treatmentPayableItemId: string;
  treatmentPayableItem: ITreatment;
  policyBackgrounds: any;
  listPolicy: IPolicy;
  claimDecision: string;
  validating: boolean;
  claimNo: string;
}

@connect(
  (
    { daOfClaimAssessmentController, formCommonController }: any,
    { treatmentPayableItemId }: any
  ) => {
    const tempTreatment =
      daOfClaimAssessmentController.claimEntities.treatmentPayableListMap[treatmentPayableItemId];
    const claimDecision =
      daOfClaimAssessmentController.claimEntities.claimPayableListMap[tempTreatment?.payableId]
        ?.claimDecision;

    return {
      listPolicy: daOfClaimAssessmentController.listPolicy,
      policyBackgrounds: formCommonController.policyBackgrounds,
      treatmentPayableItem: tempTreatment,
      claimDecision: formUtils.queryValue(claimDecision),
      validating: formCommonController.validating,
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
      fullyClaim: (value: any) => value === 1 || value === true,
      remark: (value: any) => transRemarkCodeToMsg(value, true),
    });
  },
})
class TreatmentPayableListItemOfAI extends Component<IProps> {
  static contextTypes = {
    taskNotEditable: PropTypes.bool,
  };

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
        claimPayableItemId: treatmentPayableItem?.payableId,
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
    const { policyBackgrounds, form, treatmentPayableItem, claimDecision } = this.props;
    const { taskNotEditable } = this.context;
    const policyNoList = this.getPolicyList();
    const is_declined = claimDecision === 'D';
    return is_declined ? null : (
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
              disabled={taskNotEditable || is_declined}
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable || is_declined}
              name="remark"
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
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              formName="benefitTypeCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              labelId="venus.claim.product-name"
            />
            <FormItemNumber
              form={form}
              disabled
              name="SA"
              formName="benefitAmount"
              labelId="app.navigator.task-detail-of-claim-assessment.label.sa"
            />
            <FormItemCheckbox
              form={form}
              disabled
              formName="fullyClaim"
              labelId="app.navigator.task-detail-of-claim-assessment.label.fully-claim"
            />
          </FormLayout>
        </Form>
        <AccidentBenefitPayableList
          claimDecision={claimDecision}
          treatmentPayableId={treatmentPayableItem.id}
          policyNoList={policyNoList}
          benefitTypeCode={form.getFieldValue('benefitTypeCode')}
          policyNo={form.getFieldValue('policyNo')}
        />
      </CardOfClaim>
    );
  }
}

export default TreatmentPayableListItemOfAI;
