import React from 'react';
import styles from './index.less';

const SectionTitle = ({ title }) => (
  <div className={styles.titleBox}>
    <div className={styles.line} />
    <div className={styles.title}>{title}</div>
    <div className={styles.line} />
  </div>
);

export default SectionTitle;
