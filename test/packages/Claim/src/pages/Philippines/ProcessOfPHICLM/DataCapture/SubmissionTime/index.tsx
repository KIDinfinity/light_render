import React, { PureComponent } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection from 'basic/components/Form/FormSection';
import { FormItemTimePicker, formUtils } from 'basic/components/Form';

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
@connect(
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
)
@Form.create({
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
})
class SubmissionTime extends PureComponent<IProps> {
  render() {
    const { form } = this.props;

    return (
      <div>
        <FormSection
          form={form}
          formId="submissionTime"
          isMargin={false}
          isPadding={false}
          title=""
          isHideBgColor
          layConf={24}
        >
          <FormItemTimePicker
            form={form}
            required
            labelId="app.navigator.task-detail-of-jpcr.label.submission-time"
            formName="submissionDate"
            format="LT"
          />
        </FormSection>
      </div>
    );
  }
}
export default SubmissionTime;
