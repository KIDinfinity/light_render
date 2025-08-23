import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Spin } from 'antd';
import UserGroup from './UserGroup';
import ModalUser from '../User';
import { FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import ModalUserGroup from '../UserGroup';
import styles from './index.less';

export default ({ underAuditData }: any) => {
  const dispatch = useDispatch();
  const [showUser, setShowUser] = useState(false);
  const [showUserGroup, setShowUserGroup] = useState(false);
  let { previewRecord } = useSelector((state: any) => state.configureUserGroupController);
  previewRecord = underAuditData || previewRecord;
  const loading = useSelector(
    (state: any) => state.loading.effects['configureUserGroupController/getPreview']
  );
  const onOpenUser = () => {
    setShowUser(true);
  };
  const onOpenSetting = (item: any) => {
    dispatch({
      type: 'configurationController/startProcess',
      payload: {
        rows: [item],
        functionCode:FunctionCode.Fun_venus_rbac_rbac_role
      },
    });
  };
  const onOpenUserGroup = (roleData: any) => {
    setShowUserGroup(true);
    dispatch({
      type: 'configureUserGroupController/getUserGroupList',
      payload: {
        role_code: roleData?.role_code,
      },
    });
  };
  return (
    <div>
      {!loading ? (
        <>
          <UserGroup
            groupData={previewRecord}
            onOpenUser={onOpenUser}
            onOpenSetting={onOpenSetting}
            onOpenUserGroup={onOpenUserGroup}
          />
          <ModalUser showUser={showUser} setShowUser={setShowUser} />
          <ModalUserGroup showUserGroup={showUserGroup} setShowUserGroup={setShowUserGroup} />
        </>
      ) : (
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
};
