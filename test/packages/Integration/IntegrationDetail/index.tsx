import React from 'react';
import useGetIntegrationDetail from 'integration/_hooks/useGetIntegrationDetail';
import Process from './Process';
import Title from './Title';
import styles from './index.less';

export default () => {
  const detail = useGetIntegrationDetail();
  return (
    <div className={styles.container}>
      <Title
        title={detail.integrationCode}
        callStatus={detail.callStatus}
        nextRetryTime={detail.nextRetryTime}
      />
      <Process interfaceProcessList={detail.interfaceProcessList} />
    </div>
  );
};
