import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { Button, Popover } from 'antd';
import { copy } from '../../utils';

const params = [
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'BatchNo',
    dataIndex: 'batchNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'FireFightCase',
    dataIndex: 'caseNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseNo',
    dataIndex: 'bizCaseNo',
    render: (text: any, item: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'Status',
    dataIndex: 'status',
    render: (text: any) => text,
  },

  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'RequestTime',
    dataIndex: 'requestTime',
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'ResponseTime',
    dataIndex: 'responseTime',
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'ErrorMessage',
    dataIndex: 'exceptionMsg',
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
