import React from 'react';
import { useSelector,useDispatch } from 'dva';
import User from 'configuration/components/Modal/User';
import { FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import lodash from 'lodash';

export default ({ showUser, setShowUser }: any) => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state: any) => state.configureUserGroupController);
  const { previewRecord } = useSelector((state: any) => state.configurationController);
  const { operationList } = useSelector(
    (state: any) => state.configurationController?.functionData
  );
  const loading = useSelector(
    (state: any) => state.loading.effects['configureUserGroupController/getUserList']
  );
  const onCancel = () => {
    setShowUser(false);
  };
  const afterClose = () => {};

  const onUserClick = (item: any) => {
    setShowUser(false);
    dispatch({
      type: 'configurationController/startProcess',
      payload: {
        rows: [item],
        functionCode:FunctionCode.Fun_venus_uc_user_general_information
      },
    });
  };
  const showSetting = lodash.includes(
    operationList,
    `${FunctionCode.Fun_venus_uc_user_general_information}_update`
  );
  return (
    <User
      showUser={showUser}
      userList={userList[previewRecord?.group_code]}
      loading={loading}
      onCancel={onCancel}
      afterClose={afterClose}
      onUserClick={onUserClick}
      showSetting={showSetting}
    />
  );
};
