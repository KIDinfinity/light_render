import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import Loading from 'basic/components/Loading';
import styles from './index.less';

export default ({ children, loading }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div className={styles.header}>{slots.get('header')}</div>
      <Loading loading={loading}>
        <div className={styles.main}>
          <div className={styles.versions}>{slots.get('versions')}</div>
          <div className={styles.content}>{slots.get('content')}</div>
        </div>
      </Loading>
    </div>
  );
};
