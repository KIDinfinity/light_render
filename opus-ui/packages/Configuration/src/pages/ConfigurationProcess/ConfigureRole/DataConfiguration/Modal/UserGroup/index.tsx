import React from 'react';
import { useSelector,useDispatch } from 'dva';
import {FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import UserGroup from 'configuration/components/Modal/UserGroup';

export default ({ showUserGroup, setShowUserGroup }: any) => {
  const dispatch = useDispatch();
  const { userGroupList=[] } = useSelector((state: any) => state.configureRoleController);
  const loading = useSelector(
    (state: any) => state.loading.effects['configureRoleController/getUserGroupList']
  );
  const onCancel = () => {
    setShowUserGroup(false);
  };
  const afterClose = () => {};

  const onUserGroupClick = (item: any) => {
    setShowUserGroup(false);
    dispatch({
      type: 'configurationController/startProcess',
      payload: {
        rows: [item],
        functionCode:FunctionCode.Fun_venus_rbac_rbac_group
      },
    });
  };
  return (
    <UserGroup
      showUserGroup={showUserGroup}
      userGroupList={userGroupList}
      // 注意
      loading={loading}
      onCancel={onCancel}
      afterClose={afterClose}
      onUserGroupClick={onUserGroupClick}
    />
  );
};
