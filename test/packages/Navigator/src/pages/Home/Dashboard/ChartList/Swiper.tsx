import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import Swiper from 'react-id-swiper';
import config from './swiper.config';
import ChartCard from '../ChartCard';

export default ({ chartList }: any) => {
  const dispatch = useDispatch();
  const swiperRef: any = useRef(null);
  const [swiper, setSwiper]: any = useState(null);
  useEffect(() => {
    if (swiper) {
      swiper?.update();
      swiper?.scrollbar?.updateSize();
    }
  }, [chartList]);

  const loadCharts = () => {
    dispatch({
      type: 'dashboardController/loadCharts',
    });
  };
  useLayoutEffect(() => {
    setSwiper(swiperRef?.current?.swiper);
  });
  return (
    <Swiper
      {...config({
        swiper,
        setSwiper,
        loadCharts,
      })}
      // @ts-ignore
      ref={swiperRef}
    >
      {lodash.map(chartList, (dashboardCode: string) => (
        <div key={dashboardCode}>
          <ChartCard dashboardCode={dashboardCode} swiper={swiperRef?.current?.swiper} />
        </div>
      ))}
    </Swiper>
  );
};
