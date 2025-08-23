import React, { Component } from 'react';
import { NAMESPACE } from '../activity.config';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { BPM } from 'bpm/pages/OWBEntrance';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ESubmissionChannel from 'basic/enum/SubmissionChannel';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  submissionChannelList: any;
  taskNotEditable: boolean;
  submissionChannel: string;
}

class SubmissionChannel extends Component<IProps> {
  state = {
    editable: true,
  };

  componentDidMount() {
    const { submissionChannel } = this.props;
    if (submissionChannel === ESubmissionChannel.NA) {
      this.setState({
        editable: false,
      });
    }
  }

  render() {
    const { form, taskNotEditable, submissionChannelList, submissionChannel, claimProcessData } =
      this.props;

    if (!this.state.editable) {
      return (
        <BPM.HeaderInfoItem
          key="submissionChannel"
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
          })}
          value={formatMessageApi({
            Dropdown_COM_SubmissionChannel: submissionChannel,
          })}
        />
      );
    }
    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId="DataCapture_SubmissionChannle"
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
            disabled={taskNotEditable}
            labelId="venus_claim.label.submissionChannel"
            getPopupContainer={() => document.body}
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({ claimEditable, [NAMESPACE]: modelnamepsace, dictionaryController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    submissionChannelList: dictionaryController.Dropdown_CLM_HKPaperSubChannel || [],
    claimProcessData: modelnamepsace.claimProcessData,
    submissionChannel: modelnamepsace.claimProcessData?.submissionChannel,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'updateSubmissionChannel',
          payload: {
            changedFields,
          },
        });
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
