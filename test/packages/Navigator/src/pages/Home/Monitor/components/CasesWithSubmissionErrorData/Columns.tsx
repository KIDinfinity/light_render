import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon } from 'antd';

export default ({ handleHeaderCell, copyJson, loading }) => {
  const params = [
    {
      fieldName: 'policyNo', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'PolicyNo',
      dataIndex: 'policyNo',
      render: (text: any) => text,
    },
    {
      fieldName: 'receiveDate', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'ReceiveDate',
      dataIndex: 'receiveDate',
      render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
    },
    {
      fieldName: 'exceptionMsg', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'ExceptionMsg',
      dataIndex: 'exceptionMsg',
      render: (text: any) => text,
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
                copyJson(item.id, 'requestData');
              }}
            />
          )}
        </>
      ),
    },
    {
      fieldName: 'requestStatus', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'RequestStatus',
      dataIndex: 'requestStatus',
      render: (text: any) => formatMessageApi({ Dropdown_COM_SubmissionStatus: text }),
    },
    {
      fieldName: 'executeTimes', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'ExecuteTimes',
      dataIndex: 'executeTimes',
      render: (text: any) => text,
    },
    {
      fieldName: 'integrationSessionId', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'IntegrationSessionId',
      dataIndex: 'integrationSessionId',
      render: (text: any) => text,
    },
    {
      fieldName: 'latestExecuteDate', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'LatestExecuteDate',
      dataIndex: 'latestExecuteDate',
      render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
    },
    {
      fieldName: 'submissionRequestId', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'SubmissionRequestId',
      dataIndex: 'submissionRequestId',
      render: (text: any) => text,
    },
  ];

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
