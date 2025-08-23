import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (orders: any, handleHeaderCell: any, beforeColumn: any) => {
  const width = 130;
  const params = [
    {
      fieldName: 'id',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.submissionDate?.sortOrder,
      width,
    },
    {
      fieldName: 'regionCode',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'regionCode',
      dataIndex: 'regionCode',
      key: 'regionCode',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.regionCode?.sortOrder,
      width,
    },
    {
      fieldName: 'dbName',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'dbName',
      dataIndex: 'dbName',
      key: 'dbName',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.dbName?.sortOrder,
      width,
    },
    {
      fieldName: 'tableName',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'tableName',
      dataIndex: 'tableName',
      key: 'tableName',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
    {
      fieldName: 'onlineCheck',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'onlineCheck',
      dataIndex: 'onlineCheck',
      key: 'onlineCheck',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
    {
      fieldName: 'groupByFields',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'groupByFields',
      dataIndex: 'groupByFields',
      key: 'groupByFields',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
    {
      fieldName: 'groupByValues',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'groupByValues',
      dataIndex: 'groupByValues',
      key: 'groupByValues',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
    {
      fieldName: 'skipCheckFields',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'skipCheckFields',
      dataIndex: 'skipCheckFields',
      key: 'skipCheckFields',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
    {
      fieldName: 'gmtCreate',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'gmtCreate',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
    {
      fieldName: 'gmtModified',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'gmtModified',
      dataIndex: 'gmtModified',
      key: 'gmtModified',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
    {
      fieldName: 'transId',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'transId',
      dataIndex: 'transId',
      key: 'transId',
      sorter: true,
      sortable: true,
      defaultSortOrder: orders?.tableName?.sortOrder,
      width,
    },
  ];
  if (beforeColumn) {
    params.unshift(beforeColumn);
  }
  return lodash.map(params, (el: any) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      sorter: el.sortable,
      render: el?.render ? el?.render : (text: any) => text || '-',
      width: el?.width,
      className: el?.className,
      onHeaderCell: (column: any) => ({
        onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
      }),
    };
  });
};
