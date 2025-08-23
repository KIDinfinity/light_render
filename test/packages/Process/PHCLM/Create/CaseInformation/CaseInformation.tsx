import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemTimePicker from 'basic/components/Form/FormItem/FormItemTimePicker';
import { formUtils } from 'basic/components/Form';
import styles from './CaseInformation.less';
import { insuredLayout } from '../FormLayout.json';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import { isManualHK } from 'claim/enum/claimDecision';

@connect(({ dictionaryController, hkProcessController }) => ({
  claimProcessData: hkProcessController?.claimProcessData,
  sourceList: dictionaryController.CaseSource,
  categoryList: dictionaryController.Label_BPM_CaseCategory,
  channelList: dictionaryController.Dropdown_COM_HKGeneralSubChannel,
  dictsOfDropdownPRCCaseCategory: dictionaryController.Dropdown_PRC_CaseCategory,
}))
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;

    dispatch({
      type: 'hkProcessController/saveCaseInfo',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { claimProcessData } = props;
    return formUtils.mapObjectToFields(claimProcessData, {
      submissionDate: (value) => (value ? moment(value) : null),
      isManual: (value) => (value === isManualHK.Yes ? true : false),
    });
  },
})
class CaseInformation extends Component {
  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: 'CaseInformation',
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: 'CaseInformation',
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  render() {
    const {
      form,
      sourceList,
      categoryList,
      channelList,
      dictsOfDropdownPRCCaseCategory,
    } = this.props;

    return (
      <div className={styles.info}>
        <Card title="Case Information">
          <Form layout="vertical">
            <FormLayout json={insuredLayout}>
              <FormItemSelect
                form={form}
                formName="caseSource"
                labelId="Case Source"
                dicts={sourceList}
              />
              <FormItemSelect
                form={form}
                required
                formName="caseCategory"
                labelId="app.navigator.task-detail-of-data-capture.label.case-category"
                dicts={dictsOfDropdownPRCCaseCategory}
              />
              <FormItemDatePicker
                form={form}
                required
                formName="submissionDate"
                labelId="app.navigator.task-detail-of-data-capture.label.submission-date"
                format="L"
              />
              <FormItemTimePicker
                form={form}
                required
                className="submissionTime"
                formName="submissionDate"
                labelId="app.navigator.task-detail-of-data-capture.label.submission-time"
                format="LT"
              />
              <FormItemSelect
                form={form}
                formName="submissionChannel"
                labelId="app.navigator.task-detail-of-data-capture.label.submission-channel"
                dicts={channelList}
              />
              <FormItemCheckbox form={form} formName="isManual" labelId="isManual" />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default CaseInformation;
