import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './TransactionLimitItem.less';

export default ({ item }) => (
  <div className={styles.TransationBlock}>
    <p className={styles.title2}>
      {formatMessageApi({
        Label_BIZ_Claim: 'app.usermanagement.permission.module-name',
      })}
    </p>
    <div className={styles.show2}>
      <div className={styles.bigFont}>{item.applicationModule}</div>
      <span className={styles.smallFont}>{item.controlValue} </span>
    </div>
  </div>
);
