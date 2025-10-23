import React from 'react';
import { Icon } from 'antd';
import { useDispatch } from 'dva';
import styles from './index.less';

export default ({ dashboardCode }: any) => {
  const dispatch = useDispatch();

  const hideChart = () => {
    dispatch({
      type: 'dashboardController/toggleChartVisible',
      payload: {
        dashboardCode,
      },
    });
  };

  return (
    <div className={styles.button}>
      <Icon onClick={hideChart} type="minus" />
    </div>
  );
};
