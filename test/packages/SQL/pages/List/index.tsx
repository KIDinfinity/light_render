import React from 'react';
import { Form, Table } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { useAntdTable } from 'ahooks';
import columns from './columns';
import Search from './Search';
import SpliceUpload from './Operator/SpliceUpload';
import styles from './index.less';

const Import = ({ form }: any) => {
  const dispatch = useDispatch();
  const pageList = useSelector(({ sqlController }: any) => sqlController?.pageList);
  const getTableData = async ({ current, pageSize }: any, params: any) => {
    const result = await dispatch({
      type: 'sqlController/listPage',
      payload: {
        current,
        pageSize,
        params,
      },
    });
    return result;
  };
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });
  const { dataSource } = tableProps;
  return (
    <div className={styles.import}>
      <div className={styles.header}>
        <Search form={form} submit={search.submit} />
        <SpliceUpload search={search} />
      </div>
      <Table
        scroll={{
          x: 'max-content',
          y: 'calc(100vh - 290px)',
          scrollToFirstRowOnChange: true,
        }}
        columns={columns(search)}
        rowKey="id"
        {...tableProps}
        dataSource={[...pageList, ...dataSource]}
      />
    </div>
  );
};

export default Form.create()(Import);
