import React from 'react';
import ChartComponent from '../../ChartComponent';
import styles from './BussinessChartLine.less';
import { Icon } from '@ctc/antd';
import classNames from 'classnames';
import { upperCase } from 'lodash';
import { ReactComponent as disconnectedIcon } from '@/assets/disconnected-white.svg';

export default function DefaultRegionChart({ data, showInquiredModal }) {
  return (
    <div
      className={classNames(styles.DefaultRegionChart, {
        [styles.above30]: data.count_above_30 > 0,
      })}
    >
      <div className={classNames(styles.disconnectedLabelBox, 'animate-sysConnectItem')}>
        <div className={styles.header}>
          <div className={styles.systemCode}>{data.integration_code || '--'}</div>
        </div>
      </div>
      <div className={classNames(styles.defaultChart)}>
        <ChartComponent
          chartType="line_chart"
          chartData={{ data: data.items || [] }}
          configWidth={243}
          configHeight={80}
          onClick={showInquiredModal}
        />
      </div>
    </div>
  );
}
