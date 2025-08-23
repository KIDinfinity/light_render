import React from 'react';
import styles from './index.less';

export default ({ value, sourceSystem }: any) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{`${sourceSystem} ID`}</span>
      <span className={styles.info}>{value}</span>
    </div>
  );
};
