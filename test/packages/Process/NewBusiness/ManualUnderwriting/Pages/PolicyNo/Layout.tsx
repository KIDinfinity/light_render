import React from 'react';

import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';

import styles from './layout.less';

const Layout = ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.head}>
      <div className={styles.titlewrap}>
        <div className={styles.policyIdContainer}>{slots.get('PolicyId')}</div>
        <div className={styles.statusContainer}>
          {slots.get('OWBStatus')}
          {slots.get('LAStatus')}
        </div>
      </div>
    </div>
  );
};

export default Layout;
