import React, { useState, useLayoutEffect } from 'react';
import styles from './CommonChart.less';
import { useSelector } from 'dva';
import lodash from 'lodash';
import CommonChartBox from './CommonChartBox';
import Empty from '@/components/Empty';
import classnames from 'classnames';

export default function () {
  const [dashStyle, setDashStyle] = useState<React.CSSProperties>({});
  const chartListV2Map = useSelector((state: any) => state.dashboardController?.chartListV2Map);
  const dashboardVersion = useSelector((state: any) => state.dashboardController.dashboardVersion);
  const dashboardHidden = useSelector((state: any) => state.navigatorHomeWatching.dashboardHidden);

  const leftData = chartListV2Map?.left || [];
  const rightData = chartListV2Map?.right || [];
  const dashboardID = 'id_commonDashboard';

  useLayoutEffect(() => {
    if (dashboardHidden) return;
    const handleResize = lodash.debounce(() => {
      const dashWidth = document.getElementById(dashboardID)?.offsetWidth;
      if (dashWidth !== dashStyle?.width) {
        setDashStyle({ width: dashWidth }); // 固定初始宽度
      }
    }, 100);

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize); // 清理事件监听器
    };
  }, []);

  if (lodash.isEmpty(leftData) && lodash.isEmpty(rightData)) {
    return <div className={styles.emptyBox}>{/* <Empty className={styles.empty} /> */}</div>;
  }

  return (
    <div className={classnames(styles.dashboard)} id={dashboardID}>
      {!lodash.isEmpty(leftData) && (
        <CommonChartBox
          key="left"
          dashboardList={leftData}
          isDouble={!lodash.isEmpty(rightData)}
          dashWidth={dashStyle?.width}
        />
      )}
      {!lodash.isEmpty(rightData) && (
        <CommonChartBox
          key="right"
          dashboardList={rightData}
          isDouble={!lodash.isEmpty(leftData)}
          dashWidth={dashStyle?.width}
        />
      )}
    </div>
  );
}
