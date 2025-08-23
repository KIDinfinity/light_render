import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { formUtils } from 'basic/components/Form';
import { filterBenefitList } from 'claim/pages/utils/formUtils';
import { InvoicePayableItemLayout } from '../FormLayout.json';

@connect(
  (
    { daOfClaimAssessmentController, loading }: any,
    { benefitPayableItemId, policyNoList }: any
  ) => ({
    listPolicy: policyNoList,
    loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
    benefitPayableItem:
      daOfClaimAssessmentController.claimEntities.benefitItemPayableListMap[benefitPayableItemId],
  })
)
// @ts-ignore
@Form.create({
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
          filterList={filterBenefitList(listPolicy)}
          dicts={listPolicy}
          dictCode="benefitItemCode"
          dictName="benefitItemName"
          dictTypeCode="Dropdown_PRD_BenefitItem"
          optionShowType="both"
          loading={loadingOfPolicy}
        />
        <FormItemNumber form={form} required disabled formName="payableAmount" />
      </FormLayout>
    );
  }
}

export default BenefitPayableItemShort;
