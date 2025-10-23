import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div className={styles.backButton}>{slots.get('backButton')}</div>
      <div className={styles.applicationNo}>{slots.get('applicationNo')}</div>
      <div className={styles.activity}>{slots.get('activity')}</div>
      <div className={styles.dueDate}>{slots.get('dueDate')}</div>
    </div>
  );
};
