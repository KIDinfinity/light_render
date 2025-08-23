import React from 'react';
import { Select } from 'antd';
import lodash from 'lodash';
import styles from './index.less';

export default ({ departmentList, setDepartment }: any) => {
  const onChange = (value: any) => {
    setDepartment(value);
  };

  return (
    <Select
      placeholder="Department"
      onChange={onChange}
      allowClear
      className={styles.department}
      mode="multiple"
    >
      {lodash.map(departmentList, (item: any) => (
        <Select.Option key={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
};
