import React from 'react';
import {  Table } from 'antd';
import useGetTsarBreakDownListTableData from '../_hooks/useGetTsarBreakDownListTableData';
import styles from './index.less';

const TsarBreakDownListSetion = ({ role }: any) => {
  const { columns, dataSource } = useGetTsarBreakDownListTableData({ role });

  return (
    <>
      <div className={styles.Table}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>
    </>
  );
};

export default TsarBreakDownListSetion;
