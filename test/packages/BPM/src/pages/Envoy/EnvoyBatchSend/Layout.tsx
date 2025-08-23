import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import useGetEnvoyBatachVisible from 'bpm/pages/Envoy/hooks/useGetEnvoyBatachVisible';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const visible = useGetEnvoyBatachVisible();
  return (
    <>
      {visible ? (
        <div className={styles.batchEnvoyContiner}>
          <div className={styles.dropdown}>{slots.get('dropdown')}</div>
          <div className={styles.action}>{slots.get('sendButton')}</div>
        </div>
      ) : null}
    </>
  );
};
