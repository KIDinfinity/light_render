import React from 'react';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './CompareColumns.less';

export default () => {
  const width = 120;
  const params = [
    {
      fieldName: 'type',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'type',
      dataIndex: 'type',
      key: 'type',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'id',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'id',
      dataIndex: 'id',
      key: 'id',
      width,
    },
    {
      fieldName: 'field_id',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'field_id',
      dataIndex: 'field_id',
      key: 'field_id',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'assembler',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'assembler',
      dataIndex: 'assembler',
      key: 'assembler',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'available_case_category',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'available_case_category',
      dataIndex: 'available_case_category',
      key: 'available_case_category',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'available_operation_type',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'available_operation_type',
      dataIndex: 'available_operation_type',
      key: 'available_operation_type',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'compare_data',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'compare_data',
      dataIndex: 'compare_data',
      key: 'compare_data',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'target_data',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'target_data',
      dataIndex: 'target_data',
      key: 'target_data',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'error_code',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'error_code',
      dataIndex: 'error_code',
      key: 'error_code',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'error_parameter',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'error_parameter',
      dataIndex: 'error_parameter',
      key: 'error_parameter',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'validation_code',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'validation_code',
      dataIndex: 'validation_code',
      key: 'validation_code',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'creator',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'creator',
      dataIndex: 'creator',
      key: 'creator',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'modifier',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'modifier',
      dataIndex: 'modifier',
      key: 'modifier',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'gmt_create',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'gmt_create',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'gmt_modified',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'gmt_modified',
      dataIndex: 'gmt_modified',
      key: 'gmt_modified',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'is_deleted',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'is_deleted',
      dataIndex: 'is_deleted',
      key: 'is_deleted',
      width,
      render: (text: any) => text,
    },
    {
      fieldName: 'trans_id',
      labelTypeCode: 'Label_BIZ_Claim',
      id: 'trans_id',
      dataIndex: 'trans_id',
      key: 'trans_id',
      width,
      render: (text: any) => text,
    },
  ];

  return lodash.map(params, (el: any) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      sorter: el.sortable,
      render: (text: any, item: any) => {
        if (
          item.type === 'updateList' &&
          item.updateDetailList.find((updateItem) => updateItem.updateField === el?.key)
        ) {
          return (
            <div>
              <p className={styles.nowData}>{text}</p>
              <p className={styles.jiantou}>⬆</p>
              <p className={styles.beforeData}>
                {
                  item.updateDetailList.find((updateItem) => updateItem.updateField === el?.key)
                    ?.before
                }
              </p>
            </div>
          );
        } else {
          return text || '-';
        }
      },
      width: el?.width,
      className: el?.className,
      // onHeaderCell: (column: any) => ({
      //   onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
      // }),
    };
  });
};
