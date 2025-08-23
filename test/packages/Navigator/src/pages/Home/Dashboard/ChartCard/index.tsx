import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'dva';
import classnames from 'classnames';
import Title from './Title';
import Expand from './Expand';
import Chart from './Chart';
import Button from './Button';
import Search from './Search';
import { runTime } from '../Utils';
import styles from './index.less';
import { useResponsivePx } from '@/utils/responsiveUtils';

export default ({ dashboardCode, swiper }: any) => {
  const { width, title, frequency } = useSelector(
    (state: any) => state.dashboardController?.chartListMap?.[dashboardCode]
  );

  const [chartWidth, setChartWidth]: any = useState(null);
  const [showSearch, setShowSearch]: any = useState(false);
  const [lock, setLock] = useState(false);
  const SearchRef: any = useRef();
  const ChartRef: any = useRef();

  useEffect(() => {
    if (swiper) {
      swiper?.update();
      swiper?.scrollbar?.updateSize();
    }
  }, [showSearch]);

  runTime({
    dashboardCode,
    frequency: frequency || 30,
  });

  const chartItemWidth = chartWidth && chartWidth < width ? chartWidth : width;
  const responsiveChartItemWidth = useResponsivePx(chartItemWidth / 2);
  const responsiveChartContentWidth = useResponsivePx(width / 2);

  return (
    <div
      className={classnames({
        [styles.chartCard]: true,
        [dashboardCode]: true,
      })}
    >
      <div
        className={styles.chartItem}
        style={{ width: chartItemWidth / 2 + responsiveChartItemWidth + 'px' }}
      >
        <Button dashboardCode={dashboardCode} />
        <Title title={title} />
        <div className={styles.chartScroll}>
          <div
            className={styles.chartContent}
            style={{ width: width / 2 + responsiveChartContentWidth + 'px' }}
            ref={ChartRef}
          >
            <Chart dashboardCode={dashboardCode} chartWidth={chartWidth} />
          </div>
        </div>
        <Expand
          swiper={swiper}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          lock={lock}
          setLock={setLock}
          setChartWidth={setChartWidth}
          SearchRef={SearchRef}
        />
      </div>
      <div
        className={classnames({
          [styles.chartSearch]: true,
          [styles.showSearch]: showSearch,
        })}
        ref={SearchRef}
      >
        <Search
          swiper={swiper}
          SearchRef={SearchRef}
          dashboardCode={dashboardCode}
          showSearch={showSearch}
          lock={lock}
          setShowSearch={setShowSearch}
          setChartWidth={setChartWidth}
          ChartRef={ChartRef}
        />
      </div>
    </div>
  );
};
