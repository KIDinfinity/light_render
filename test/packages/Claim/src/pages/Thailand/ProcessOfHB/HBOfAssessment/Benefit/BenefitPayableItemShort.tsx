import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { formUtils } from 'basic/components/Form';
import { InvoicePayableItemLayout } from '../FormLayout.json';

@connect(
  (
    { hbOfClaimAssessmentController, loading }: any,
    { benefitPayableItemId, policyNoList }: any
  ) => ({
    listPolicy: policyNoList,
    loadingOfPolicy: loading.effects['hbOfClaimAssessmentController/queryListPolicy'],
    benefitPayableItem:
      hbOfClaimAssessmentController.claimEntities.benefitItemPayableListMap[benefitPayableItemId],
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props: any, changedFields: any) {},
  mapPropsToFields(props: any) {
    const { benefitPayableItem } = props;

    return formUtils.mapObjectToFields(benefitPayableItem, {
      benefitItemCode: (value: any) => value,
      payableAmount: (value: any) => value,
    });
  },
})
class BenefitPayableItemShort extends Component {
  render() {
    const { form, loadingOfPolicy, listPolicy }: any = this.props;

    return (
      <FormLayout json={InvoicePayableItemLayout}>
        <FormItemSelect
          form={form}
          disabled
          required
          formName="benefitItemCode"
          dicts={listPolicy}
          dictCode="benefitItemCode"
          dictTypeCode="Dropdown_PRD_BenefitItem"
          dictName="benefitItemName"
          optionShowType="both"
          loading={loadingOfPolicy}
        />
        <FormItemNumber form={form} required disabled formName="payableAmount" />
      </FormLayout>
    );
  }
}

export default BenefitPayableItemShort;
