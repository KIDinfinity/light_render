import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';
import { formUtils } from 'basic/components/Form';
import styles from '../Benefit/BenefitPayableItem.less';
import BenefitPayableList from '../Benefit/BenefitPayableList';

const FORMID = 'invoicePayableListItem';

@connect(
  (
    { PHCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { invoicePayableItemId }: any
  ) => ({
    listPolicy: PHCLMOfClaimAssessmentController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    invoicePayableItem:
      PHCLMOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    submited: formCommonController.submited,
    claimDecision:
      PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap[
        PHCLMOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId]
          .payableId
      ].claimDecision,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoicePayableItemId, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveInvoicePayableItem',
            payload: {
              changedFields,
              invoicePayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
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
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
    });
  },
})
class InvoicePayableListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, invoicePayableItemId }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItemId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, invoicePayableItemId }: any = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItemId}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, invoicePayableItem, invoicePayableItemId }: any = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/removeInvoicePayableItem',
      payload: {
        treatmentPayableItemId: invoicePayableItem.treatmentPayableId,
        invoicePayableItemId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form }: any = this.props;

    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return policyList;
  };

  render() {
    const {
      policyBackgrounds,
      form,
      taskNotEditable,
      invoicePayableItem,
      invoicePayableItemId,
    }: any = this.props;
    const benefitItemPayableList = invoicePayableItem?.benefitItemPayableList;
    const policyNoList = this.getPolicyList();
    return (
      <CardOfClaim
        showButton={!taskNotEditable && !invoicePayableItem.registered}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
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
            <FormItemSelect
              form={form}
              disabled
              required
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.label.plicy-no"
              dicts={policyNoList}
              dictCode="policyNo"
              dictName="policyNo"
            />
            <FormItemSelect
              form={form}
              disabled
              required
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
              dicts={policyNoList}
              dictCode="coreProductCode"
              dictName="productName"
              optionShowType="both"
            />
            <FormItemSelect
              form={form}
              disabled
              required
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
              dicts={policyNoList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="both"
              name="remark"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
          </FormLayout>
        </Form>
        <div className={styles.benefit_payable_bg}>
          <BenefitPayableList invoicePayableId={invoicePayableItemId} policyNoList={policyNoList} />
        </div>
      </CardOfClaim>
    );
  }
}

export default InvoicePayableListItem;
