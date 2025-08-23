import type { ReactElement } from 'react';
import React from 'react';
import styles from './pendingMemo.less';

export default ({ title }: { title: ReactElement | string }) => {
  return <div className={styles.add}>{title}</div>;
};
