import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemDatePicker, formUtils } from 'basic/components/Form';
import json from './RecipientBasicInformation.json';
import styles from './RecipientBasicInformation.less';

const FORMID = 'recipientBasicInformation';

@connect(({ JPDPOfDocumentDispatchController }) => ({
  info: lodash.get(JPDPOfDocumentDispatchController, 'businessData.info'),
}))
@Form.create({
  mapPropsToFields(props) {
    const { info } = props;
    const dispatchDate = lodash.get(info, 'dispatchDate');
    return formUtils.mapObjectToFields(info, {
      dispatchDate: dispatchDate ? moment(dispatchDate) : '',
    });
  },
})
class RecipientBasicInformation extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'JPDPOfDocumentDispatchController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'JPDPOfDocumentDispatchController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const { form } = this.props;
    return (
      <div className={styles.recipent_basic_info}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.claim.ProcessOfJPDP.recipientBasicInformation',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={json}>
              <FormItemInput
                form={form}
                disabled
                formName="dest"
                maxLength={30}
                required
                labelId="app.claim.ProcessOfJPDP.recipientName"
              />
              <FormItemInput
                form={form}
                disabled
                formName="mailCode"
                maxLength={20}
                required
                labelId="app.claim.ProcessOfJPDP.recipientPostCode"
              />
              <FormItemInput
                form={form}
                disabled
                formName="address"
                maxLength={240}
                required
                labelId="app.claim.ProcessOfJPDP.recipientAddress"
              />
              <FormItemDatePicker
                form={form}
                disabled
                formName="dispatchDate"
                format="L"
                labelId="venus_pending.label.date"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default RecipientBasicInformation;
