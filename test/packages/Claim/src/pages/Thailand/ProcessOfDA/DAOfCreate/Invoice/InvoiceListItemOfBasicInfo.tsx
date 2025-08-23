import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import type { IInvoice } from '@/dtos/claim';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import { add } from '@/utils/precisionUtils';
import { InvoiceListItemOfBasicInfoLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'InvoiceListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  invoiceItem: IInvoice;
  validating: boolean;
}

const mapStateToProps = (
  { daProcessController, formCommonController }: any,
  { treatmentId, incidentId, invoiceItem }: any
) => {
  const incidentItem = lodash.get(
    daProcessController,
    `claimEntities.incidentListMap.${incidentId}`
  );
  const invoiceList = lodash.get(
    daProcessController,
    `claimEntities.treatmentListMap.${treatmentId}.invoiceList`
  );
  const serviceItemList = lodash.get(
    daProcessController,
    `claimEntities.invoiceListMap.${invoiceItem.id}.serviceItemList`
  );
  const totalExpense = lodash
    .filter(lodash.get(daProcessController, 'claimEntities.serviceItemListMap'), (item) =>
      lodash.includes(serviceItemList, item.id)
    )
    .reduce((sum, n) => add(sum, formUtils.queryValue(n.expense) || 0), 0);

  const InvoiceListMap = lodash.get(daProcessController, 'claimEntities.invoiceListMap');
  const invoiceNoList = lodash.map(invoiceList, (item) => {
    if (item !== invoiceItem.id) {
      return formUtils.queryValue(InvoiceListMap[item].invoiceNo);
    }
  });

  return {
    incidentItem,
    invoiceNoList,
    totalExpense,
    validating: formCommonController.validating,
    caseCategory: lodash.get(daProcessController, 'claimProcessData.caseCategory'),
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoiceItem, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    // const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['invoiceDate']);
    dispatch({
      type: 'daProcessController/saveInvoiceItem',
      payload: {
        changedFields,
        invoiceId: invoiceItem.id,
      },
    });
  },
  mapPropsToFields(props) {
    const { invoiceItem } = props;

    return formUtils.mapObjectToFields(invoiceItem, {
      invoiceNo: (value: any) => value,
      invoiceDate: (value: any) => (value ? moment(value) : null),
      expense: (value: any) => value,
      remark: (value: any) => formatRemarkText(value),
      isClaimWithOtherInsurer: (value: any) => value,
    });
  },
})
class InvoiceListItemOfBasicInfo extends Component<IProps> {
  registeForm = () => {
    const { dispatch, form, invoiceItem } = this.props;

    if (invoiceItem.id) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${invoiceItem.id}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, invoiceItem } = this.props;

    if (invoiceItem.id) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${invoiceItem.id}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  render() {
    const { form, caseCategory }: any = this.props;

    return (
      <Form layout="vertical">
        <FormLayout json={InvoiceListItemOfBasicInfoLayout}>
          <FormItemInput
            form={form}
            // required={!isPreArrangement(caseCategory)}
            formName="invoiceNo"
            name="expense"
            labelId="app.navigator.task-detail-of-data-capture.label.invoice-no"
            maxLength={10}
          />
          <FormItemDatePicker
            form={form}
            // required={!isPreArrangement(caseCategory)}
            formName="invoiceDate"
            labelId="app.navigator.task-detail-of-data-capture.label.invoice-date"
            format="L"
            name="expense"
          />
          <FormItemNumber
            form={form}
            // required
            name="expense"
            formName="expense"
            labelId="app.claim.label-total-net-expense"
            min={0}
            max={999999999.99}
          />
          <FormItemCheckbox
            form={form}
            formName="isClaimWithOtherInsurer"
            labelId="app.claim.invoice.label.claim-with-other-insurer"
          />
          <FormItemInput
            form={form}
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
