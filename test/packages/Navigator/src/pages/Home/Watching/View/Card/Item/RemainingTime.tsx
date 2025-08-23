import React from 'react';
import { Progress } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getRemainingTime } from '@/utils/utils';
import classnames from 'classnames';
import styles from './RemainingTime.less';

const COLOR_RED = '#dc6374';
const COLOR_ORANGE = '#ffd44f';
const COLOR_GREEN = '#3ede88';

const ClockNumber = ({ number, type }: any) => (
  <div className={styles.number}>
    <div className={styles.numberContent}>{number}</div>
    <div className={styles.numberTips}>
      {formatMessageApi({ Label_BIZ_Claim: `time.format.${type}` })}
    </div>
  </div>
);

const Clock = ({ hours, minutes, seconds, isUrgent }: any) => {
  const minOrSecExp =
    minutes > 0 ? (
      <ClockNumber number={minutes} type="minute" />
    ) : (
      <ClockNumber number={seconds} type="second" />
    );

  const innerComponentExp =
    hours > 0 ? (
      <React.Fragment>
        <ClockNumber number={hours} type="hour" />
        <div className={styles.colon}>:</div>
        <ClockNumber number={minutes} type="minute" />
      </React.Fragment>
    ) : (
      minOrSecExp
    );

  return (
    <div
      className={classnames(styles.timer, {
        [styles.isUrgent]: isUrgent,
      })}
    >
      {innerComponentExp}
    </div>
  );
};

export default (
  { casePercentage, taskPercentage, caseRemainingTime, taskRemainingTime, isUrgent }: any,
  size = 'normal'
) => {
  const remain = Math.max(0, Math.min(taskRemainingTime, caseRemainingTime));
  const percent = Math.max(0, Math.min(casePercentage, taskPercentage));
  // hour, min, sec; progressStrokeColor
  const { remainHours, remainMins, remainSeconds } = getRemainingTime(remain);
  const ORANGE_OR_GREEN = remainHours <= 0 && remainMins < 5 ? COLOR_ORANGE : COLOR_GREEN;
  const progressStrokeColor = remain <= 0 ? COLOR_RED : ORANGE_OR_GREEN;

  return (
    <div className={size === 'small' ? styles['remainingTime-small'] : styles.remainingTime}>
      <Progress
        className={classnames('ant-progress-no-back', styles.progress)}
        type="circle"
        showInfo={false}
        strokeWidth={4}
        strokeColor={progressStrokeColor}
        percent={percent}
      />
      <div className={styles.remainingInfo}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.remaining-time',
        })}
        <Clock
          hours={remainHours}
          minutes={remainMins}
          seconds={remainSeconds}
          isUrgent={isUrgent}
        />
      </div>
    </div>
  );
};
