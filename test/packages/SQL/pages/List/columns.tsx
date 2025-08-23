import React from 'react';
import { Tag } from 'antd';
import moment from 'moment';
// eslint-disable-next-line import/no-unresolved
import getDuration from 'basic/utils/getDuration';
import DurationFormat from '@/components/CustomForm/Enum/DurationFormat';
import Execute from './Operator/Execute';
import Down from './Operator/Down';
import ContinuteUpload from './Operator/ContinuteUpload';
import styles from './index.less';

export default (search: any) => [
  {
    title: 'name',
    dataIndex: 'name',
    width: 120,
    render: (text: any) => text || '-',
  },
  {
    title: 'category',
    dataIndex: 'category',
    width: 100,
    render: (text: any) => text || '-',
  },
  {
    title: 'region',
    dataIndex: 'region',
    width: 100,
    render: (text: any) => text || '-',
  },
  {
    title: 'dataSource',
    dataIndex: 'dataSource',
    width: 160,
    render: (text: any) => text || '-',
  },
  {
    title: 'uploadStatus',
    dataIndex: 'uploadStatus',
    width: 120,
    render: (text: any, { uploadSlice, uploadTotal, loading }: any) => {
      const message = uploadTotal ? `${uploadSlice}/${uploadTotal}` : '-';
      if (uploadTotal && uploadSlice === uploadTotal) {
        return <Tag color="#87d068">Success</Tag>;
      }
      if (uploadTotal && uploadSlice !== uploadTotal && !loading) {
        return <Tag color="#f50">Fail {message}</Tag>;
      }
      return message;
    },
  },
  {
    title: 'uploadTime',
    dataIndex: 'uploadTime',
    width: 120,
    render: (text: any) => text || '-',
  },
  {
    title: 'execStatus',
    dataIndex: 'execStatus',
    width: 120,
    render: (text: any) => text || '-',
  },
  {
    title: 'executeTime',
    dataIndex: 'executeTime',
    width: 120,
    render: (text: any, { execStartTime, execEndTime }: any) => {
      return execStartTime && execEndTime ? getDuration({
        duration: moment(execEndTime).diff(moment(execStartTime)),
        format: DurationFormat.report_duration_format_ms
      }) : '-'
    },
  },
  {
    title: '',
    width: 200,
    render: (record: any) => (
      <div className={styles.operator}>
        <ContinuteUpload record={record} />
        <Execute record={record} search={search} />
        <Down record={record} />
      </div>
    ),
  },
];
