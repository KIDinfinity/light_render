import React from 'react';
import SmartCircle from './SmartCircle';
import SmartCircleSubmit from './SmartCircleSubmit';
import styles from './index.less';

export default () => (
  <div className={styles.wrap}>
    <div className={styles.content}>
      <SmartCircle />
    </div>
    <SmartCircleSubmit />
  </div>
);
