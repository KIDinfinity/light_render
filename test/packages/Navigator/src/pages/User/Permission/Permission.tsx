import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import UserManagementTitle from '../_components/Title';
import Process from './Process';
import Group from './Group';
import CommonFunction from './CommonFunction';
import TransactionLimit from './TransactionLimit';
import DataMasking from './DataMasking';
import styles from './Permission.less';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch({
        type: 'userManagement/getPermissionInfo',
      });
    })();
  }, []);

  return (
    <>
      <UserManagementTitle />
      <div className={styles.permissionBox}>
        <Group />
        <Process />
        <CommonFunction />
        <TransactionLimit />
        <DataMasking />
      </div>
    </>
  );
};
