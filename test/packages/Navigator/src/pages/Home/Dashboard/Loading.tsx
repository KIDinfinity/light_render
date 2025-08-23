import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default () => {
  return <Spin className={styles.spin} />;
};
