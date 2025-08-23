import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { Form } from 'antd';

import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import {
  FormItemDatePicker,
  FormItemCheckbox,
  FormItemNumber,
  formUtils,
} from 'basic/components/Form';
import { calculatPayoutAmountInvoiceLevel } from '../../_models/functions/calculatePayoutAmount';

const FORMID_PREFIX = 'InvoiceSummaryBasicInfo';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  invoiceId: string;
}

@connect(
  (
    { HKCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { invoiceId }: any
  ) => {
    const { claimEntities, claimProcessData } = HKCLMOfClaimAssessmentController;
    return {
      invoiceItem: claimEntities.invoiceListMap[invoiceId],
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
      payoutCurrency: claimProcessData.claimDecision?.payoutCurrency,
      totalPayableAmount: calculatPayoutAmountInvoiceLevel(
        claimEntities,
        claimProcessData,
        invoiceId
      ),
    };
  }
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoiceId, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
            target: 'saveInvoiceItem',
            payload: {
              changedFields,
              invoiceId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
          target: 'saveInvoiceItem',
          payload: {
            changedFields,
            invoiceId,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { invoiceItem, totalPayableAmount } = props;
    // invoiceItem.totalPayableAmount = totalPayableAmount;
    return formUtils.mapObjectToFields(
      { ...invoiceItem, totalPayableAmount },
      {
        totalPayableAmount: (value: any) => value,
        exchangeDate: (value: any) => (value ? moment(value) : null),
        expense: (value: any) => value,
        otherInsurerPaidAmount: (value: any) => value,
        isClaimWithOtherInsurer: (value) => value,
      }
    );
  },
})
class InvoiceSummaryBasicInfo extends PureComponent<IProps> {
  registeForm = () => {
    const { dispatch, form, invoiceId } = this.props;

    if (invoiceId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${invoiceId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, invoiceId } = this.props;

    if (invoiceId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${invoiceId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  onInvoiceCurrencyChange = (selectCurrency) => {
    const { dispatch, invoiceId } = this.props;
    const invoiceCurrency = selectCurrency.currencyCode;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/saveInvoiceCurrency',
      payload: {
        invoiceCurrencyObj: {
          invoiceId,
          invoiceCurrency,
        },
      },
    });
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/hideCurrencyModal',
      payload: {
        currencyModalShowStatus: true,
      },
    });
  };

  exchangeDate = (value: any) => {
    const { dispatch, invoiceId, invoiceItem } = this.props;
    if (!moment(formUtils.queryValue(invoiceItem?.exchangeDate)).isSame(value)) {
      dispatch({
        type: 'HKCLMOfClaimAssessmentController/getExchangeRateForExchangeDate',
        payload: {
          invoiceId,
          exchangeDate: value,
          oldExchangeDate: formUtils.queryValue(invoiceItem?.exchangeDate),
        },
      });
    }
  };

  render() {
    const { form, taskNotEditable, invoiceItem, payoutCurrency } = this.props;
    const invoiceCurrency = invoiceItem?.invoiceCurrency;

    return (
      <Form layout="vertical">
        <FormItemCurrency
          form={form}
          disabled
          hiddenPrefix
          hiddenDropDown
          formName="totalPayableAmount"
          labelId="Payout Amount"
          currencyCode={payoutCurrency}
        />
        <FormItemCurrency
          form={form}
          disabled
          suffixEditable={!taskNotEditable}
          hiddenPrefix
          formName="expense"
          labelId="app.navigator.task-detail-of-claim-assessment.label.total-expense"
          onSuffixChange={this.onInvoiceCurrencyChange}
          currencyCode={invoiceCurrency}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="exchangeDate"
          labelId="ExchangeDate"
          format="L"
          onChange={this.exchangeDate}
        />
        <FormItemCheckbox
          form={form}
          disabled={taskNotEditable}
          formName="isClaimWithOtherInsurer"
          labelId="ClaimWithOtherInsurer"
        />
        <FormItemNumber
          form={form}
          disabled
          formName="otherInsurerPaidAmount"
          labelId="otherInsurerPaidAmount"
          precision={2}
        />
      </Form>
    );
  }
}

export default InvoiceSummaryBasicInfo;
