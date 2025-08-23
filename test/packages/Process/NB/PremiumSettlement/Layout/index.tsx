import React from 'react';
import styles from './index.less';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div className={styles.cheque}>{slots.get('Cheque')}</div>
      <div className={styles.warning}>{slots.get('WarningMessage')}</div>
      <div className={styles.permium}>{slots.get('Premium')}</div>
      <div className={styles.permiumInfo}>{slots.get('CalcProcess')}</div>
    </div>
  );
};
