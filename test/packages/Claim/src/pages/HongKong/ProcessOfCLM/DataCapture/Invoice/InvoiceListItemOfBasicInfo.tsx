import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';

import lodash from 'lodash';
import { checkInvoiceNoIsExist } from 'claimBasicProduct/pages/validators';
import FormLayout from 'basic/components/Form/FormLayout';
import { VLD_000022 } from 'claim/pages/validators/fieldValidators';
import type { IIncident } from '@/dtos/claim';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemCheckbox,
  FormItemNumber,
  formUtils,
} from 'basic/components/Form';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { invoiceLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'InvoiceListItemOfBasicInfo';

interface IProps {
  dispatch: Function;
  form: any;
  invoiceId: string;
  validating: any;
  invoiceItem: any;
  invoiceListFromEntities: any;
  incidentItem: IIncident;
}

@connect(
  (
    { HKCLMOfDataCaptureController, formCommonController, claimEditable }: any,
    { invoiceId }: any
  ) => {
    const invoiceItem = HKCLMOfDataCaptureController.claimEntities.invoiceListMap[invoiceId];
    const treatmentItem =
      HKCLMOfDataCaptureController.claimEntities.treatmentListMap[invoiceItem?.treatmentId];
    return {
      invoiceItem,
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
      incidentItem:
        HKCLMOfDataCaptureController.claimEntities.incidentListMap[treatmentItem?.incidentId],
    };
  }
)
// @ts-ignore
@Form.create({
  onFieldsChange(props: IProps, changedFields) {
    const { dispatch, invoiceId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfDataCaptureController/saveEntry',
            target: 'saveInvoiceItem',
            payload: {
              changedFields,
              invoiceId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfDataCaptureController/saveFormData',
          target: 'saveInvoiceItem',
          payload: {
            changedFields,
            invoiceId,
          },
        });
      }
    }
  },
  mapPropsToFields(props: IProps) {
    const { invoiceItem } = props;
    return formUtils.mapObjectToFields(invoiceItem, {
      invoiceNo: (value: any) => value,
      invoiceDate: (value: any) => (value ? moment(value) : null),
      expense: (value: any) => value,
      exchangeDate: (value: any) => (value ? moment(value) : null),
      isClaimWithOtherInsurer: (value: any) => value,
      otherInsurerPaidAmount: (value: any) => value,
    });
  },
})
class InvoiceListItemOfBasicInfo extends PureComponent<IProps> {
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

  changeInvoiceCurrency = (selectCurrency: object) => {
    const { dispatch, invoiceId } = this.props;
    const invoiceCurrency = selectCurrency.currencyCode;
    dispatch({
      type: 'HKCLMOfDataCaptureController/saveInvoiceItem',
      payload: {
        changedFields: { invoiceCurrency },
        invoiceId,
      },
    });
  };

  render() {
    const {
      form,
      invoiceListFromEntities,
      taskNotEditable,
      invoiceItem,
      incidentItem,
    } = this.props;
    const invoiceCurrency = invoiceItem?.invoiceCurrency;
    const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));

    return (
      <Form layout="vertical">
        <FormLayout json={invoiceLayout}>
          <FormItemInput
            form={form}
            required
            disabled={taskNotEditable}
            formName="invoiceNo"
            maxLength={10}
            labelId="app.navigator.task-detail-of-data-capture.label.invoice-no"
            triggerEvent="onBlur"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  checkInvoiceNoIsExist(rule, value, callback, invoiceListFromEntities),
              },
            ]}
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            required
            formName="invoiceDate"
            labelId="app.navigator.task-detail-of-data-capture.label.invoice-date"
            rules={[
              {
                validator: VLD_000022(incidentDateValue),
              },
            ]}
          />
          <FormItemCurrency
            form={form}
            disabled
            suffixEditable
            required
            formName="expense"
            labelId="app.navigator.task-detail-of-data-capture.label.total-expense"
            hiddenPrefix
            onSuffixChange={this.changeInvoiceCurrency}
            currencyCode={invoiceCurrency}
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="exchangeDate"
            labelId="ExchangeDate"
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="isClaimWithOtherInsurer"
            labelId="ClaimWithOtherInsurer"
            name="fieldOne"
          />
          <FormItemNumber
            form={form}
            disabled
            formName="otherInsurerPaidAmount"
            labelId="otherInsurerPaidAmount"
            precision={2}
            name="fieldOne"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default InvoiceListItemOfBasicInfo;
