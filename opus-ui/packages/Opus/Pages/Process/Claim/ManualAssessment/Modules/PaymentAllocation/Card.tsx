import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';

export default ({ title, actions, children, actionComponent }: any) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessageApi({ Label_CLM_Opus: title })}</div>
        <div className={styles.buttons}>
          <div className={styles.actions}>{React.isValidElement(actions) && actions}</div>
          <div className={styles.actionComponent}>{React.isValidElement(actionComponent) && actionComponent}</div>
        </div>
      </div>
      <div className={styles.contrainer}>{children}</div>
    </div>
  );
};
