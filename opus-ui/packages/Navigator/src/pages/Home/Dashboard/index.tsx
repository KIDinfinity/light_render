import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Empty from '@/components/Empty';
import ChartList from './ChartList';
import ChartFilter from './ChartFilter';
import Loading from './Loading';
import ChartCanvas from './ChartCanvas';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const chartList = useSelector((state: any) => state.dashboardController.chartList);

  const loading = useSelector(
    (state: any) => state.loading.effects['dashboardController/listDashboards']
  );

  const cleanDatas = () => {
    dispatch({
      type: 'dashboardController/cleanDatas',
    });
  };

  useEffect(() => {
    dispatch({
      type: 'dashboardController/listDashboards',
    });
    window.addEventListener('beforeunload', cleanDatas);
    return () => {
      cleanDatas();
      window.removeEventListener('beforeunload', cleanDatas);
    };
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        {!loading ? (
          <>
            {chartList?.length ? <ChartList /> : <Empty className={styles.empty} />}
            <ChartFilter />
          </>
        ) : (
          <Loading />
        )}
      </div>
      <ChartCanvas />
    </>
  );
};
