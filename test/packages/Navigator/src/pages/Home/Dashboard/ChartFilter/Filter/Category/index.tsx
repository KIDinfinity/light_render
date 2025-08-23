import React from 'react';
import { Select } from 'antd';
import lodash from 'lodash';
import styles from './index.less';

export default ({ categoryList, setCategory }: any) => {
  const onChange = (value: any) => {
    setCategory(value);
  };

  return (
    <Select
      placeholder="Category"
      onChange={onChange}
      allowClear
      className={styles.category}
      mode="multiple"
    >
      {lodash.map(categoryList, (item: any) => (
        <Select.Option key={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
};
