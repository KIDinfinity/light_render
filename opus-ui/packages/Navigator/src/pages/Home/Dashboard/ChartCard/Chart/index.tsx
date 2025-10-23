import React, { useState } from 'react';
import { history } from 'umi';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import { isArray, isEmpty, flattenDeep } from 'lodash';
import Empty from '@/components/Empty';
import Chart from './Chart';
import styles from './index.less';

export default ({ dashboardCode }: any) => {
  const [toolTip, setToolTip] = useState(false);

  const { chartType, chartData, linkedReportCode, searchDatas, ...res } = useSelector(
    (state: any) => state.dashboardController?.chartListMap?.[dashboardCode]
  );

  const onChartClick = (ev: any) => {
    const { value, ...chartValue } = ev;

    history.push({
      pathname: '/navigator/reportcenter',
      query: {
        linkedReportCode,
        searchFields: {
          ...formUtils.queryValue(searchDatas),
          ...chartValue,
        },
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
        <Empty style={{ maxHeight: '100%', paddingBottom: '20px' }} />
      )}
    </div>
  );
};
