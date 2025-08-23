import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId } from '../Enum';
import CreateLocation from 'enum/CreateLocation';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  Dropdown_COM_SubmissionChannel: any;
  taskNotEditable: boolean;
  transactionTypeList: object[];
  policy: object;
  policyNo: string;
  transactionType: string;
  validating: boolean;
  taskDefKey: string;
  createLocation: string;
}

class SubmissionChannel extends Component<IProps> {
  get isNotEditable() {
    const { taskNotEditable, taskDefKey, createLocation } = this.props;
    return (
      taskNotEditable ||
      !(taskDefKey === TaskDefKey.PH_POS_ACT001 && createLocation === CreateLocation['01'])
    );
  }

  render() {
    const { form, Dropdown_COM_SubmissionChannel } = this.props;

    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId={FormId.SubmissionChannel}
          isMargin={false}
          isPadding={false}
          title=""
          isHideBgColor
          layConf={24}
        >
          <FormItemSelect
            form={form}
            dicts={Dropdown_COM_SubmissionChannel}
            formName="submissionChannel"
            required
            disabled={this.isNotEditable}
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
    phowbDataCaptureController,
    dictionaryController,
    processTask,
    formCommonController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    Dropdown_COM_SubmissionChannel: dictionaryController.Dropdown_COM_SubmissionChannel || [],
    submissionChannel: phowbDataCaptureController.claimProcessData.submissionChannel,
    createLocation: processTask.getTask.createLocation,
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
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updateSubmissionChannel',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveFormData',
              target: 'updateSubmissionChannel',
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
