import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

const Layout = ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.applicationIdentity}>{slots.get('applicationIdentity')}</div>
        <div className={styles.userInfo}>{slots.get('userInfo')}</div>
        <div className={styles.roles}>{slots.get('role')}</div>
        <div className={styles.customerType}>{slots.get('customerType')}</div>
        {slots.get('relationship') && (
          <div className={styles.relationship}>{slots.get('relationship')}</div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.questionnaire}>{slots.get('questionnaire')}</div>
      </div>
    </div>
  );
};

export default Layout;
