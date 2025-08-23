import React, { useState } from 'react';
import styles from './index.less';
import useLoadSummaryData from 'summary/hooks/useLoadSummaryData';
import useHandleDefaultExpandSection from 'summary/hooks/useHandleDefaultExpandSection';
import Tenant from '@/components/Tenant';
import PageLoading from '@/components/PageLoading';
export default ({ children }: any) => {
  const [isTenantReady, setTenantReady] = useState(false);
  useLoadSummaryData();
  useHandleDefaultExpandSection();
  return (
    <>
      <Tenant setReady={setTenantReady} />
      {isTenantReady ? <div className={styles.container}>{children}</div> : <PageLoading />}
    </>
  );
};
