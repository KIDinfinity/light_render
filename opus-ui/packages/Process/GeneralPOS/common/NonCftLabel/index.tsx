import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const CustomerType = () => {
  return (
    <span
      className={styles.customerType}
    >
         {formatMessageApi({
          Label_BPM_CaseInfo: 'VIP',
        })}
  </span>
  );
};
export default CustomerType;
