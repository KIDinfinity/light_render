import React, { useState } from 'react';
import lodash from 'lodash';
import { useNavigate } from 'umi';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import { isEmpty, flattenDeep } from 'lodash';
import Empty from '@/components/Empty';
import Chart from './Chart';
import styles from './index.less';
import { Spin } from 'antd';
import { tranferValueSingle } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

export default ({
  dashboardCode,
  dashboardHidden,
  pageLoading,
  openFilter,
  zoom,
  dashWidth,
}: any) => {
  const [toolTip, setToolTip] = useState(false);
  const navigate = useNavigate();
  const dashboardVersion = useSelector((state: any) => state.dashboardController.dashboardVersion);
  const {
    chartType,
    chartData,
    linkedReportCode,
    searchDatas,
    redirectToReport,
    redirectReportCode,
    dashboardRedirectFieldMappingList,
    dashboardSearchFieldList,
    ...res
  } = useSelector((state: any) => state.dashboardController?.chartListMap?.[dashboardCode]) || {};
  const loading =
    useSelector(
      (state: any) => state.loading.effects['dashboardController/getCommonDashboardList']
    ) || false;

  const onChartClick = (ev: any) => {
    const { titleDicts } = chartData || {};
    if (redirectToReport) {
      // transform data to report
      let focusData = {};
      if (lodash.has(ev, 'data._origin')) {
        const reportFields = Object.entries(ev.data._origin)
          .map(([key, value]) => {
            const reportFieldCode =
              dashboardRedirectFieldMappingList?.find((item) => item.dashboardFieldName === key)
                ?.reportFieldName || key;

            const config = dashboardSearchFieldList.find(
              (field) => field.fieldName === reportFieldCode
            );
            let newValue = value;

            // 从dictName 转为dictCode
            const getDictCode = (dictName: any) => {
              if (!!titleDicts?.[key]?.[dictName]) {
                return titleDicts?.[key]?.[dictName];
              }
            };

            if (lodash.isString(value)) {
              newValue = getDictCode(value) || value;
              if (
                lodash.has(ev.data._origin, `origin_${key}_value`) &&
                !getDictCode(ev.data._origin[`origin_${key}_value`])
              ) {
                newValue = ev.data._origin[`origin_${key}_value`];
              }
            }

            if (lodash.isArray(value) && config.componentType === 'text') {
              newValue = lodash
                .chain(value || [])
                .map((el) => getDictCode(el) || el)
                .join(',')
                .value();
            }

            return {
              config,
              value: newValue,
            };
          })
          .filter((item) => item.config);

        focusData = reportFields.reduce((pre, cur) => {
          const newValue = tranferValueSingle(cur.config, cur.value);
          pre[cur.config.fieldName] = newValue;
          return pre;
        }, {});
      }

      const state = {
        linkedReportCode: redirectReportCode || linkedReportCode,
        originalLinkedReportCode: linkedReportCode,
        dashboardCode,
        searchFields: {
          ...Object.fromEntries(
            Object.entries(formUtils.queryValue(searchDatas)).filter(
              ([key, value]) => value !== null
            )
          ),
          ...focusData,
        },
        fromDashboard: true,
      };
      const stateKey = Date.now();

      try {
        sessionStorage.setItem(`venus-ui_dashboard_state_${stateKey}`, JSON.stringify(state));
      } catch (err) {
        console.error(err);
      }

      navigate(`/navigator/reportcenter?stateKey=${stateKey}`, {
        state,
      });
    }
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

  const isEmptData = !chartData || isEmpty(flattenDeep(chartData?.data));

  return (
    <div className={styles.chart} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {loading || pageLoading || openFilter ? (
        <div className={styles.loading}>
          <Spin spinning={true} size="large" />
        </div>
      ) : (
        <>
          {!isEmptData ? (
            // @ts-ignore
            <Chart
              {...res}
              dashboardHidden={dashboardHidden}
              id={dashboardCode}
              data={chartData}
              chartType={chartType}
              chartData={chartData}
              onClick={onChartClick}
              showTooltip={toolTip}
              dashboardVersion={dashboardVersion}
              zoom={zoom}
              dashWidth={dashWidth}
            />
          ) : (
            <Empty style={{ height: '100%', margin: 'auto' }} />
          )}
        </>
      )}
    </div>
  );
};
