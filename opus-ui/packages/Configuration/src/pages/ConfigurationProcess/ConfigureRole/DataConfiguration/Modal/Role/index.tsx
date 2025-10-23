import React from 'react';
import { useSelector, useDispatch } from 'dva';
import {FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import Role from 'configuration/components/Modal/Role';

export default ({ showRole, setShowRole }: any) => {
  const dispatch = useDispatch();
  const { roleList } = useSelector((state: any) => state.configureRoleController);
  const loading = useSelector(
    (state: any) => state.loading.effects['configureRoleController/getRoleList']
  );
  const onCancel = () => {
    setShowRole(false);
  };
  const afterClose = () => { };

  const onItemClick = (item: any) => {

    setShowRole(false);
    dispatch({
      type: 'configurationController/startProcess',
      payload: {
        rows: [item],
        functionCode:FunctionCode.Fun_venus_rbac_rbac_role
      },
    });
  };
  return (
    <Role
      showModal={showRole}
      // 注意
      dataList={roleList}
      loading={loading}
      onCancel={onCancel}
      afterClose={afterClose}
      onItemClick={onItemClick} s
    />
  );
};
