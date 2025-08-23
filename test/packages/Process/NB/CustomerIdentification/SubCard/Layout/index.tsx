import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div className={styles.profile}>{slots.get('profile')}</div>
      <div className={styles.identityInfo}>{slots.get('identityInfo')}</div>
    </div>
  );
};
