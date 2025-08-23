import React, { Component } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import BasicInfo from './BasicInfo';
import CaseInformation from './CaseInformation';
import DocumentInformation from './DocumentInformation';
import LeftMenu from './LeftMenu';
import styles from './index.less';

interface IProps {
  user: any;
  claimProcessData: any;
  dispatch: Dispatch;
  submitting: boolean;
  forms: any;
  validating: boolean;
  submited: boolean;
  errors: any[];
}

class Create extends Component<IProps> {
  state = {
    result: {
      processInstanceId: '---',
    },
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });
    dispatch({
      type: 'workspaceSwitchOn/closeSwitch',
    });
    this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: true,
      },
    });
  };

  getDropdown = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THUDCreate,
    });
  };

  handleSubmit = async () => {
    const { dispatch, claimProcessData, user } = this.props;

    const submitData = {
      ...claimProcessData,
      variables: {
        applicant: lodash.get(user, 'currentUser.userId', ''),
        remainingTime: 8,
        isUrgent: 0,
      },
    };

    const errors: any = await dispatch({
      type: 'UDOfCreateController/validateFields',
    });

    if (errors && errors.length) {
      return;
    }

    const response: any = await dispatch({
      type: 'UDOfCreateController/create',
      payload: formUtils.formatFlattenValue(formUtils.cleanValidateData(submitData)),
    });

    if (response && response.success) {
      this.setState({
        result: response.resultData,
      });
      notification.success({
        message: 'Create successfully!',
      });
    } else if (response && response.success === false) {
      handleMessageModal(response.promptMessages);
    }
  };

  render() {
    const { result } = this.state;
    const { submitting, validating, submited, errors } = this.props;

    return (
      <>
        <TaskDetailHeader title="Create Identify Unknown Document" showTips={false} taskStatus="">
          <BasicInfo caseNo={result.processInstanceId} />
        </TaskDetailHeader>
        <div className={styles.container}>
          <DetailSider>
            <LeftMenu
              handleSubmit={this.handleSubmit}
              submitting={submitting}
              validating={validating}
              submited={submited}
              errors={errors}
            />
          </DetailSider>
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
              <CaseInformation />
              <DocumentInformation />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(({ UDOfCreateController, formCommonController, user, loading }: any) => ({
  claimProcessData: UDOfCreateController.claimProcessData,
  errors: formUtils.getErrorArray(UDOfCreateController.claimProcessData),
  forms: formCommonController.forms,
  submitting: loading.effects['UDOfCreateController/create'],
  submited: formCommonController.submited,
  validating: loading.effects['UDOfCreateController/validateFields'],
  user,
}))(Create);
