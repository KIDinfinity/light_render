import { Select } from 'antd';
import React from 'react';
import styles from './index.less';

export default props => {
  return (
    <div className={styles.container}>
      <Select {...props} />
    </div>
  )
};
