/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import { add } from '@/utils/precisionUtils';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';

import type { IInvoice } from '@/dtos/claim';

import { InvoiceListItemOfBasicInfoLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'InvoiceListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  invoiceItem: IInvoice;
}

const mapStateToProps = (
  { hbOfClaimAssessmentController, claimEditable }: any,
  { invoiceItem }: any
) => {
  const serviceItemList = lodash.get(
    hbOfClaimAssessmentController,
    `claimEntities.invoiceListMap.${invoiceItem.id}.serviceItemList`
  );
  const totalExpense = lodash
    .filter(lodash.get(hbOfClaimAssessmentController, 'claimEntities.serviceItemListMap'), (item) =>
      lodash.includes(serviceItemList, item.id)
    )
    .reduce((sum, n) => add(sum, formUtils.queryValue(n.expense) || 0), 0);
  return {
    totalExpense,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};
@connect(mapStateToProps)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoiceItem } = props;

    // const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['invoiceDate']);
    dispatch({
      type: 'hbOfClaimAssessmentController/saveInvoiceItem',
      payload: {
        changedFields,
        invoiceId: invoiceItem.id,
      },
    });
  },
  mapPropsToFields(props) {
    const { invoiceItem } = props;

    return formUtils.mapObjectToFields(invoiceItem, {
      expense: (value: any) => value,
      remark: (value: any) => value,
      isClaimWithOtherInsurer: (value: any) => value,
    });
  },
})
class InvoiceListItemOfBasicInfo extends Component<IProps> {
  render() {
    const { form, taskNotEditable }: any = this.props;

    return (
      <Form layout="vertical">
        <FormLayout json={InvoiceListItemOfBasicInfoLayout}>
          <FormItemNumber
            form={form}
            disabled
            required
            formName="expense"
            // {/*rules={[
            //   {
            //     validator: VLD_000015(this),
            //   },
            // ]}*/}
            labelId="app.claim.label-total-net-expense"
            min={0}
            max={999999999.99}
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="isClaimWithOtherInsurer"
            labelId="app.claim.invoice.label.claim-with-other-insurer"
          />
          <FormItemInput
            form={form}
            disabled
            name="remark"
            formName="remark"
            maxLength={240}
            labelId="app.claim.label-invoice-remark"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default InvoiceListItemOfBasicInfo;
