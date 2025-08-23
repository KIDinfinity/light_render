import React from 'react';
import { useSelector,useDispatch } from 'dva';
import { FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import User from 'configuration/components/Modal/User';

export default ({ showUser, setShowUser }: any) => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state: any) => state.configureUserController);
  const loading = useSelector(
    (state: any) => state.loading.effects['configureUserController/getUserList']
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
  return (
    <User
      showUser={showUser}
      userList={userList}
      loading={loading}
      onCancel={onCancel}
      afterClose={afterClose}
      onUserClick={onUserClick}
    />
  );
};
