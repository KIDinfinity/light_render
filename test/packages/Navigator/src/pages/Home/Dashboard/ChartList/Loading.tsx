import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'dva';
import styles from './index.less';

export default () => {
  const loading = useSelector(
    (state: any) => state.loading.effects['dashboardController/loadCharts']
  );
  const hasMore = useSelector((state: any) => state.dashboardController.hasMore);

  return <>{loading && hasMore && <Spin className={styles.spin} />}</>;
};
