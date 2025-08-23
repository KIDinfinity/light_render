import React from 'react';
import { formatDate } from '../../../../_functions';

import styles from './PolicyItem.less';

export default ({ exclusionCategory, currentFrom, currentTo }: any) => {
  return (
    <div className={styles.policyHeader}>
      <div className={styles.policyType}>
        <span>{exclusionCategory}</span>
      </div>
      <div className={styles.policyDate}>
        {currentFrom && currentTo && (
          <span>{`${formatDate(currentFrom)} ~ ${formatDate(currentTo)}`}</span>
        )}
      </div>
    </div>
  );
};
