import React from 'react';
// @ts-ignore
import { Spin, Result, Button, Icon, Typography } from 'antd';
import ChartCard from './ChartCard';
import Submission from './Submission';
import useQueryData, { TimerConf } from './useQueryData';
import classnames from 'classnames';
import { tenant } from '@/components/Tenant';
import { history } from 'umi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Autoplay } from 'swiper';
import { BusinessType } from './config';
import HealthCheck from './HealthCheck';
import styles from './index.less';
import 'swiper/css';
import 'swiper/css/free-mode';
import './animation.global.less';

const { Paragraph, Text } = Typography;

const Dashboard = () => {
  const { businessType, chartDatas, submission, errorMessage, isShowLoading, isShowError } =
    useQueryData();

  if (isShowError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <Result
            status="error"
            title={!!errorMessage ? 'Failed to load dashboard' : 'Empty Dashboard'}
            subTitle="Please refresh the page to retry or contact support."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  history.push('/');
                }}
              >
                Go Home
              </Button>,
              <Button
                key="buy"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </Button>,
            ]}
          >
            {errorMessage && (
              <>
                <Paragraph style={{ textAlign: 'center' }}>
                  <Icon style={{ color: 'red', fontSize: 16 }} type="close-circle" />
                  <Text
                    strong
                    style={{
                      fontSize: 16,
                      color: '#f5222d',
                      marginLeft: 10,
                    }}
                  >
                    {errorMessage}
                  </Text>
                </Paragraph>
                <Paragraph style={{ marginTop: 10, textAlign: 'center' }}>
                  Region:{' '}
                  <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{tenant?.region()}</span>
                </Paragraph>
              </>
            )}
          </Result>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={styles.dashboardContainer}>
        {isShowLoading ? (
          <div className={styles.loading}>
            <div className={styles.loadingContent}>
              <Spin tip="Loading..." />
            </div>
          </div>
        ) : (
          <>
            {businessType === BusinessType.HEALTHCHECK ? (
              <HealthCheck chartDatas={chartDatas} />
            ) : (
              <>
                <Submission submission={submission} businessType={businessType} />
                <div className={styles.chartListContent}>
                  <Swiper
                    key={businessType}
                    direction={'vertical'}
                    slidesPerView={'auto'}
                    freeMode={true}
                    mousewheel={true}
                    modules={[FreeMode, Mousewheel, Autoplay]}
                    // TODO: 滚动是直接滚动到最底，当超过两个可视高度会有问题
                    // 但目前region不会超过12个（两页）
                    autoplay={{
                      delay: (TimerConf.autoScroll || 10) * 1000, // 4秒自动切换
                      disableOnInteraction: false, // 用户操作后是否停止自动播放
                      pauseOnMouseEnter: true, // 鼠标悬停时暂停
                    }}
                    speed={1200}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      {chartDatas?.map((chartData: any, index: number) => (
                        <div
                          className={classnames('chart-item', {
                            [styles.chartListItem]: true,
                            [styles.isHide]: chartData?.isHide,
                          })}
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                        >
                          <div className={styles.chartContent}>
                            <ChartCard chart={chartData} businessType={businessType} />
                          </div>
                        </div>
                      ))}
                    </SwiperSlide>
                  </Swiper>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
