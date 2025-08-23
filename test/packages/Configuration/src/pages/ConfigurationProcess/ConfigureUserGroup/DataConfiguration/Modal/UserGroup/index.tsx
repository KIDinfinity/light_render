import React from 'react';
import { useSelector,useDispatch } from 'dva';
import { FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import UserGroup from 'configuration/components/Modal/UserGroup';

export default ({ showUserGroup, setShowUserGroup }: any) => {
  const dispatch = useDispatch();
  const { userGroupList } = useSelector((state: any) => state.configureUserGroupController);
  const loading = useSelector(
    (state: any) => state.loading.effects['configureUserGroupController/getUserGroupList']
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
      loading={loading}
      onCancel={onCancel}
      afterClose={afterClose}
      onUserGroupClick={onUserGroupClick}
    />
  );
};
