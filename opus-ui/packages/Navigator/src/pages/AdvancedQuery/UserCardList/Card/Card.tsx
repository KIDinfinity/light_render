import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import Tenant from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import userSvg from 'navigator/assets/user-login.svg';
import styles from './card.less';

interface IProps {
  dispatch: Function;
  goTaskPageLoading: boolean;
  userId: string;
  taskId: string;
  userName: string;
  userGroup: string;
  status: number | string;
  todoCnt: number;
  pendingCnt: number;
  record: any;
  rowKey: number;
  fnOnRowClick: Function;
}

interface IState {
  loadingUserId: string;
}

class Card extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingUserId: '',
    };
  }

  goTaskPage = async (userId: string, taskId: string | null) => {
    const { dispatch, fnOnRowClick, record, rowKey } = this.props;
    this.setState({
      loadingUserId: userId,
    });
    await dispatch({
      type: 'advancedQueryUserCardController/goTaskPage',
      payload: { userId, taskId },
    });
    this.setState({
      loadingUserId: '',
    });
    fnOnRowClick(record, rowKey);
  };

  render() {
    const {
      goTaskPageLoading,
      userId,
      taskId,
      userName,
      userGroup,
      status,
      todoCnt,
      pendingCnt,
    } = this.props;
    const { loadingUserId } = this.state;
    return (
      <div className={styles.card}>
        <div className="cardT">
          <div className="userId">ID: {userId}</div>
          <Tenant.TH match={false}>
            <div className="userSetting" onClick={() => this.goTaskPage(userId, taskId)}>
              <Icon type={userId === loadingUserId && goTaskPageLoading ? 'loading' : 'setting'} />
            </div>
          </Tenant.TH>
        </div>
        <div className="cardM">
          <div className="userInfo">
            <div className="userName" title={userName}>
              {userName}
            </div>
            <div className="userItem">
              <div
                className="label"
                title={formatMessageApi({ Label_COM_General: 'UserGroupName' })}
              >
                {formatMessageApi({ Label_COM_General: 'UserGroupName' })}:
              </div>
              <div className="ctn" title={userGroup}>
                {userGroup}
              </div>
            </div>
            <div className="userItem">
              <div className="label">
                {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.status' })}:
              </div>
              <div className="ctn">{status === 0 ? 'Active' : 'Terminated'}</div>
            </div>
          </div>
          <img className="userImg" src={userSvg} alt="user img" />
        </div>
        <div className="cardB">
          <div className="status">
            <div className="ctn">{todoCnt}</div>
            <div className="label">To Do</div>
          </div>
          <div className="status">
            <div className="ctn">{pendingCnt}</div>
            <div className="label">{formatMessageApi({ Label_BPM_TaskActivity: 'pending' })}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ loading }: any) => ({
  goTaskPageLoading: loading.effects['advancedQueryUserCardController/goTaskPage'],
}))(Card);
