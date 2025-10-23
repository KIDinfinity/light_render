import { judgeIsInEnvList } from 'navigator/utils';
import React from 'react';
import CategoryFilter from '../CategoryFilter';
import styles from './index.less';
import Table from './Table';
import TableGetData from './TableGetData';

export default () => {
  // 需要屏蔽的环境：TH Staging、Production/HK SIT、UAT、Production
  const isInTHExcludeEnv = judgeIsInEnvList([
    'omp_th_preProd',
    'omp_th_prod',
    'dcp_dev',
    'dcp_uat',
    'dcp_prod',
  ]);

  return (
    <div className={styles.bg}>
      {!isInTHExcludeEnv && <CategoryFilter className={styles.categoryFilter} />}
      <TableGetData />
      <Table />
    </div>
  );
};
