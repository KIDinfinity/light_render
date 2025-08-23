import React, { Component } from 'react';
import { NAMESPACE } from '../activity.config';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import type { Dispatch } from 'redux';
import { BPM } from 'bpm/pages/OWBEntrance';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ESubmissionChannel from 'basic/enum/SubmissionChannel';
import Section, { Fields } from './Section';

import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  submissionChannelList: any;
  taskNotEditable: boolean;
  validating: boolean;
  submissionChannel: string;
  submissionDate: unknown;
  submissionTime: any;
  taskDetail: any;
}

class Submission extends Component<IProps> {
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
    const {
      form,
      taskNotEditable,
      submissionChannelList,
      submissionChannel,
      submissionDate,
    } = this.props;
    if (!this.state.editable) {
      return (
        <>
          <BPM.HeaderInfoItem
            key="submissionDate"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
            })}
            value={submissionDate}
            renderValue={(value: any) => value && moment(value).format('L')}
          />
          <BPM.HeaderInfoItem
            key="submissionTime"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-time',
            })}
            value={submissionDate}
            renderValue={(value: any) => value && moment(value).format('LT')}
          />
          <BPM.HeaderInfoItem
            key="submissionChannel"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
            })}
            value={formatMessageApi({
              Dropdown_CLM_SubmissionChannel: submissionChannel,
            })}
          />
        </>
      );
    }
    return (
      <div className={styles.container}>
        <Section form={form} editable={!taskNotEditable} section="SubmissionInfo">
          <Fields.SubmissionDate />
          <Fields.SubmissionChannel submissionChannelList={submissionChannelList} />
        </Section>
      </div>
    );
  }
}

export default connect(
  ({
    claimEditable,
    [NAMESPACE]: modelnamepsace,
    formCommonController,
    dictionaryController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    submissionChannelList: dictionaryController.Dropdown_CLM_SubmissionChannel || [],
    submissionChannel: modelnamepsace.claimProcessData?.submissionChannel,
    submissionDate: modelnamepsace.claimProcessData?.submissionDate,
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
              type: `${NAMESPACE}/saveEntry`,
              target: 'updateSubmission',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
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
      const { taskDetail }: any = props;
      // 页面修改的submissionChannel：claimProcessData
      // 其他渠道传入的submissionChannel：taskDetail
      const _submissionChannel = props.submissionChannel || taskDetail?.submissionChannel;
      const submissionChannel = _submissionChannel === 'M' ? '' : _submissionChannel;
      const submissionDate = props.submissionDate || taskDetail?.submissionDate;

      return formUtils.mapObjectToFields(
        {
          submissionChannel,
          submissionDate,
        },
        {}
      );
    },
  })(Submission)
);
