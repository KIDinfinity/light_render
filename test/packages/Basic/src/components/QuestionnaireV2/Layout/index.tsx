import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

const Layout: React.FC = ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div className={styles.actions}>{slots.get('Actions')}</div>
      <div className={styles.content}>
        <div className={styles.top}>{slots.get('Clients')}</div>
        <div className={styles.bottom}>
          <div className={styles.QuestionnaireTitles}>{slots.get('QuestionnaireTitles')}</div>
          <div className={styles.Questions}>{slots.get('Questions')}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
