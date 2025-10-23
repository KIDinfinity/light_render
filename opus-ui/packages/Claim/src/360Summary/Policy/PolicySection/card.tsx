import React from 'react';
import lodash from 'lodash';

import styles from './card.less';

export default ({ children, title, showLength = false }: any) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>{title}</div>
        {showLength && <span className={styles.mark}>{lodash.size(children)}</span>}
      </div>
      {children}
    </div>
  );
};
