import React, { Component } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import BasicInfo from './BasicInfo';
import CaseInformation from './CaseInformation';
import InsuredInfo from './InsuredInfo';
import LeftMenu from './LeftMenu';
import styles from './index.less';

@connect(({ bpProcessController, user }) => ({
  claimProcessData: bpProcessController.claimProcessData,
  user,
}))
class Create extends Component {
  state = {
    result: {
      caseNo: '---',
      businessNo: '---',
      inquiryBusinessNo: '---',
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
      payload: dictionaryConfig?.PHCreate,
    });

    dispatch({
      type: 'dictionaryController/nationalityDropdown',
    });

    dispatch({
      type: 'dictionaryController/occupationDropdown',
    });
  };

  handleSubmit = async () => {
    const { dispatch, claimProcessData, user } = this.props;
    const submitData = {
      ...claimProcessData,
      variables: {
        applicant: user?.currentUser?.userId,
        remainingTime: 8,
        isUrgent: 0,
      },
    };
    const response = await dispatch({
      type: 'bpProcessController/create',
      payload: formUtils.formatFlattenValue(formUtils.cleanValidateData(submitData)),
    });

    if (response?.success) {
      this.setState({
        result: response?.resultData,
      });
      notification.success({
        message: 'Create successfully!',
      });
    } else if (response?.success === false) {
      this.setState({
        result: {},
      });
      handleMessageModal(response?.promptMessages);
    }
  };

  render() {
    const { result } = this.state;

    return (
      <>
        <TaskDetailHeader title="Create Case">
          <BasicInfo
            caseNo={result?.caseNo}
            claimNo={result?.businessNo}
            parentClaimNo={result?.inquiryBusinessNo}
          />
        </TaskDetailHeader>
        <div className={styles.container}>
          <DetailSider>
            <LeftMenu handleSubmit={this.handleSubmit} />
          </DetailSider>
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
              <CaseInformation />
              <InsuredInfo />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
