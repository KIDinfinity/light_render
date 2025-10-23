import React from 'react';
import styles from './index.less';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });

  return (
    <div className={styles.container}>
      <div className={styles.summary}>{slots.get('Summary')}</div>
      <div className={styles.dataContainer}>
        <div className={styles.tsar}>{slots.get('TSAR')}</div>
        <div className={styles.maxPerLifeData}>{slots.get('MaxPerLife')}</div>
      </div>
    </div>
  );
};
