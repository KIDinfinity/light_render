import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';

import lodash from 'lodash';
import type { IIncident } from '@/dtos/claim';
import { checkInvoiceNoIsExist } from 'claimBasicProduct/pages/validators';
import { VLD_000022 } from 'claim/pages/validators/fieldValidators';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemNumber,
  FormItemCheckbox,
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
  incidentItem: IIncident;
}

@connect(({ JPCLMProcessCreate, formCommonController }: any, { invoiceId }: any) => {
  const invoiceItem = JPCLMProcessCreate.claimEntities.invoiceListMap[invoiceId];
  const treatmentItem = JPCLMProcessCreate.claimEntities.treatmentListMap[invoiceItem?.treatmentId];
  return {
    invoiceItem,
    validating: formCommonController.validating,
    incidentItem: JPCLMProcessCreate.claimEntities.incidentListMap[treatmentItem?.incidentId],
  };
})
// @ts-ignore
@Form.create({
  onFieldsChange(props: IProps, changedFields) {
    const { dispatch, invoiceId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: 'JPCLMProcessCreate/saveInvoiceItem',
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
      isClaimWithOtherInsurer: (value) => value,
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
    const { form, invoiceListFromEntities, incidentItem } = this.props;
    const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));

    return (
      <Form layout="vertical">
        <FormLayout json={invoiceLayout}>
          <FormItemInput
            form={form}
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
            required
            formName="invoiceDate"
            labelId="app.navigator.task-detail-of-data-capture.label.invoice-date"
            rules={[
              {
                validator: VLD_000022(incidentDateValue),
              },
            ]}
          />
          <FormItemNumber
            form={form}
            disabled
            required
            formName="expense"
            labelId="app.navigator.task-detail-of-data-capture.label.total-expense"
          />
          <FormItemCheckbox
            form={form}
            formName="isClaimWithOtherInsurer"
            labelId="ClaimWithOtherInsurer"
            name="fieldOne"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default InvoiceListItemOfBasicInfo;
