import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div>{slots.get('Action')}</div>
      <div className={styles?.chequeField}>{slots.get('ChequeField')}</div>
      <div className={styles?.chequeTable}>{slots.get('ChequeTable')}</div>
    </div>
  );
};
