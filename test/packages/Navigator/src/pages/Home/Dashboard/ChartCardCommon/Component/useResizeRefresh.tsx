import React, { useEffect, useState, useLayoutEffect } from 'react';
import { debounce } from 'lodash';
import { Spin } from 'antd';
import {
  getResponsivePx as getResponsivePxUtil,
  getResponsivePxList as getResponsivePxListUtil,
  px2rem as px2remUtil,
} from '@/utils/responsiveUtils';
import styles from './chart.less';

const useResizeRefresh = (containerId: string, dependencies: any[] = [], zoom: number = 1) => {
  const [refresh, setRefresh] = useState(false);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const { offsetWidth, offsetHeight } = document.getElementById(containerId) || {};

  const px2rem = (px: number) => px2remUtil(px, { unit: true, zoom: zoom });
  const getResponsivePx = (number: number) => getResponsivePxUtil(number, zoom);
  const getResponsivePxList = (nums: number[]) => getResponsivePxListUtil(nums, zoom);

  const updateDimensions = debounce(() => {
    // 占满整个宽高，多少由父组件决定
    if (offsetWidth && offsetWidth > 0 && offsetHeight && offsetHeight > 0) {
      setChartWidth(offsetWidth);
      setChartHeight(offsetHeight);
      const legend = document.getElementById(containerId)?.querySelector('.g2-legend');
      if (legend) {
        const wrapper = legend.querySelector('.g2-legend-list-wrapper') as HTMLElement;
        const item = legend.querySelector('.g2-legend-list-item') as HTMLElement;
        if (wrapper && item) {
          setPageSize(Math.floor(wrapper.offsetWidth / item.offsetWidth));
        }
      }
    }
  }, 100);

  useLayoutEffect(() => {
    updateDimensions();
  }, [offsetWidth, offsetHeight]);

  useEffect(() => {
    setRefresh((prev) => !prev); // 监听依赖变化触发刷新
  }, dependencies);

  return {
    refresh,
    chartWidth,
    chartHeight,
    chartKey: `${containerId}_${chartWidth}_${chartHeight}`,
    px2rem,
    getResponsivePx,
    getResponsivePxList,
    pageSize,
  };
};

export const ChartLoading = () => (
  <div className={styles.loading}>
    <Spin spinning={true} size="large" />
  </div>
);

export default useResizeRefresh;
