import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import Policy from './PolicySection';
import styles from './index.less';
import Empty from '@/components/Empty';

export default () => {
  const policyInfoList = useSelector(({ insured360 }: any) => insured360?.policyInfoList) || [];
  return (
    <div className={styles.policy}>{!lodash.isEmpty(policyInfoList) ? <Policy /> : <Empty />}</div>
  );
};
