import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Popover } from 'antd';
import { copy } from '../../utils';
import styles from './index.less';

const params = [
  {
    fieldName: 'caseNo', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseNo',
    dataIndex: 'caseNo',
    render: (text: any) => text,
  },
  {
    fieldName: 'BusinessNo', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'BusinessNo',
    dataIndex: 'businessNo',
    render: (text: any) => text,
  },
  {
    fieldName: 'jobName',
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'Job',
    dataIndex: 'jobName',
    sorter: true,
    sortable: true,
    render: (text: any) => text,
  },
  {
    fieldName: 'failReason', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'FailReason',
    dataIndex: 'failReason',
    render: (text: any) => {
      if (text?.length < 10)
        return text;
      const title = (
        <Button
          style={{ textAlign: 'center' }}
          type="primary"
          onClick={() => {
            copy(text);
          }}
        >
          copy
        </Button>
      );

      const content = <div className={styles.content}>{text}</div>;
      return (
        <Popover className={styles.ellipsis} content={content} title={title}>
          {text}
        </Popover>
      );
    },
  },
  {
    fieldName: 'startTime', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'ExecuteDate',
    dataIndex: 'startTime',
    sorter: true,
    sortable: true,
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
  },
];

export default ({ handleHeaderCell }) => {
  return lodash.map(params, (el: any, index: number) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      className: el?.className,
      sorter: el?.sorter,
      onHeaderCell: (column: any, e) =>
        el?.sorter
          ? {
              onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
            }
          : {},
    };
  });
};
