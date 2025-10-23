import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({
    children,
  });

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.common}>
            <div className={styles.name}>{slots.get('name')}</div>
            <div className={styles.identityTag}>
              <div className={styles.newandtype}>
                <div className={styles.newClientFlag}>{slots.get('newClientFlag')}</div>
                <div className={styles.customerType}>{slots.get('customerType')}</div>
              </div>
              <div className={styles.role}>
                <div className={styles.roles}>{slots.get('roles')}</div>
              </div>
            </div>
          </div>
          <div className={styles.basicInfo}>{slots.get('basicInfo')}</div>
        </div>
        <div className={styles.expandButton}>{slots.get('expandButton')}</div>
      </div>
    </>
  );
};
