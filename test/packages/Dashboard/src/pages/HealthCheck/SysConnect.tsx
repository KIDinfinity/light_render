import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
// @ts-ignore
import { Icon, Menu, Dropdown } from 'antd';
import { ReactComponent as connectionIcon } from '@/assets/connection.svg';
import { ReactComponent as disconnectedIcon } from '@/assets/disconnected-white.svg';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Autoplay } from 'swiper';
import { upperCase } from 'lodash';
import classnames from 'classnames';
import { useParams } from 'umi';
import { delay } from '../utils';
import useTimer from '../useTimer';
import { TimerConf } from '../useQueryData';
import styles from '../index.less';
import { DisconnectedChart, DefaultRegionChart, InquiredChartModal } from './BussinessChartLine';

const SysConnect = ({ sysConnectDatas = {}, integrationExecutionTimeDatas }: any) => {
  const params = useParams();
  const { connectDatas = [], groupDatas = {} } = sysConnectDatas;
  const [region, setRegion] = useState(connectDatas?.[0]?.region);
  const regionRef = useRef(region);
  const [showInquiredModal, setShowInquiredModal] = useState(false);
  const isDisconnected = region === 'Disconnected';
  const { groupDatas: groupDatasByIntegrationTime } = integrationExecutionTimeDatas;

  useEffect(() => {
    setRegion(connectDatas?.[0]?.region);
  }, [connectDatas]);

  useEffect(() => {
    regionRef.current = region;
  }, [region]);

  const activeDatas = useMemo(() => {
    return groupDatas?.[region]?.datas;
  }, [region, groupDatas]);
  const activeDatasByIntegrationTime = useMemo(() => {
    return groupDatasByIntegrationTime?.[region] || [];
  }, [region, groupDatas]);

  const autoSwichRegion = useCallback(async () => {
    if (!connectDatas?.length) return;
    const fields = connectDatas?.map((item: any) => item?.region);
    const currentIndex = fields.indexOf(regionRef.current);
    const nextIndex = (currentIndex + 1) % fields.length;
    const nextRegion = fields[nextIndex];

    const categoryItem = document.getElementsByClassName('animate-sysConnectItem');
    Array.from(categoryItem).forEach((el) => {
      el.classList.add('hide-sysConnectItem');
    });
    await delay(600);
    setRegion(nextRegion);
  }, []);

  // 定时更新region;
  const { startTimer, clearTimer }: any = useTimer(autoSwichRegion, {
    frequency: TimerConf?.sysConnectRegionChange, // x秒切换一次
    base: 'sec',
    off: true, // 关闭挂载定时，需要数据显示后再手动开启
  });

  useEffect(() => {
    if (!!params?.businessType) return;
    startTimer();
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimer();
    };
  }, []);

  const onMenuChange = ({ key }: any) => {
    if (key === region) {
      return;
    }
    setRegion(key);
  };

  const menu = (
    <Menu onClick={onMenuChange}>
      {connectDatas?.map((item: any) => (
        <Menu.Item
          key={item?.region}
          className={classnames({ [styles.selected]: item?.region === region })}
        >
          {item?.region}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={classnames(styles.sysConnect, 'animate-sysConnect')}>
      <div className={styles.header}>
        <div className={styles.title}>SYSTEM CONNECT STATUS</div>
        <div className={styles.region}>
          <Dropdown
            overlay={menu}
            trigger={['click']}
            getPopupContainer={(triggerNode: any) => triggerNode.parentNode as HTMLElement}
          >
            <div className={styles.regionTitle}>
              {region} <Icon type="down" className={styles.icon} />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className={styles.content}>
        {/** // @ts-ignore */}
        <Swiper
          key={region}
          direction={'vertical'}
          slidesPerView={'auto'}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel, Autoplay]}
          {...(!!params?.businessType
            ? {}
            : {
                autoplay: {
                  delay: 3 * 1000, // 4秒自动切换
                  disableOnInteraction: false, // 用户操作后是否停止自动播放
                  pauseOnMouseEnter: true, // 鼠标悬停时暂停
                },
              })}
          speed={1200}
          className="sysConnectSwiper"
        >
          <SwiperSlide>
            {activeDatas?.map((el: any) => (
              <div
                className={classnames(styles.connectItem, 'animate-sysConnectItem')}
                key={el?.system_code}
                data-status={el?.status}
              >
                <div className={styles.header}>
                  <Icon
                    component={el?.status === 'S' ? connectionIcon : disconnectedIcon}
                    className={styles.itemIcon}
                  />
                  <div className={styles.systemCode}>{upperCase(el?.system_code) || '--'}</div>
                </div>
                <div className={styles.status}>
                  {el?.status === 'S' ? 'Normal Connect' : 'Disconnect'}{' '}
                  {isDisconnected && (
                    <span className={styles.statusRegion}>( {`${el?.region}`} )</span>
                  )}
                </div>
                <div className={styles.requestTime}>
                  Last Try:{' '}
                  {el?.request_time ? moment(el?.request_time).format('YYYY/MM/DD hh:mm:ss') : '--'}
                </div>
              </div>
            ))}
          </SwiperSlide>
        </Swiper>
        <Swiper
          key={`${region}-chart`}
          direction={'vertical'}
          slidesPerView={'auto'}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel, Autoplay]}
          {...(!!params?.businessType
            ? {}
            : {
                autoplay: {
                  delay: 3 * 1000, // 4秒自动切换
                  disableOnInteraction: false, // 用户操作后是否停止自动播放
                  pauseOnMouseEnter: true, // 鼠标悬停时暂停
                },
              })}
          speed={1200}
          className={isDisconnected ? 'sysConnectSwiperChartDiscon' : 'sysConnectSwiper'}
        >
          <SwiperSlide>
            {activeDatasByIntegrationTime.map((i) => {
              if (isDisconnected) {
                return (
                  <DisconnectedChart
                    data={i}
                    showInquiredModal={() => {
                      setShowInquiredModal(true);
                    }}
                  />
                );
              }
              return (
                <DefaultRegionChart
                  data={i}
                  showInquiredModal={() => {
                    setShowInquiredModal(true);
                  }}
                />
              );
            })}
          </SwiperSlide>
        </Swiper>
      </div>
      <InquiredChartModal visible={showInquiredModal} setVisible={setShowInquiredModal} />
    </div>
  );
};

export default SysConnect;
