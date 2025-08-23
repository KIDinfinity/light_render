import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form } from 'antd';
import { get } from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemInput,
  FormItemNumber,
  FormItemDatePicker,
  formUtils,
} from 'basic/components/Form';
import json from './InsuredInfo.json';
import styles from './InsuredInfo.less';

@connect((state) => ({
  billing: get(state, 'hbProcessController.billing'),
}))
@Form.create({
  onFieldsChange(props, changedFields) {
    props.dispatch({
      type: 'hbProcessController/saveBilling',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    return formUtils.mapObjectToFields(props.billing, {
      amount: (value) => value,
      firstName: (value) => value,
      invoiceNo: (value) => value,
      lastName: (value) => value,
      visitDate: (value) => (value ? moment(value) : null),
    });
  },
})
class InsuredInfo extends Component {
  render() {
    const { form } = this.props;

    return (
      <div className={styles.insured}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={json}>
              <FormItemInput form={form} required formName="firstName" labelId="First Name" />
              <FormItemInput form={form} required formName="lastName" labelId="Surname" />
            </FormLayout>
            <FormLayout json={json}>
              <FormItemInput form={form} required formName="invoiceNo" labelId="Invoice No." />
              <FormItemDatePicker
                form={form}
                required
                formName="visitDate"
                labelId="Visit Date"
                format="L"
              />
              <FormItemNumber form={form} required formName="amount" labelId="Request Amount" />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default InsuredInfo;
