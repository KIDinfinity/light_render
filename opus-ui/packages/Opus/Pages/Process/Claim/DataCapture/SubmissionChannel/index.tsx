import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import BPM from 'bpm/pages/OWBEntrance/BPM';

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
  validating: boolean;
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
    const { form, taskNotEditable, submissionChannel } = this.props;

    const dict = getDrowDownList('Dropdown_OPUS_SubmissionChannel');

    if (!this.state.editable) {
      return (
        <BPM.HeaderInfoItem
          key="submissionChannel"
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
          })}
          value={formatMessageApi({
            Dropdown_OPUS_SubmissionChannel: submissionChannel,
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
            dicts={dict}
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

export default connect(({ claimEditable, opusClaimDataCapture, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  submissionChannel: opusClaimDataCapture.claimProcessData?.submissionChannel,
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimDataCapture/saveEntry',
              target: 'submissionChannelUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimDataCapture/saveFormData',
              target: 'submissionChannelUpdate',
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
