import React from 'react';
import { Progress } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EReasonStatus } from 'bpm/pages/Envoy/enum';
import styles from './dateProcess.less';

export default function DateProcess(props: any) {
  const { data } = props;
  const { startTime, period, endTime, status } = lodash.pick(data, [
    'startTime',
    'period',
    'endTime',
    'status',
  ]);

  const getPassDay = (): number => {
    let passDay: number = 0;
    if (!lodash.isEmpty(startTime)) {
      const today: number = new Date(endTime).getTime() || new Date().getTime();
      const startDay: number = new Date(startTime).getTime();
      passDay = lodash.parseInt((today - startDay) / (24 * 60 * 60 * 1000), 10);
    }
    return passDay;
  };
  const getPercent = (): number => {
    let percent: number = 0;
    const passDay: number = getPassDay();
    percent = lodash.parseInt((passDay / period) * 100, 10);
    return percent;
  };

  return (
    <div className={classNames(styles.dateProcess)}>
      <div className={styles.label}>
        <span className={styles.passDay}>{`${getPassDay()}`}</span>
        <span className={styles.padLR}>/</span>
        <span className={styles.period}>{`${period}`}</span>
        {formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.pending.form.label.day' })}
      </div>
      <Progress
        showInfo={false}
        strokeWidth={4}
        strokeColor={
          status === EReasonStatus.OVERDUE
            ? '#f00'
            : {
                '0%': 'rgba(36, 167, 157, 1)',
                '100%': 'rgba(10, 111, 137, 1)',
              }
        }
        strokeLinecap="round"
        percent={getPercent()}
      />
    </div>
  );
}
