import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Spin } from 'antd';
import Role from './Role';
import Permission from './Permission';
import ModalUserGroup from '../UserGroup';
import ModalRole from '../Role';
import styles from './index.less';

export default ({ underAuditData }: any) => {
  const dispatch = useDispatch();
  const [showUserGroup, setShowUserGroup] = useState(false);
  const [showRole, setShowRole] = useState(false);
  let { previewRecord } = useSelector((state: any) => state.configureRoleController);
  const { userGroupList } = useSelector((state: any) => state.configureRoleController);
  previewRecord = underAuditData || previewRecord;
  const loading = useSelector(
    (state: any) => state.loading.effects['configureRoleController/getPreview']
  );
  const onOpenUserGroup = () => {
    setShowUserGroup(true);
  };
  const onOpenRole = (roleData: any) => {
    setShowRole(true);
    dispatch({
      type: 'configureUserGroupController/getRoleList',
      payload: {
        role_code: roleData?.role_code,
      },
    });
  };
  return (
    <div>
      {!loading ? (
        <div className={styles.content}>
          <Role
            formData={previewRecord?.data}
            userGroupList={userGroupList}
            onOpenUserGroup={onOpenUserGroup}
          />
          <Permission
            dataList={previewRecord?.subSection}
            onOpenRole={onOpenRole}
            setShowRole={setShowRole}
          />
          <ModalRole showRole={showRole} setShowRole={setShowRole} />
          <ModalUserGroup showUserGroup={showUserGroup} setShowUserGroup={setShowUserGroup} />
        </div>
      ) : (
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
};
