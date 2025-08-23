import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { isArray, isEmpty, flattenDeep } from 'lodash';
import Empty from '@/components/Empty';
import Chart from './Chart';
import styles from './index.less';
import { px2rem } from '@/utils/responsiveUtils';

export default ({ dashboardCode }: any) => {
  const [toolTip, setToolTip] = useState(false);
  const dispatch = useDispatch();
  const { chartType, chartData, ...res } =
    useSelector(
      (state: any) => state.dashboardController?.chartListMap?.[dashboardCode],
      shallowEqual
    ) || {};
  const onChartClick = (ev: any) => {
    const { value, ...chartValue } = ev;
    dispatch({
      type: 'dashboardController/onChartClick',
      payload: {
        dashboardCode,
        chartValue: { ...chartValue },
      },
    });
  };

  const onMouseEnter = () => {
    if (!toolTip) {
      setToolTip(true);
    }
  };

  const onMouseLeave = () => {
    if (toolTip) {
      setToolTip(false);
    }
  };

  const onClick = () => {
    if (isArray(chartData?.data) && isEmpty(chartData?.data)) {
      onChartClick({});
    }
  };

  const isEmptData = !chartData || isEmpty(flattenDeep(chartData?.data));

  return (
    <div
      className={styles.chart}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {!isEmptData ? (
        <Chart
          {...res}
          id={dashboardCode}
          data={chartData}
          chartType={chartType}
          chartData={chartData}
          onClick={onChartClick}
          showTooltip={toolTip}
        />
      ) : (
        <Empty style={{ maxHeight: '100%', paddingBottom: px2rem(20) }} />
      )}
    </div>
  );
};
