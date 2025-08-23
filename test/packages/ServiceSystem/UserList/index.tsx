import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Table } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

export default ({ stepActive }: any) => {
  const dispatch = useDispatch();

  const onlineUserList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.onlineUserList
  );
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getLoginUsers`,
    });
  }, []);

  const columns = [
    {
      title: 'User id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      render: (text: any) => lodash.toUpper(text) || '-',
    },
    {
      title: 'Tenant',
      dataIndex: 'tenant',
      key: 'tenant',
      render: (text: any) => lodash.toUpper(text) || '-',
    },
    {
      title: 'Last Accessed Time',
      dataIndex: 'lastAccessedTime',
      key: 'lastAccessedTime',
      render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss') || '-',
    },
  ];

  return (
    <div className={classNames(styles.userList, stepActive === 2 && styles.two)}>
      <Table rowKey="id" columns={columns} dataSource={onlineUserList} />
    </div>
  );
};
