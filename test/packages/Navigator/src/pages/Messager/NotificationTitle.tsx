import React from 'react';
import styles from './NotificationTitle.less';

const NotificationTitle = ({ title }) => (
  <div className={styles.container}>
    <h5>{title}</h5>
    <div className={styles.line} />
  </div>
);

export default NotificationTitle;
