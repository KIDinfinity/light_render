import React, { useCallback } from 'react';
import ChartComponent from './ChartComponent';
import classnames from 'classnames';
import { defaultChartList, BusinessType } from './config';
import { toUpper } from 'lodash';
import type { ChartCardProps } from './type.d';
import styles from './index.less';

const ChartCard: React.FC<ChartCardProps> = ({
  chart: { region, chartDatas },
  businessType,
}: ChartCardProps) => {
  const onClick = useCallback(() => {}, []);
  const ManualTitle = {
    [BusinessType.NB]: (
      <>
        Manual
        <br />
        Underwriting
      </>
    ),
    [BusinessType.CLAIM]: (
      <>
        Manual
        <br />
        Assessment
      </>
    ),
    [BusinessType.POS]: 'Pos Decision',
  }[businessType];
  return (
    <div>
      <div className={styles.chartHeader}>
        <div className={styles.chartTitle}>
          {toUpper(region)}
          <div className={styles.chartTitleExtra}>{toUpper(region)}</div>
        </div>
        <div />
      </div>
      <div className={styles.chartBox}>
        {(defaultChartList as any[]).map((config: any, idx: number) => {
          const isPieChart = config.chartType === 'pie_chart';
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${config?.title}`}
              className={classnames({
                [styles.chartCard]: true,
                [styles.pie_chart]: isPieChart,
                [styles.bar_chart]: config.chartType === 'bar_chart',
                [styles.pos]: businessType === BusinessType.POS,
              })}
            >
              <div className={styles.chartScroll}>
                <div className={styles.chartContent}>
                  {isPieChart ? <div className={styles.chartSubTitle}>{ManualTitle}</div> : null}
                  {isPieChart ? <div className={styles.delivery} /> : null}
                  <ChartComponent
                    {...config}
                    dashboardCode={`${config?.title}`}
                    chartData={chartDatas?.[idx]}
                    data={chartDatas?.[idx]}
                    onClick={onClick}
                    businessType={businessType}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ChartCard);
