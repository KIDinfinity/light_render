/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import { claimPayableWithTreatmentLayout, InvoicePayableItemLayout } from '../FormLayout.json';
import styles from '../Benefit/BenefitPayableItem.less';
import BenefitPayableItemShort from '../Benefit/BenefitPayableItemShort';

const FORMID = 'invoicePayableListItem';

@connect(
  (
    { hbOfClaimAssessmentController, formCommonController, loading, claimEditable },
    { invoicePayableItemId }
  ) => ({
    listPolicy: hbOfClaimAssessmentController.listPolicy,
    loadingOfPolicy: loading.effects['hbOfClaimAssessmentController/queryListPolicy'],
    policyBackgrounds: formCommonController.policyBackgrounds || {},
    invoicePayableItem:
      hbOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoicePayableItemId } = props;
    dispatch({
      type: 'hbOfClaimAssessmentController/saveInvoicePayableItem',
      payload: {
        changedFields,
        invoicePayableItemId,
      },
    });
  },
  mapPropsToFields(props) {
    const { invoicePayableItem } = props;

    return formUtils.mapObjectToFields(invoicePayableItem, {
      remark: (value: any) => formatRemarkText(value),
    });
  },
})
class InvoicePayableListItem extends Component {
  handleDelete = () => {
    const { dispatch, invoicePayableItem, invoicePayableItemId } = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/removeInvoicePayableItem',
      payload: {
        treatmentPayableItemId: invoicePayableItem.treatmentPayableId,
        invoicePayableItemId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form } = this.props;
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
      loadingOfPolicy,
      invoicePayableItem,
      taskNotEditable,
    } = this.props;
    const { benefitItemPayableList } = invoicePayableItem;
    const policyNoList = this.getPolicyList();

    return (
      <CardOfClaim
        showButton={!taskNotEditable && invoicePayableItem.isAdd}
        handleClick={this.handleDelete}
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
              // {/*rules={[
              //   {
              //     pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
              //     message: 'Out of range!!',
              //   },
              // ]}*/}
            />
            <FormItemNumber
              form={form}
              disabled
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
              // {/*rules={[
              //   {
              //     pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
              //     message: 'Out of range!!',
              //   },
              // ]}*/}
            />
            <FormItemInput
              form={form}
              disabled
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
              loading={loadingOfPolicy}
            />
            <FormItemSelect
              form={form}
              disabled
              required
              formName="benefitTypeCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              labelId="venus.claim.product-name"
              dicts={policyNoList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              loading={loadingOfPolicy}
            />
          </FormLayout>
          <div className={styles.benefit_payable_bg}>
            <FormLayout json={InvoicePayableItemLayout}>
              <span className={styles.benefit_item_head}>Benefit Item</span>
              <span className={styles.benefit_item_head}>Payable Amount</span>
            </FormLayout>
            {benefitItemPayableList &&
              lodash.map(benefitItemPayableList, (item: any) => (
                <BenefitPayableItemShort
                  key={item}
                  benefitPayableItemId={item}
                  policyNoList={policyNoList}
                />
              ))}
          </div>
        </Form>
      </CardOfClaim>
    );
  }
}

export default InvoicePayableListItem;
