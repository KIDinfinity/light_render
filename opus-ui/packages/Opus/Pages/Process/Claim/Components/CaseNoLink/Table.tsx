import React, { useState } from 'react';
import { Table } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import lodash from 'lodash';

export default ({ list, searchParams, loading }: any) => {
  const [sortStatus, setSortStatus] = useState({});
  const sortMap = {
    ascend: 'asc',
    descend: 'desc',
  };
  const sortedList =
    sortStatus.field && sortStatus.order
      ? lodash.orderBy(list, sortStatus.field, sortMap[sortStatus.order])
      : list;
  const columns = [
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'BusinessNo',
      }),
      key: 'inquiryBusinessNo',
      width: 130,
      dataIndex: 'inquiryBusinessNo',
      sorter: true,
    },
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
      }),
      key: 'relatedProcInstId',
      width: 120,
      dataIndex: 'relatedProcInstId',
      sorter: true,
    },
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.caseDetail.label.case-category',
      }),
      key: 'caseCategory',
      dataIndex: 'caseCategory',
      render: (text: any) => formatMessageApi({ Label_BPM_CaseCategory: text }),
      sorter: true,
    },
    {
      title: formatMessageApi({
        Label_COM_Opus: 'Activity',
      }),
      key: 'processActivityKey',
      dataIndex: 'processActivityKey',
      render: (text: any) => formatMessageApi({ activity: text }),
      sorter: true,
    },
    {
      title: formatMessageApi({
        Label_COM_Opus: 'TaskStatus',
      }),
      key: 'taskStatus',
      dataIndex: 'taskStatus',
      render: (text: any) => formatMessageApi({ Dropdown_CAS_CurrentActivity: text }),
      sorter: true,
    },
    {
      title: formatMessageApi({
        Label_COM_Opus: 'Assignee',
      }),
      key: 'assignee',
      dataIndex: 'assigneeName',
      sorter: true,
    },
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'Relationship',
      }),
      key: 'relationship',
      dataIndex: 'relationship',
      render: (text: any) => {
        const result = formatMessageApi({ Label_CLM_Opus: lodash.camelCase(text) });

        // 兼容部分后端返回已有国际化的情况
        if (result === lodash.camelCase(text)) {
          return text;
        }

        return result;
      },
    },
  ];

  return (
    <div className={styles.Table}>
      <div className={styles.list}>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={lodash.filter(sortedList, (item) =>
            lodash
              .keys(searchParams)
              .every(
                (key) => lodash.isEmpty(searchParams[key]) || searchParams[key].includes(item[key])
              )
          )}
          onChange={(pagination, filters, sorter) => {
            setSortStatus(sorter);
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record?.autoActivity) {
                  window.open(
                    `/opus/case/history?caseCategory=${record?.caseCategory}&businessNo=${
                      record.businessNo
                    }${record?.taskId ? '&taskId=' + record?.taskId : ''}${
                      record?.relatedProcInstId ? '&caseNo=' + record?.relatedProcInstId : ''
                    }`,
                    '_blank'
                  );
                } else {
                  window.open(`/opus/process/task/detail/${record?.taskId}`, '_blank');
                }
              },
            };
          }}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
    </div>
  );
};
