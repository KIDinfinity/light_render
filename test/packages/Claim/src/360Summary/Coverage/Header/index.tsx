import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default () => {
  return <h2 className={styles.title}>{formatMessageApi({ Label_BIZ_Policy: 'Coverage' })}</h2>;
};
