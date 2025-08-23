import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

export default ({ setSearch }: any) => {
  const onChange = ({ target: { value } }: any) => {
    setSearch(value);
  };

  return (
    <Input
      onChange={onChange}
      allowClear
      suffix={<Icon type="search" />}
      placeholder="Name"
      className={styles.inputName}
    />
  );
};
