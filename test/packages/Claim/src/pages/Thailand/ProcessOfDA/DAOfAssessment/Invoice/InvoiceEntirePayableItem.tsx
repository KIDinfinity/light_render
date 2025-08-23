/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import { Validator } from 'basic/components/Form';
import type { IInvoicePayable, IPolicy } from '@/dtos/claim';
import { getDeductPolicy } from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_models/functions/getDeductPolicy';
import BenefitPayableList from '../Benefit/BenefitPayableList';
import { InvoiceEntirePayableItemLayout } from '../FormLayout.json';
import { ClaimDecision as enumClaimDecision } from '../_models/dto';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';

const FORMID = 'BenefitPayableItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  invoicePayableItemId: string;
  invoicePayableItemNextId: string;
  invoicePayableItem: IInvoicePayable;
  listPolicy: IPolicy[any];
  loadingOfPolicy: boolean;
  policyBackgrounds: object;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  validating: boolean;
}
@connect(
  (
    { daOfClaimAssessmentController, formCommonController, loading, claimEditable }: any,
    { invoicePayableItemId }: any
  ) => ({
    daOfClaimAssessmentController,
    listPolicy: daOfClaimAssessmentController.listPolicy,
    loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
    policyBackgrounds: formCommonController.policyBackgrounds,
    invoicePayableItem:
      daOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    claimDecision:
      daOfClaimAssessmentController.claimEntities.claimPayableListMap[
        daOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId]
          ?.payableId
      ]?.claimDecision,
    benefitItemPayableListMap:
      daOfClaimAssessmentController.claimEntities.benefitItemPayableListMap,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoicePayableItemId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveInvoicePayableItem',
            payload: {
              changedFields,
              invoicePayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveInvoicePayableItem',
          payload: {
            changedFields,
            invoicePayableItemId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { invoicePayableItem }: any = props;

    return formUtils.mapObjectToFields(invoicePayableItem, {
      policyNo: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      payableAmountBeforeDeductible: (value: any) => value,
      remark: (value: any) => transRemarkCodeToMsg(value, true),
    });
  },
})
class InvoiceEntirePayableItem extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, invoicePayableItem }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItem.id}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, invoicePayableItem } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItem.id}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, invoicePayableItem, invoicePayableItemId } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/deleteInvoicePayableItem',
      payload: {
        treatmentPayableItemId: invoicePayableItem.treatmentPayableId,
        invoicePayableItemId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form } = this.props;
    return (
      lodash
        .chain(listPolicy)
        .compact()
        .filter(
          (item: IPolicy) =>
            item.policyNo === form.getFieldValue('policyNo') &&
            item.coreProductCode === form.getFieldValue('productCode') &&
            item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
        )
        // .unionBy('policyNo')
        .value()
    );
  };

  render() {
    const {
      policyBackgrounds,
      form,
      loadingOfPolicy,
      incidentId,
      treatmentId,
      invoiceId,
      invoicePayableItemId,
      invoicePayableItemNextId,
      invoicePayableItem,
      taskNotEditable,
      claimDecision,
      benefitItemPayableListMap,
    } = this.props;
    const listPolicy = this.getPolicyList();
    const isDeny = formUtils.queryValue(claimDecision) === enumClaimDecision.deny;
    const isDeductPolicyY = getDeductPolicy(listPolicy, benefitItemPayableListMap);
    return isDeny ? null : (
      <CardOfClaim
        handleClick={this.handleDelete}
        cardStyle={
          form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={InvoiceEntirePayableItemLayout}>
            <FormItemSelect
              form={form}
              required
              disabled
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.label.plicy-no"
              dicts={listPolicy}
              dictCode="policyNo"
              dictName="policyNo"
              loading={loadingOfPolicy}
            />
            <FormItemSelect
              form={form}
              disabled
              required
              formName="benefitTypeCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              labelId="venus.claim.product-name"
              dicts={listPolicy}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              loading={loadingOfPolicy}
            />
            <FormItemNumber
              form={form}
              disabled
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
              rules={[
                {
                  pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
                  message: 'Out of range!!',
                },
              ]}
            />
            <FormItemNumber
              form={form}
              disabled
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
              rules={[
                {
                  pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
                  message: 'Out of range!!',
                },
              ]}
            />
            {isDeductPolicyY && (
              <FormItemNumber
                form={form}
                disabled
                formName="payableAmountBeforeDeductible"
                labelId="AmountBeforeDeductible"
                precision={2}
              />
            )}
            {isDeductPolicyY && (
              <FormItemNumber
                form={form}
                disabled={taskNotEditable}
                formName="deductibleNetExpense"
                labelId="app.navigator.task-detail-of-claim-assessment.label.deductible-amount"
                precision={2}
                rules={[{ validator: Validator.VLD_000736(invoicePayableItem) }]}
              />
            )}
            {isDeductPolicyY && (
              <FormItemNumber
                form={form}
                disabled={taskNotEditable}
                formName="deductibleOtherInsurerDeduction"
                labelId="DeductibleOtherInsurer"
                precision={2}
              />
            )}
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              name="remark"
              formName="remark"
              maxLength={240}
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
          </FormLayout>
        </Form>
        <BenefitPayableList
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
          listPolicy={listPolicy}
          invoicePayableId={invoicePayableItemId}
          invoicePayableItem={invoicePayableItem}
          invoicePayableItemNextId={invoicePayableItemNextId}
        />
      </CardOfClaim>
    );
  }
}

export default InvoiceEntirePayableItem;
