/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState, useMemo } from 'react';
// @ts-ignore
import { Icon, Spin } from 'antd';
import ChartComponent from '../ChartComponent';
import { defaultChartList, reportColors } from '../config';
import { getResponsivePx } from '@/utils/responsiveUtils';
import { orderBy } from 'lodash';
import classnames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Autoplay } from 'swiper';
import useFollowUp from './useFollowUp';
import { useParams } from 'umi';
import Empty from '@/components/Empty';
import { TimerConf } from '../useQueryData';
import { FormateEP } from '@/utils/accuracy/Tools';
import styles from '../index.less';

const FollowUpItem = ({ item, modalRef, isLoading, loadingType, getFollowUpDetail }: any) => {
  const [region, setRegion] = useState(item.chartDatas?.fields?.[0]);
  const currentRegion = useRef(region);

  const categoryList = useMemo(
    () =>
      orderBy(
        item?.groupDatas?.[region]?.filter((el: any) => el?.total_count && el?.category),
        ['total_count'],
        ['desc']
      ),
    [region, item?.groupDatas]
  );

  useEffect(() => {
    currentRegion.current = region;
  }, [region]);

  const onChartClick = (_ev: any) => {
    const _region = _ev?.data?._origin?.name || _ev?.data?.point?.name || _ev?.data?.value;
    if (_region && _region !== region) {
      setRegion(_region);
    }
  };

  const onAxisLabelClick = (_ev: any) => {
    const { axisType, text } = _ev?.target?._attrs;
    if (axisType && text && text !== region) {
      setRegion(text);
    }
  };

  const openDetail = async () => {
    console.log('Open detail for:', item.category);
    const detailMonitorCategoryList = (item?.groupDatas?.[region] || [])
      ?.map((item) => item?.detail_monitor_category)
      ?.filter((item) => item);
    const details = await getFollowUpDetail(item.category, region, detailMonitorCategoryList);
    if (!details?.length) {
      return;
    }
    modalRef?.open({
      region,
      category: item.category,
      details,
    });
  };

  return (
    <div className={styles.followItem}>
      <div className={styles.followLeft}>
        <div className={styles.followHeader}>
          <div className={styles.subTitle}>{item.category}</div>
          <div className={styles.status} data-status={item?.status}>
            {item?.status}
          </div>
        </div>
        <div className={styles.chartContent}>
          <ChartComponent
            {...defaultChartList?.[0]}
            dashboardCode={item.category}
            chartData={item.chartDatas}
            data={item.chartDatas}
            chartConfig={{
              width: 462,
              height: 190,
              legend: {
                itemGap: getResponsivePx(item.chartDatas?.data?.length > 4 ? 20 : 40),
                offsetY: getResponsivePx(-10),
                clickable: false,
                visible: false,
              },
              onClick: onChartClick,
              onLegendItemClick: onChartClick,
              onAxisLabelClick: onAxisLabelClick,
              tooltip: {
                triggerOn: 'none',
              },
              geom: {
                style: {
                  cursor: 'pointer',
                },
              },
              xAxis: {
                tickLine: {
                  visible: true,
                  style: { lineWidth: 1, stroke: '#000000' },
                },
                line: {
                  lineDash: [4, 4],
                  stroke: '#12465533',
                },
                label: {
                  visible: true,
                  textStyle: {
                    fill: '#8B9793',
                    fontWeight: 'bold',
                    fontSize: 12,
                    cursor: 'pointer',
                    axisType: 'x',
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className={styles.followRight}>
        <div className={styles.followHeader}>
          <div className={styles.subTitle}>{region}</div>
          {categoryList?.length > 0 && (
            <>
              {isLoading && loadingType === item.category ? (
                <Spin />
              ) : (
                <Icon type="profile" className={styles.iconList} onClick={openDetail} />
              )}
            </>
          )}
        </div>
        <div className={classnames(styles.categoryList, 'scrollable-content')}>
          {categoryList?.map((cateItem: any) => (
            <div
              className={classnames(styles.categoryItem, 'animate-categoryItem')}
              key={`${cateItem?.category}_${cateItem?.region}`}
              style={
                {
                  '--point-color': /Critical/i.test(cateItem?.fail_level)
                    ? reportColors[0]
                    : /Warning/i.test(cateItem?.fail_level)
                      ? reportColors[1]
                      : reportColors[2],
                } as React.CSSProperties
              }
            >
              <span className={styles.category}> {cateItem?.category}</span>
              <span className={styles.count}>
                {!!cateItem?.total_count
                  ? FormateEP?.getThousandsFormat({
                      value: cateItem?.total_count || 0,
                      precision: 2,
                    })
                  : '--'}
              </span>
            </div>
          ))}
          {categoryList?.length === 0 && (
            <Empty style={{ width: 'auto', height: 'auto', margin: 'auto' }} />
          )}
        </div>
      </div>
    </div>
  );
};

const FollowUp = ({ followUpDatas = [], modalRef }: any) => {
  const params = useParams();
  const { isLoading, loadingType, getFollowUpDetail } = useFollowUp();

  React.useEffect(() => {
    const els = document.querySelectorAll('.scrollable-content');

    const handleWheel = (e: WheelEvent) => {
      const el = e.currentTarget as HTMLElement;
      const deltaY = e.deltaY;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const offsetHeight = el.offsetHeight;

      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;

      const canScrollDown = scrollTop + offsetHeight < scrollHeight;
      const canScrollUp = scrollTop > 0;

      if ((isScrollingDown && canScrollDown) || (isScrollingUp && canScrollUp)) {
        e.stopPropagation(); // 阻止 Swiper 接管滚动
      }
    };

    els.forEach((el) => {
      // @ts-ignore
      el.addEventListener('wheel', handleWheel, { passive: false });
    });

    return () => {
      els.forEach((el) => {
        // @ts-ignore
        el.removeEventListener('wheel', handleWheel);
      });
    };
  }, [followUpDatas]);

  return (
    <div className={classnames(styles.followUp, 'animate-followUp')}>
      <div className={styles.title}>FOLLOW UP</div>
      <div className={styles.content}>
        <Swiper
          direction={'vertical'}
          slidesPerView={'auto'}
          freeMode={true}
          modules={[FreeMode, Mousewheel, Autoplay]}
          touchStartPreventDefault={false}
          mousewheel={{
            releaseOnEdges: true,
            forceToAxis: true,
          }}
          {...(!!params?.businessType
            ? {}
            : {
                autoplay: {
                  delay: (TimerConf?.followUpScroll || 10) * 1000, // 4秒自动切换
                  disableOnInteraction: false, // 用户操作后是否停止自动播放
                  pauseOnMouseEnter: true, // 鼠标悬停时暂停
                },
              })}
          speed={1200}
          className="followUpSwiper"
        >
          <SwiperSlide>
            {followUpDatas?.map((item: any) => (
              <FollowUpItem
                item={item}
                key={item.category}
                modalRef={modalRef}
                isLoading={isLoading}
                loadingType={loadingType}
                getFollowUpDetail={getFollowUpDetail}
              />
            ))}
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default FollowUp;
