import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemDatePicker, FormItemSelect, formUtils } from 'basic/components/Form';

import styles from './CaseInformation.less';

const insuredLayout = {
  fieldLayout: {
    xs: { span: 6 },
    sm: { span: 6 },
    md: { span: 6 },
    lg: { span: 6 },
  },
};
@connect(({ dictionaryController, bpProcessController }) => ({
  claimProcessData: bpProcessController.claimProcessData,
  categoryList: dictionaryController.Label_BPM_CaseCategory,
  channelList: dictionaryController.Dropdown_COM_SubmissionChannel,
}))
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;

    dispatch({
      type: 'bpProcessController/saveCaseInfo',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { claimProcessData } = props;

    return formUtils.mapObjectToFields(claimProcessData, {
      caseCategory: (value) => value,
      submissionDate: (value) => (value ? moment(value) : null),
      submissionChannel: (value) => value,
    });
  },
})
class CaseInformation extends Component {
  render() {
    const { form, categoryList, channelList } = this.props;

    return (
      <div className={styles.info}>
        <Card title="Case Information">
          <Form layout="vertical">
            <FormLayout json={insuredLayout}>
              <FormItemSelect
                form={form}
                required
                formName="caseCategory"
                labelId="app.navigator.task-detail-of-data-capture.label.case-category"
                dicts={categoryList}
              />
              <FormItemDatePicker
                form={form}
                required
                formName="submissionDate"
                labelId="app.navigator.task-detail-of-data-capture.label.submission-date"
                showTime
                format="L LTS"
              />
              <FormItemSelect
                form={form}
                required
                formName="submissionChannel"
                labelId="app.navigator.task-detail-of-data-capture.label.submission-channel"
                dicts={channelList}
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default CaseInformation;
