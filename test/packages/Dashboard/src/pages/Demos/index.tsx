import React, { useState, useMemo } from 'react';
// @ts-ignore
import { Switch, Icon, Popover } from 'antd';
import JSONView from 'react-json-view';
import ChartCommon from 'navigator/pages/Home/Dashboard/ChartCardCommon/Chart/Chart';
import Chart from 'navigator/pages/Home/Dashboard/ChartCard/Chart/Chart';
import { DashboardVersion } from 'navigator/pages/Home/Dashboard/Enum';
import reports from './config';
import classnames from 'classnames';
import styles from './index.less';

const Title = React.memo(({ report }: any) => (
  <>
    {report?.chartTypeTitle}
    <Popover
      content={
        <JSONView
          src={report?.chartData}
          name="chartData"
          theme="rjv-default"
          displayObjectSize={false}
          displayDataTypes={false}
          // @ts-ignore
          displayArrayKey={false}
        />
      }
      title={report?.chartTypeTitle}
    >
      <Icon type="fund" className={styles.popoverIcon} />
    </Popover>
  </>
));

const Demos = () => {
  const [isCommon, setIsCommon] = useState<boolean>(true);

  const ChartComponent = useMemo(() => (isCommon ? ChartCommon : Chart), [isCommon]);

  return (
    <div className={styles.demoContainer} key="demoContainer">
      <div className={styles.demoHeader}>
        <Switch
          defaultChecked
          checkedChildren={DashboardVersion.V2}
          unCheckedChildren={DashboardVersion.default}
          onChange={(checked: boolean) => setIsCommon(checked)}
        />
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.demoContent}>
          {reports.map((report: any, idx: number) => (
            <div
              className={styles.demoChart}
              key={report?.chartTypeTitle}
              style={
                {
                  '--chart-color': report?.chartTitleColor,
                } as React.CSSProperties
              }
            >
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <Title report={report} />
                  <div className={styles.chartTitleExtra}>
                    <Title report={report} />
                  </div>
                  <div className={styles.chartTitleAfter} />
                </div>
              </div>
              <div
                className={classnames({
                  [styles.chartScroll]: true,
                  [styles.common]: !!isCommon,
                })}
              >
                <ChartComponent
                  key={report?.chartTypeTitle}
                  {...report}
                  dashboardVersion={isCommon ? DashboardVersion.V2 : DashboardVersion.default}
                  dashboardCode={`${report?.dashboardCode}_${idx}`}
                  data={report?.chartData}
                  onClick={() => {}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demos;
