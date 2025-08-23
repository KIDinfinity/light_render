import React, { Component } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import BasicInfo from './MJOfCreate/BasicInfo';
import LeftMenu from './MJOfCreate/LeftMenu';
import CaseInformation from './MJOfCreate/CaseInformation';
import styles from './Create.less';

@connect(({ mjProcessController }) => ({
  claimProcessData: mjProcessController.claimProcessData,
}))
class Create extends Component {
  state = {
    result: {
      processInstanceId: '---',
      claimNo: '---',
      parentClaimNo: '---',
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

  getDropdown = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Label_BPM_CaseCategory'],
    });
  };

  handleSubmit = async () => {
    const { dispatch } = this.props;

    const response = await dispatch({
      type: 'mjProcessController/create',
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
        result: {
          processInstanceId: '---',
          claimNo: '---',
          parentClaimNo: '---',
        },
      });
      handleMessageModal(response?.promptMessages);
    }
  };

  render() {
    const { result } = this.state;

    return (
      <>
        <TaskDetailHeader title="Create Major Claim">
          <BasicInfo
            caseNo={result?.processInstanceId}
            claimNo={result?.claimNo}
            parentClaimNo={result?.parentClaimNo}
          />
        </TaskDetailHeader>
        <div className={styles.container}>
          <DetailSider>
            <LeftMenu handleSubmit={this.handleSubmit} />
          </DetailSider>
          <div className={styles.content}>
            <div className={styles.wrap}>
              <CaseInformation />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
