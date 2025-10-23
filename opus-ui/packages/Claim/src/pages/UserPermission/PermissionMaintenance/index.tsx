import React, { Component } from 'react';
import { connect } from 'dva';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import UserInfo from './UserInfo/UserInfo';
import UserGroup from './UserGroup/UserGroup';
import styles from './index.less';

interface IProps {
  dispatch: Function;
  taskDetail: any;
  allGroup: any[];
  userInfo: any;
  taskNotEditable: boolean;
}
@connect()
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class PermissionMaintenance extends Component<IProps> {
  componentDidMount = () => {
    const { dispatch, taskDetail } = this.props;
    dispatch({
      type: 'permissionMaintenanceController/findAllGroup',
    });
    dispatch({
      type: 'permissionMaintenanceController/getSnapshot',
      payload: {
        taskId: taskDetail.taskId,
      },
    });
  };

  render() {
    return (
      <div className={styles.permissionMaintenance}>
        <UserInfo />
        <UserGroup />
      </div>
    );
  }
}

export default PermissionMaintenance;
