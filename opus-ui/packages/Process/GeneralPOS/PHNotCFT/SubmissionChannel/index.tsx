import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { shouldUpdateState } from 'claim/pages/utils/formUtils';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId } from '../Enum';
import CreateLocation from 'enum/CreateLocation';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  Dropdown_POS_SubmissionChannel: any;
  taskNotEditable: boolean;
  transactionTypeList: object[];
  policy: object;
  policyNo: string;
  transactionType: string;
  validating: boolean;
  taskDefKey: string;
  createLocation: string;
}

const SubmissionChannel = (props: IProps) => {
  const { form, Dropdown_POS_SubmissionChannel, taskNotEditable, taskDefKey, createLocation } = props;
  const isNotEditable = taskNotEditable ||
    !(taskDefKey === TaskDefKey.PH_POS_ACT001 && createLocation === CreateLocation['01']);

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
          dicts={Dropdown_POS_SubmissionChannel}
          formName="submissionChannel"
          required
          disabled={isNotEditable}
          labelId="venus_claim.label.submissionChannel"
          getPopupContainer={() => document.body}
        />
      </FormSection>
    </div>
  );
}

export default connect(
  ({
    claimEditable,
    GeneralPOSPHNotCFTController,
    dictionaryController,
    processTask,
    formCommonController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    Dropdown_POS_SubmissionChannel: dictionaryController.Dropdown_POS_SubmissionChannel || [],
    submissionChannel: GeneralPOSPHNotCFTController.claimProcessData?.businessData?.submissionChannel,
    createLocation: processTask.getTask.createLocation,
    taskDefKey: processTask.getTask?.taskDefKey,
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;
      if (shouldUpdateState(validating, changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'GeneralPOSPHNotCFTController/saveEntry',
              target: 'updateSubmissionChannel',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'GeneralPOSPHNotCFTController/saveFormData',
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
