import React, { useState } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';
import Filter from '../Filter';
import { setUpdateChartData } from '../../../Utils/Action';
import styles from './index.less';

export default ({
  dashboardSearchFieldList,
  dashboardCode,
  form,
  swiper,
  SearchRef,
  setChartWidth,
  ChartRef,
  lock,
}: any) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    form.validateFields(async (error: any) => {
      if (error) return;
      setLoading(true);
      await dispatch({
        type: 'dashboardController/queryChartData',
        payload: {
          dashboardCode,
        },
      });
      setUpdateChartData({ swiper, SearchRef, setChartWidth, ChartRef, lock });
      setLoading(false);
    });
  };

  return (
    <div className={styles.buttonBar}>
      <Button
        className={styles.refresh}
        loading={loading}
        type="link"
        icon="sync"
        size="small"
        onClick={onRefresh}
      />
      {dashboardSearchFieldList?.length > 0 ? (
        <div className={styles.filter}>
          <Filter
            dashboardSearchFieldList={dashboardSearchFieldList}
            dashboardCode={dashboardCode}
          />
        </div>
      ) : null}
    </div>
  );
};
