import React from 'react';
import { useSelector } from 'dva';
import Empty from '@/components/Empty';
import ChartList from './ChartList';
import ChartFilter from './ChartFilter';
import Loading from './Loading';
import styles from './index.less';

export default () => {
  const chartList = useSelector((state: any) => state.dashboardController.chartList);

  const loading = useSelector(
    (state: any) => state.loading.effects['dashboardController/getDefaultDashboardList']
  );

  return (
    <>
      {!loading ? (
        <>
          {chartList?.length ? <ChartList /> : <Empty className={styles.empty} />}
          <ChartFilter />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
