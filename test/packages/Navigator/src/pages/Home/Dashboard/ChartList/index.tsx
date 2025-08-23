import React from 'react';
import { useSelector } from 'dva';
import Swiper from './Swiper';
import Loading from './Loading';
import styles from './index.less';

export default () => {
  const chartList = useSelector((state: any) => state.dashboardController.chartList);

  return (
    <div className={styles.chartList}>
      {chartList?.length ? <Swiper chartList={chartList} /> : ''}
      <Loading />
    </div>
  );
};
