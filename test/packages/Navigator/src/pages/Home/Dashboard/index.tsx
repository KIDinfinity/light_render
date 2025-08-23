import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Loading from './Loading';
import ChartCanvas from './ChartCanvas';
import DefaultDashboard from './DefaultDashboard';
import CommonDashboard from './CommonDashboard';
import styles from './index.less';
import classnames from 'classnames';

export default () => {
  const dispatch = useDispatch();

  const dashboardVersion = useSelector((state: any) => state.dashboardController.dashboardVersion);
  const loading = useSelector(
    (state: any) => state.loading.effects['dashboardController/getDashboardList']
  );

  const cleanDatas = () => {
    dispatch({
      type: 'dashboardController/cleanDatas',
    });
  };

  useEffect(() => {
    dispatch({
      type: 'dashboardController/getDashboardList',
    });
    window.addEventListener('beforeunload', cleanDatas);
    return () => {
      cleanDatas();
      window.removeEventListener('beforeunload', cleanDatas);
    };
  }, []);

  return (
    <div
      className={classnames({
        [styles.dashboard]: true,
        [styles.dashboardPadding]: dashboardVersion !== 'common',
        [styles.dashboardPadding2]: dashboardVersion === 'common',
      })}
    >
      <div
        className={classnames(
          {
            [styles.container]: true,
            [styles.containerHeight1]: dashboardVersion !== 'common',
            [styles.containerHeight2]: dashboardVersion === 'common',
          },
          'guidance-newDashboard-highlight-one'
        )}
      >
        {!loading ? (
          dashboardVersion === 'common' ? (
            <CommonDashboard />
          ) : (
            <DefaultDashboard />
          )
        ) : (
          <Loading />
        )}
        <ChartCanvas />
      </div>
    </div>
  );
};
