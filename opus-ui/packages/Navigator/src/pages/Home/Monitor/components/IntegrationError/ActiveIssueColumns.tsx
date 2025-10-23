import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { Button, Popover, Icon } from 'antd';
import { copy } from '../../utils';

export default (copyJson, loading) => {
  const params = [
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'CaseNo',
      dataIndex: 'bizCaseNo',
      render: (text: any) => text,
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'IntegrationCode',
      dataIndex: 'integrationCode',
      render: (text: any) => text,
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'Status',
      dataIndex: 'status',
      render: (text: any) => text,
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'Activity',
      dataIndex: 'bizActivityKey',
      render: (text: any, item: any) => formatMessageApi({ activity: text }),
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'RequestTime',
      dataIndex: 'requestTime',
      render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'ReturnCode',
      dataIndex: 'returnCode',
      render: (text: any) => text,
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'ErrorMessage',
      dataIndex: 'errorMsg',
      render: (text: any) => {
        if (text?.length < 10) return text;
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
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'FireFightCase',
      dataIndex: 'exceptionCaseNo',
      render: (text: any) => text,
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'Response',
      dataIndex: 'responseData',
      render: (text: any, item) => (
        <>
          {loading ? (
            <Icon type="loading" />
          ) : (
            <Icon
              type="copy"
              onClick={() => {
                copyJson(item.integrationSessionId, 'responseData');
              }}
            />
          )}
        </>
      ),
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'Request',
      dataIndex: 'requestData',
      render: (text: any, item) => (
        <>
          {loading ? (
            <Icon type="loading" />
          ) : (
            <Icon
              type="copy"
              onClick={() => {
                copyJson(item.integrationSessionId, 'requestData');
              }}
            />
          )}
        </>
      ),
    },
  ];

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
