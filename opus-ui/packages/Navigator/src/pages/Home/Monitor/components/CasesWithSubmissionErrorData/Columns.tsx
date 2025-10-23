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
      fieldName: 'submissionTime', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'SubmissionTime',
      dataIndex: 'submissionTime',
      render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
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
