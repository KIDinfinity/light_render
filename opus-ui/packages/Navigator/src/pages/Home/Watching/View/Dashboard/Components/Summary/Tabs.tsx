import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';

import Chart from './Chart';
import styles from './index.less';


const Tabs = ({ list }: any) => {
  const { datas, currentTab } = useSelector(({ navigatorHomeWatching }: any) => navigatorHomeWatching.dashboardData) || {};
  const data = useMemo(() => {
    return lodash
      .chain(lodash.keys(datas) || [])
      // 有一个key为 空字符串的businessCode，暂不展示
      .filter((key: any) => key !== currentTab && key)
      .reduce((newData: any, key: string, idx) => {
        return {
          ...newData,
          [idx]: {
            key,
            list: datas?.[key]
          }
        }
      }, {})
      .value()
  }, [datas, currentTab])

  const dispatch = useDispatch()
  return (
    <div className={styles.tabsWrap}>
      <div
        className={styles.top}
        onClick={() =>
          dispatch({
            type: 'navigatorHomeWatching/saveCurrentTab',
            payload: { currentTab: data[0]?.key }
          })
        }
      >
        <span className={styles.mark}>{data[0]?.key.charAt(0).toUpperCase()}</span>
        {data[0]?.list.map((item: any,) => (
          <div className={styles.circleWrap}>
            <Chart item={item} />
          </div>
        ))}
      </div>
      <div
        className={styles.bottom}
        onClick={() =>
          dispatch({
            type: 'navigatorHomeWatching/saveCurrentTab',
            payload: { currentTab: data[1]?.key }
          })
        }
      >
        <span className={styles.mark}>{data[1]?.key.charAt(0).toUpperCase()}</span>
        {data[1]?.list.map((item: any,) => (
          <div className={styles.circleWrap}>
            <Chart item={item} />
          </div>
        ))}</div>
    </div>
  );
}


export default Tabs
