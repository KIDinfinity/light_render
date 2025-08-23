import React from 'react';
import Cancel from './Cancel';
import Transfer from './Transfer';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.actions}>
      <Transfer />
      <Cancel />
    </div>
  );
};
