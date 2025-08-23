import React, { PureComponent } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection from 'basic/components/Form/FormSection';
import { FormItemDatePicker, formUtils } from 'basic/components/Form';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  submissionChannelList: any;
  taskNotEditable: boolean;
  transactionTypeList: object[];
  policy: object;
  policyNo: string;
  transactionType: string;
  validating: boolean;
  taskDefKey: string;
  editFlag: string;
}

class SubmissionDate extends PureComponent<IProps> {
  render() {
    const { form } = this.props;

    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId="submissionTime"
          isMargin={false}
          isPadding={false}
          title=""
          isHideBgColor
          layConf={24}
        >
          <FormItemDatePicker
            form={form}
            required
            labelId="app.navigator.task-detail-of-jpcr.label.submission-date"
            formName="submissionDate"
            format="L"
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({
    claimEditable,
    dictionaryController,
    PHCLMOfDataCaptureController,
    processTask,
    formCommonController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    submissionChannelList: dictionaryController.Dropdown_COM_SubmissionChannel || [],
    submissionDate: PHCLMOfDataCaptureController.claimProcessData?.submissionDate,
    editFlag: processTask.getTask.editFlag,
    taskDefKey: processTask.getTask?.taskDefKey,
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'PHCLMOfDataCaptureController/saveEntry',
              target: 'updateSubmission',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'PHCLMOfDataCaptureController/saveFormData',
              target: 'updateSubmission',
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { submissionDate }: any = props;
      return formUtils.mapObjectToFields(
        {
          submissionDate,
        },
        {}
      );
    },
  })(SubmissionDate)
);
