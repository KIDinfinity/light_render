import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

const Loading = ({ loading, children }: any) => {
  return (
    <div className={styles.loadingProvider}>
      {loading === true && <Spin />}
      {loading === false && children}
    </div>
  );
};

export default React.memo(Loading);
