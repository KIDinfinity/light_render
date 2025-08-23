import React, { useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const onlineCaseList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.onlineCaseList
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getActiveCaseList`,
    });
  }, []);

  const columns = [
    {
      title: 'case No',
      dataIndex: 'processInstanceId',
      key: 'processInstanceId',
    },
    {
      title: 'Case Category',
      dataIndex: 'caseCategory',
      key: 'caseCategory',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Activity',
      dataIndex: 'taskDefKey',
      key: 'taskDefKey',
      render: (text: any) => formatMessageApi({ activity: text }) || '-',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss') || '-',
    },
  ];

  return (
    <div className={styles.caseList}>
      <Table rowKey="id" columns={columns} dataSource={onlineCaseList} />
    </div>
  );
};
