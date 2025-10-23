import React from 'react';
import styles from './index.less';

function SectionBorder({ children, title }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionBorder}>
        <div className={styles.sectionTitle}>{title}</div>
        {children}
      </div>
    </div>
  );
}

export default SectionBorder;
