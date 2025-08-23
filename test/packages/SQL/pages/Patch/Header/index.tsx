import React from 'react';
import { tenant } from '@/components/Tenant';
import Git from '../Git';

import styles from './index.less';

export default () => {
  const disabled = tenant.activeProfile() !== 'presit';

  return (
    <div className={styles.header}>
      <h1>Data Patch</h1>
      {!disabled && <Git />}
    </div>
  );
};
