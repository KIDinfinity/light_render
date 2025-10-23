import React from 'react';
import { Table } from 'antd';
import { useLoanColumns } from '../hooks';
type IProps = {
  data: any[];
};
export default ({ data }: IProps) => {
  const columns = useLoanColumns(true, 'click');
  return <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />;
};
