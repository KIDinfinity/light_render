import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import Policy from './PolicySection';
import styles from './index.less';
import Coverage from './CoverageSection';
import Empty from '@/components/Empty';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  const policyInfoList = useSelector(({ insured360 }: any) => insured360?.policyInfoList) || [];
  const region = tenant.region();
  return (
    <div className={styles.policy}>
      {!lodash.isEmpty(policyInfoList) ? (
        <>
          {region !== Region.VN && <Coverage />}
          <Policy />
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
