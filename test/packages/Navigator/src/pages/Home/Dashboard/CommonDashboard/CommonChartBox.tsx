import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './CommonChart.less';
import { Tabs, Tooltip, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import ChartCardCommon from '../ChartCardCommon';
import infoIcon from '@/assets/public/info-icon.png';
import chartBoxIconNews from 'navigator/assets/chart-box-bg-news.png';
import chartBoxIconNewsShort from 'navigator/assets/chart-box-bg-news-short.png';
import { ReactComponent as upSvg } from 'navigator/assets/up-icon.svg';
import { ReactComponent as downSvg } from 'navigator/assets/down-icon.svg';
import classnames from 'classnames';
import { getRootFontSize, getResponsivePx } from '@/utils/responsiveUtils';
const { TabPane } = Tabs;

const CommonChartBox = ({
  dashboardList = [],
  isDouble,
  dashWidth,
}: {
  dashboardList: any[];
  isDouble?: boolean;
  dashWidth?: number;
}) => {
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(1);
  const leftBtnRef = useRef<any>(null);
  const dashboardVersion = useSelector((state: any) => state.dashboardController.dashboardVersion);

  const chartListMap = useSelector((state: any) => state.dashboardController?.chartListMap);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectTab, setSelectTab] = useState('0');

  const maxVisibleItems = 4; // 每次最多显示的条目数

  const [list, setList] = useState(() => {
    // 初始计算 list
    const newList = lodash.map(dashboardList, (value: any, idx: number) => ({
      idx,
      value,
    }));

    if (newList.length <= maxVisibleItems) {
      return newList;
    }

    return newList.slice(0, maxVisibleItems);
  });

  const updateList = (newActiveIndex: number) => {
    const newList = lodash.map(dashboardList, (value: any, idx: number) => ({
      idx,
      value,
    }));

    if (newList.length <= maxVisibleItems) {
      setList(newList);
      return;
    }

    if (newList.length - newActiveIndex < maxVisibleItems) {
      setList(newList.slice(-maxVisibleItems));
      return;
    }

    setList(newList.slice(newActiveIndex, newActiveIndex + maxVisibleItems));
  };

  const showConfigs = useMemo(() => {
    return {
      showConsult: lodash.size(dashboardList) > 1,
      showUp:
        lodash.size(dashboardList) > maxVisibleItems &&
        !lodash.some(list, ({ idx }: any) => idx === 0),
      showDown:
        lodash.size(dashboardList) > maxVisibleItems &&
        !lodash.some(list, ({ idx }: any) => idx === lodash.size(dashboardList) - 1),
    };
  }, [dashboardList, activeIndex]);

  const infoContent = (
    <div className={styles.infoContent}>
      {dashboardList?.map((listItem, index) => (
        <div
          key={index}
          className={classnames(styles.infoContentItem, {
            [styles.highlighted]: activeIndex === index,
          })}
        >
          {`${index + 1} - ${chartListMap[listItem[0]]?.dashboardSeriesConfigVO?.series}`}
        </div>
      ))}
    </div>
  );

  const isDisplayLeftMenu = dashboardList?.length > 1;

  useEffect(() => {
    const tabs = document
      .getElementsByClassName(
        'react-app-pages-home-dashboard-common-dashboard-common-chart-boxShadow'
      )?.[0]
      ?.querySelectorAll('.ant-tabs-tab');
    tabs.forEach((tab: any, index) => {
      const fontSize = getRootFontSize();
      if (tab) {
        tab.style.position = 'relative';
        tab.style.left = `-${((index * 6) / 14) * fontSize}px`;
        tab.style.zIndex = `${100 - index}`;
      }
    });
  }, []);

  React.useLayoutEffect(() => {
    if (isDisplayLeftMenu) {
      const boxWidth = document.getElementsByClassName('adaptive-boxShadow')?.[0]?.offsetWidth;
      if (boxWidth) {
        const dashWidthZoom = boxWidth / getResponsivePx(818);
        setZoom(Math.min(Math.max(dashWidthZoom, 0.5), 1));
      }
    }
  }, [dashWidth]);

  return !lodash.isEmpty(list) ? (
    <div
      className={classnames({
        [styles.boxShadow]: true,
        'adaptive-boxShadow': true,
      })}
    >
      <div className={classnames(styles.dashboardContainer)}>
        {isDisplayLeftMenu && (
          <div
            className={classnames(styles.leftbtn, styles.disabled_pxtorem_leftBtn, {
              [styles.minWrap]: dashboardList.length < maxVisibleItems,
              'adaptive-letfbtn': dashboardVersion === 'common',
            })}
            ref={leftBtnRef}
            style={{
              zoom: zoom,
              marginTop: getResponsivePx(45) / zoom,
            }}
          >
            <img
              src={list.length < 3 ? chartBoxIconNewsShort : chartBoxIconNews}
              alt="i"
              className={styles.chartBoxIcon}
            />
            {showConfigs.showConsult && (
              <Tooltip
                placement="rightTop"
                title={infoContent}
                overlayClassName={styles.infoTooltip}
                align={{ offset: [8, 0] }}
              >
                <div
                  key={`leftbtn_info`}
                  className={classnames(styles.btn, {
                    [styles.btnInfo]: true,
                  })}
                >
                  <img src={infoIcon} alt="i" width="100%" height="100%" />
                </div>
              </Tooltip>
            )}
            {showConfigs.showUp && (
              <Icon
                component={upSvg}
                className={styles.upSvg}
                onClick={() => {
                  const newActiveIndex = activeIndex - 1;
                  setActiveIndex(newActiveIndex);
                  updateList(newActiveIndex);
                }}
              />
            )}
            {list?.map(({ idx, value }: any) => (
              <div
                key={`leftbtn_${idx}`}
                className={classnames(styles.btn, {
                  [styles.btnActive]: idx === activeIndex,
                })}
                onClick={() => {
                  dispatch({
                    type: 'dashboardController/setOpenFilter',
                    payload: {
                      isOpen: false,
                      dashboardCode: value?.[Number(selectTab)],
                    },
                  });
                  setActiveIndex(idx);
                  setSelectTab('0');
                }}
              >
                {idx + 1}
              </div>
            ))}
            {showConfigs.showDown && (
              <Icon
                component={downSvg}
                className={styles.downSvg}
                onClick={() => {
                  const newActiveIndex = activeIndex + 1;
                  setActiveIndex(newActiveIndex);
                  updateList(newActiveIndex);
                }}
              />
            )}
          </div>
        )}
        <Tabs
          className={classnames(styles.tabList)}
          activeKey={selectTab}
          animated={false}
          onChange={(e: any) => {
            if (e === selectTab) {
              return;
            }
            dispatch({
              type: 'dashboardController/setOpenFilter',
              payload: {
                isOpen: false,
                dashboardCode: dashboardList?.[activeIndex]?.[Number(selectTab)],
              },
            });

            setSelectTab(e);
          }}
        >
          {dashboardList?.[activeIndex]?.map((item: string, index: number) => (
            <TabPane
              tab={
                <div
                  className={classnames(styles.tabFontSize, 'guidance-newDashboard-container-one')}
                >
                  <span className={styles.multipleText}>{chartListMap?.[item]?.dashboardName}</span>
                  <div title={chartListMap?.[item]?.dashboardName} className={styles.tabText}>
                    {chartListMap?.[item]?.dashboardName}
                  </div>
                </div>
              }
              key={`${index}`}
            >
              {!lodash.isEmpty(chartListMap) && dashboardList?.[activeIndex]?.[Number(index)] && (
                <ChartCardCommon
                  dashboardCode={dashboardList?.[activeIndex]?.[Number(index)]}
                  isDisplayLeftMenu={isDisplayLeftMenu}
                  zoom={zoom}
                  dashWidth={dashWidth}
                />
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  ) : null;
};

export default CommonChartBox;
