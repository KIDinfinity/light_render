import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormSection from 'basic/components/Form/FormSection';
import FormItemTimePicker from 'basic/components/Form/FormItem/FormItemTimePicker';
import { formUtils } from 'basic/components/Form';
import CaseCategory from 'enum/CaseCategory';
import { insuredLayout } from '../FormLayout.json';
import styles from './CaseInformation.less';

@connect(({ dictionaryController, daProcessController }: any) => ({
  claimProcessData: daProcessController?.claimProcessData,
  categoryList: dictionaryController.Label_BPM_CaseCategory,
  channelList: dictionaryController.Dropdown_CLM_SubmissionChannel,
}))
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch }: any = props;

    dispatch({
      type: 'daProcessController/saveCaseInfo',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { claimProcessData }: any = props;

    return formUtils.mapObjectToFields(claimProcessData, {
      submissionDate: (value: any) => (value ? moment(value) : null),
    });
  },
})
class CaseInformation extends Component {
  get filterCaseCategoryList() {
    const filter = [
      CaseCategory.IAPC,
      CaseCategory.IDAC,
      CaseCategory.TH_GC_CTG04,
      CaseCategory.TH_IHB_CTG01,
      CaseCategory.TH_GC_CTG06,
      CaseCategory.TH_GC_CTG07,
      CaseCategory.TH_GC_CTG02,
      CaseCategory.TH_GC_CTG01,
    ];
    const { categoryList }: any = this.props;
    return lodash.filter(categoryList, (item) => lodash.includes(filter, item?.dictCode));
  }

  render() {
    const { form, channelList }: any = this.props;

    return (
      <div className={styles.info}>
        <FormSection
          layout={insuredLayout}
          form={form}
          formId="caseInformation"
          title="Case Information"
        >
          <FormItemSelect
            form={form}
            required
            formName="caseCategory"
            labelId="app.navigator.task-detail-of-data-capture.label.case-category"
            dicts={this.filterCaseCategoryList}
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
            required
            formName="submissionChannel"
            labelId="app.navigator.task-detail-of-data-capture.label.submission-channel"
            dicts={channelList}
          />
        </FormSection>
      </div>
    );
  }
}

export default CaseInformation;
