import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { Popover } from 'antd';

const params = [
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseNo',
    dataIndex: 'bizCaseNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'BusinessNo',
    dataIndex: 'bizBusinessNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'IntegrationCode',
    dataIndex: 'exceptionIntegrationCode',
    render: (text: any) => {
      const content = <div className={styles.content}>{text}</div>;
      return (
        <Popover className={styles.ellipsis} content={content}>
          {text}
        </Popover>
      );
    },
  },

  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'LastRetryTime',
    dataIndex: 'lastRetryTime',
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'NextRetryTime',
    dataIndex: 'nextRetryTime',
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'NumberOfRetry',
    dataIndex: 'retryNo',
    render: (text: any) => text || 0,
  },
];

export default () => {
  return lodash.map(params, (el: any, index: number) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      className: el?.className,
      // onHeaderCell: (column: any) => ({
      //   onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
      // }),
    };
  });
};
