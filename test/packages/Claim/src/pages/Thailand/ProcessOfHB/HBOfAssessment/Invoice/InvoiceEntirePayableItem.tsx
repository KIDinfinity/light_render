/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import type { IInvoicePayable, IPolicy } from '@/dtos/claim';
import { InvoiceEntirePayableItemLayout } from '../FormLayout.json';
import BenefitPayableList from '../Benefit/BenefitPayableList';

const FORMID = 'BenefitPayableItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  invoicePayableItemId: string;
  invoicePayableItemNextId: string;
  invoicePayableItem: IInvoicePayable;
  listPolicy: IPolicy[];
  loadingOfPolicy: boolean;
  policyBackgrounds: object;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
}
@connect(
  (
    { hbOfClaimAssessmentController, formCommonController, loading }: any,
    { invoicePayableItemId }: any
  ) => ({
    hbOfClaimAssessmentController,
    listPolicy: hbOfClaimAssessmentController.listPolicy,
    loadingOfPolicy: loading.effects['hbOfClaimAssessmentController/queryListPolicy'],
    policyBackgrounds: formCommonController.policyBackgrounds,
    invoicePayableItem:
      hbOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId],
  })
)
// @ts-ignore
@Form.create<IProps>({
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
    const { invoicePayableItem }: any = props;

    return formUtils.mapObjectToFields(invoicePayableItem, {
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => formatRemarkText(value),
    });
  },
})
class InvoiceEntirePayableItem extends Component<IProps> {
  handleDelete = () => {
    const { dispatch, invoicePayableItem, invoicePayableItemId } = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/deleteInvoicePayableItem',
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
    } = this.props;
    const listPolicy = this.getPolicyList();

    return (
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
              // rules={[
              //   {
              //     pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
              //     message: 'Out of range!!',
              //   },
              // ]}
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
