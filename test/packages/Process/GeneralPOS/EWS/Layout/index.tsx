import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import Loading from 'basic/components/Loading';
import styles from './index.less';
import Empty from '@/components/Empty';

export default ({ children, loading, isEmpty }: any) => {
  const slots = useRegisteredSlots({ children });
  return (
    <div className={styles.container}>
      <div className={styles.header}>{slots.get('header')}</div>
      <Loading loading={loading}>
        <div className={styles.main}>
          {isEmpty ? (
            <Empty />
          ) : (
            <>
              <div className={styles.versions}>{slots.get('versions')}</div>
              <div className={styles.content}>{slots.get('content')}</div>
            </>
          )}
        </div>
      </Loading>
    </div>
  );
};
