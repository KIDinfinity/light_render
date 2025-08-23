import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemSelect,
  FormItemInput,
  formUtils,
} from 'basic/components/Form';

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
  categoryList: dictionaryController.CaseCategory,
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
  getCategoryList = () => {
    return [
      {
        dictCode: 'Claim Request',
        dictName: 'Claim Request',
      },
      {
        dictCode: 'PH_CLM_CTG001',
        dictName: 'PH_CLM_CTG001',
      },
    ];
  };

  render() {
    const { form } = this.props;

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
                dicts={this.getCategoryList()}
              />
              <FormItemDatePicker
                form={form}
                required
                formName="submissionDate"
                labelId="app.navigator.task-detail-of-data-capture.label.submission-date"
                showTime
                format="L LTS"
              />
              <FormItemInput
                form={form}
                required
                formName="submissionChannel"
                labelId="app.navigator.task-detail-of-data-capture.label.submission-channel"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default CaseInformation;
