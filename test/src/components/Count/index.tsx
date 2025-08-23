import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default ({ loading, title, length }: any) => {
  return (
    <div className={styles.count}>
      {title}{' '}
      {loading ? (
        <div className={styles.spin}>
          <Spin />
        </div>
      ) : (
        <>({length})</>
      )}
    </div>
  );
};
