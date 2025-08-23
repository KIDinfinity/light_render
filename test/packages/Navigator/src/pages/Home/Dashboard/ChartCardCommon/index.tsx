import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import classnames from 'classnames';
import Chart from './Chart';
import { runTime } from '../Utils';
import styles from './index.less';
import { Icon } from 'antd';
import { ReactComponent as FilterSvg } from 'navigator/assets/dashboard-filter.svg';
import Filter from './Filter';

export default ({ dashboardCode, zoom, dashWidth }: any) => {
  const dispatch = useDispatch();
  const { frequency, openFilter, dashboardSearchFieldList, showFilter, chartData } =
    useSelector((state: any) => state.dashboardController?.chartListMap?.[dashboardCode]) || {};
  const dashboardHidden = useSelector((state: any) => state.navigatorHomeWatching.dashboardHidden);

  const [loading, setLoading]: any = useState(false);
  const [hasManualRefreshed, setHasManualRefreshed] = useState(false);

  const setOpenFilter = (isOpen) => {
    if (isOpen != openFilter) {
      dispatch({
        type: 'dashboardController/setOpenFilter',
        payload: { isOpen, dashboardCode },
      });
    }
  };
  const ChartRef: any = useRef();

  const refreshDashboradHandle = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setOpenFilter(false);

    await dispatch({
      type: 'dashboardController/queryChartData',
      payload: { dashboardCode },
    });
    setLoading(false);
  };

  useEffect(() => {
    setHasManualRefreshed(false);
  }, [dashboardCode]);

  // 缓存数据为空的情况下自动重新加载数据
  useEffect(() => {
    if (!loading && !hasManualRefreshed && !chartData?.data?.length) {
      setHasManualRefreshed(true);
      refreshDashboradHandle();
    }
  }, [hasManualRefreshed]);

  runTime({
    dashboardCode,
    frequency: frequency || 30,
  });
  return (
    <div
      className={classnames({
        [styles.chartCard]: true,
        [dashboardCode]: true,
      })}
    >
      <div className={styles.chartItem}>
        <div className={styles.chartScroll}>
          <div className={styles.iconList}>
            {!openFilter && (
              <>
                <div className={styles.iconBox}>
                  <Icon
                    type="sync"
                    className={styles.refreshIcon}
                    onClick={refreshDashboradHandle}
                  />
                </div>
                {showFilter && (
                  <div className={styles.iconBox}>
                    <Icon
                      component={FilterSvg}
                      className={classnames(
                        styles.refreshIcon,
                        'guidance-newDashboard-container-two'
                      )}
                      onClick={() => {
                        setOpenFilter(!openFilter);
                      }}
                    />
                  </div>
                )}
              </>
            )}
            {openFilter && (
              <>
                <div className={classnames(styles.iconBox)}>
                  <Icon
                    type={'check'}
                    className={classnames(
                      styles.checkIcon,
                      'guidance-newDashboard-container-three'
                    )}
                    onClick={refreshDashboradHandle}
                  />
                </div>
                <div className={styles.iconBox}>
                  <Icon
                    type="close"
                    className={styles.refreshIcon}
                    onClick={() => {
                      setOpenFilter(!openFilter);
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {openFilter && (
            <div className={classnames(styles.chartContent, 'guidance-newDashboard-highlight-two')}>
              <Filter
                dashboardSearchFieldList={dashboardSearchFieldList}
                dashboardCode={dashboardCode}
              />
            </div>
          )}
          <div className={styles.chartContent} ref={ChartRef}>
            <Chart
              dashboardHidden={dashboardHidden}
              dashboardCode={dashboardCode}
              pageLoading={loading}
              openFilter={openFilter}
              zoom={zoom}
              dashWidth={dashWidth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
