import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';

import { checkInvoiceNoIsExist } from 'claimBasicProduct/pages/validators';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemNumber,
  formUtils,
} from 'basic/components/Form';
import { invoiceLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'InvoiceListItemOfBasicInfo';

interface IProps {
  dispatch: Function;
  form: any;
  invoiceId: string;
  validating: any;
  invoiceItem: any;
  invoiceListFromEntities: any;
}

@connect(
  (
    { PHCLMOfDataCaptureController, formCommonController, claimEditable }: any,
    { invoiceId }: any
  ) => ({
    invoiceItem: PHCLMOfDataCaptureController.claimEntities.invoiceListMap[invoiceId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props: IProps, changedFields) {
    const { dispatch, invoiceId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: 'PHCLMOfDataCaptureController/saveInvoiceItem',
        payload: {
          changedFields,
          invoiceId,
        },
      });
    }
  },
  mapPropsToFields(props: IProps) {
    const { invoiceItem } = props;

    return formUtils.mapObjectToFields(invoiceItem, {
      invoiceNo: (value) => value,
      invoiceDate: (value) => (value ? moment(value) : null),
      expense: (value) => value,
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

  render() {
    const { form, invoiceListFromEntities, taskNotEditable } = this.props;

    return (
      <Form layout="vertical">
        <FormLayout json={invoiceLayout}>
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
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
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            required
            formName="expense"
            labelId="app.navigator.task-detail-of-data-capture.label.total-expense"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default InvoiceListItemOfBasicInfo;
