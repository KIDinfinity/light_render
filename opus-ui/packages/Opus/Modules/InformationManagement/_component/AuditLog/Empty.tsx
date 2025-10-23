import React from 'react';
import empty from './assets/empty.png';
import styles from './Empty.less';
const Empty = () => (
  <div className={styles.emptyWrap}>
    <div className="contentBox">
      <img src={empty} className={styles.emptyImg} />
      <div className={styles.emptySes}>No records to display</div>
    </div>
  </div>
);

export default Empty;
