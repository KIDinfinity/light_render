import React from 'react';
import ChartComponent from '../../ChartComponent';
import styles from './BussinessChartLine.less';
import { Icon } from '@ctc/antd';
import classNames from 'classnames';
import { upperCase } from 'lodash';
import { ReactComponent as disconnectedIcon } from '@/assets/disconnected-white.svg';

export default function DisconnectedChart({ data, showInquiredModal }) {
  return (
    <div className={styles.DisconnectedChart}>
      <div className={classNames(styles.disconnectedLabelBox, 'animate-sysConnectItem')}>
        <div className={styles.header}>
          <Icon component={disconnectedIcon} className={styles.itemIcon} />
          <div className={styles.systemCode}>{upperCase(data.integration_code) || '--'}</div>
        </div>
        <div className={styles.status}>
          execution Time {'>'}30s{' '}
          <span className={styles.statusRegion}>( {`${data.originRegion}`} )</span>
        </div>
        <div className={styles.requestTime}>{`${data.count} Calls`}</div>
      </div>
      <div className={classNames(styles.disconnectedChart)}>
        <ChartComponent
          chartType="line_chart"
          chartData={{ data: data.items || [] }}
          configWidth={486}
          configHeight={106}
          onClick={showInquiredModal}
        />
      </div>
    </div>
  );
}
