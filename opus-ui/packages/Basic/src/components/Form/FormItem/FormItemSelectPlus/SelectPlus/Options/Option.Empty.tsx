import React from 'react';
import { Select } from 'antd';
import Empty from '@/components/Empty';

export default () => {
  return (
    <Select.Option disabled key="dataIsNull">
      <Empty />
    </Select.Option>
  );
};
