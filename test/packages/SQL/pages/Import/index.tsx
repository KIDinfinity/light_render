import React from 'react';
import { Form, Table } from 'antd';
import { useDispatch } from 'dva';
import { useAntdTable } from 'ahooks';
import columns from './columns';
import Search from './Search';
import Upload from './Operator/Upload';
import styles from './index.less';

const Import = ({ form }: any) => {
  const dispatch = useDispatch();

  const getTableData = async ({ current, pageSize }: any) => {
    // eslint-disable-next-line no-return-await
    return await dispatch({
      type: 'sqlController/list',
      payload: {
        current,
        pageSize,
      },
    });
  };
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });
  return (
    <div className={styles.import}>
      <div className={styles.header}>
        <Search form={form} submit={search.submit} />
        <Upload search={search} />
      </div>
      <Table
        scroll={{
          x: 'max-content',
          y: 'calc(100vh - 290px)',
          scrollToFirstRowOnChange: true,
        }}
        columns={columns(search)}
        rowKey="fileName"
        {...tableProps}
      />
    </div>
  );
};

export default Form.create()(Import);
