import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './userInfo.less';

interface IProps {
  userInfo: any;
}

// @ts-ignore
@connect(({ permissionMaintenanceController }) => ({
  userInfo: permissionMaintenanceController.userInfo,
}))
class UserInfo extends Component<IProps> {
  render() {
    const { userInfo } = this.props;
    return (
      <div className={styles.userInfo}>
        <div className="row">
          <div className="col">ID: {userInfo.userId}</div>
        </div>
        <div className="row">
          <div className="col userName">{userInfo.userName}</div>
        </div>
        <div className="row">
          <div className="col label">
            {formatMessageApi({ Label_COM_General: 'UserGroupName' })}:
          </div>
          <div className="col">{userInfo.userGroupName}</div>
        </div>
        <div className="row">
          <div className="col label">
            {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.status' })}:
          </div>
          <div className="col ">{userInfo.status === 0 ? 'Active' : 'Terminated'}</div>
        </div>
        <div className="row status">
          <div className="col">
            <div>{userInfo.todoCnt}</div>
            <div className="label">To Do</div>
          </div>
          <div className="col">
            <div>{userInfo.pendingCnt}</div>
            <div className="label">{formatMessageApi({ Label_BPM_TaskActivity: 'pending' })}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
