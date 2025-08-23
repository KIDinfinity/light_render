import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
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

class SubmissionChannel extends Component<IProps> {
  render() {
    const { form, submissionChannelList } = this.props;
    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId="ph"
          isMargin={false}
          isPadding={false}
          title=""
          isHideBgColor
          layConf={24}
        >
          <FormItemSelect
            form={form}
            dicts={submissionChannelList}
            formName="submissionChannel"
            required
            labelId="venus_claim.label.submissionChannel"
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({
    claimEditable,
    PHCLMOfDataCaptureController,
    processTask,
    formCommonController,
    dictionaryController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    submissionChannelList: dictionaryController.Dropdown_COM_SubmissionChannel,
    submissionChannel: PHCLMOfDataCaptureController.claimProcessData?.submissionChannel,
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
      const { submissionChannel }: any = props;
      return formUtils.mapObjectToFields(
        {
          submissionChannel,
        },
        {}
      );
    },
  })(SubmissionChannel)
);
