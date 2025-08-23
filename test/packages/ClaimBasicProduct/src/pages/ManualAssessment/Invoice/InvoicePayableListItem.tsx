import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'invoicePayableListItem';

@connect(
  (
    { bpOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { invoicePayableItemId }: any
  ) => ({
    listPolicy: bpOfClaimAssessmentController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    invoicePayableItem:
      bpOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
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
            type: 'bpOfClaimAssessmentController/saveEntry',
            target: 'saveInvoicePayableItem',
            payload: {
              changedFields,
              invoicePayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfClaimAssessmentController/saveFormData',
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
      type: 'bpOfClaimAssessmentController/removeInvoicePayableItem',
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
    const { policyBackgrounds, form, taskNotEditable }: any = this.props;
    const policyNoList = this.getPolicyList();

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            <FormItemCurrency
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
              hiddenPrefix
            />
            <FormItemCurrency
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
              hiddenPrefix
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              name="remark"
              formName="remark"
              maxLength={240}
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
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
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default InvoicePayableListItem;
