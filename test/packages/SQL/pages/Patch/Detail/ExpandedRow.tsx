import React, { useMemo } from 'react';
import moment from 'moment';
import { Table, Icon } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';

import styles from './index.less';

// const data = [
//   {
//     checksum: 'b0da198806c247b196a1c96ce343d3fd', // 文件校验码，md5
//     currentEnvironment: 'presit', // 当前运行环境
//     currentRegion: 'hk', // 当前运行 region
//     environments: 'presit,sit,aws_dep_dev', // 可执行的目标环境
//     execTime: 1627011660539, // 执行时间
//     message:
//       '[{"success":true,"tenant":"hk"},{"message":"table misc_dict doesn\'t exist!","success":false,"tenant":"th"}]', // 执行错误信息，JSON 字符串
//     patchItemName: 'misc_dict.sql', // patch item 名称
//     regions: 'hk,th', // 可执行的 region
//     status: 'SUCCESS', // 执行状态： SUCCESS, FAIL
//     targetDataSource: 'ds_misc_dict', // 目标数据源名称
//     type: 'IMPORT', // 输入类型，取值有：INPUT，IMPORT
//   },
// ];

export default ({ editable = false, data, setSelectItem, setIndex, setType, setVisible }: any) => {
  const rowSelection = useMemo(
    () =>
      editable
        ? {
            onChange: (selectedRowKeys, selectedRows) => {
              if (setSelectItem) {
                setSelectItem(selectedRows);
              }
            },
          }
        : null,
    [editable]
  );

  const columnsRender = useMemo(() => {
    return lodash.filter(
      [
        { title: 'Item Name', dataIndex: 'patchItemName', key: 'patchItemName' },
        {
          title: 'Environments',
          dataIndex: 'environments',
          key: 'environments',
          render: (value: any[] | string) =>
            (value?.join && lodash.uniqBy(value, lodash.toLower).join(',')) || value,
        },
        {
          title: 'Current Environment',
          dataIndex: 'currentEnvironment',
          key: 'currentEnvironment',
          render: (value: any[] | string) =>
            (value?.join && lodash.uniqBy(value, lodash.toLower).join(',')) || value,
        },
        {
          title: 'Regions',
          dataIndex: 'regions',
          key: 'regions',
          render: (value: any[] | string) =>
            (value?.join && lodash.uniqBy(value, lodash.toLower).join(',')) || value,
        },
        { title: 'Data Source', dataIndex: 'targetDataSource', key: 'targetDataSource' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
          title: 'Execute Time',
          dataIndex: 'execTime',
          key: 'execTime',
          render: (value: string) => moment(Number(value)).format('L'),
        },
        { title: 'Message', dataIndex: 'message', key: 'message' },
        {
          title: 'Operation',
          dataIndex: 'operation',
          width: '100px',
          render: (a: any, b: any, index: number) => {
            return (
              <div className={styles.operationGroup}>
                <div className={classnames('ant-table-row-expand-icon', styles.operationIcon)}>
                  <Icon
                    type="edit"
                    theme="filled"
                    onClick={() => {
                      setIndex(index);
                      setType('update');
                      setVisible(true);
                    }}
                  />
                </div>
              </div>
            );
          },
        },
      ],
      (item) => item.dataIndex !== 'operation' || editable
    );
  }, [editable]);

  return (
    <Table
      columns={columnsRender}
      dataSource={data}
      pagination={false}
      rowSelection={rowSelection}
      rowKey="patchItemName"
    />
  );
};
