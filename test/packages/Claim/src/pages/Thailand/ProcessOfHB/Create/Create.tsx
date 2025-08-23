import React, { Component } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import { get, findIndex } from 'lodash';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import BasicInfo from './HBOfCreate/BasicInfo';
import CaseInformation from './HBOfCreate/CaseInformation';
import InsuredInfo from './HBOfCreate/InsuredInfo';
import LeftMenu from './HBOfCreate/LeftMenu';
import styles from './Create.less';

const DefaulDictCode = 'IP';

@connect((state) => ({
  billing: get(state, 'hbProcessController.billing'),
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
    const res = await dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['APDAClaimType'],
    });

    if (
      res.success &&
      findIndex(res?.resultData?.APDAClaimType, { dictCode: DefaulDictCode }) !== -1
    ) {
      dispatch({
        type: 'hbProcessController/setType',
        payload: { dictCode: DefaulDictCode },
      });
    }
  };

  handleSubmit = async () => {
    const { dispatch, billing: submitData } = this.props;

    const response = await dispatch({
      type: 'hbProcessController/create',
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
        <TaskDetailHeader title="Create Hospital Billing Detail">
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
