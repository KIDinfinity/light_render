import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({
    children,
  });
  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>{slots.get('leftBlock')}</div>
      <div className={styles.rightBlock}>{slots.get('rightBlock')}</div>
    </div>
  );
};
