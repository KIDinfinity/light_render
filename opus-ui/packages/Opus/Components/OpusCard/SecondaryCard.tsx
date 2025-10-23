import React from 'react';
import type { ReactNode } from 'react';

import styles from './index.less';

const SecondaryCard = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className={styles.secondaryCard}>
      <div className={styles.secondaryCardTitle}>{title}</div>
      <div className={styles.secondaryCardInner}>{children}</div>
    </div>
  );
};

export default SecondaryCard;
