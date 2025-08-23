import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Status } from 'configuration/constant';
import styles from './index.less';

const formatDate = (date: any) => moment(date).format('MMMDD');

const formatYearDate = (date: any) => moment(date).format('YYYY MMMDD');

const getTitle = ({ item, effectDate, expiryDate, expiryStr }: any) => {
  const {
    isOverYearStart,
    isOverDate,
    isOverYearEnd,
    overYearStartDate,
    overYearEndDate,
    isOneMore,
  } = item || {};
  const effect = isOverYearStart ? formatYearDate(overYearStartDate) : effectDate;
  const expiry =
    isOverYearEnd && !isOverDate && isOneMore ? formatYearDate(overYearEndDate) : expiryStr;

  return `${effect}     ${expiry}`;
};

const getDateElement = ({ item, expiryStr, effectDate }: any) => {
  const { isOneMore, isOverDate, isOverYearStart, isOverYearEnd, isLastDate } = item || {};
  // 单条
  if (!isOneMore) {
    return (
      <>
        <div className={styles.start}>{effectDate}</div>
        <div className={styles.end}>{expiryStr}</div>
      </>
    );
  }

  return (
    <>
      <div className={styles.start}>{!isOverYearStart && effectDate}</div>
      <div className={styles.end}>
        {(!isOverYearEnd && isLastDate) || isOverYearStart || isOverDate ? expiryStr : ''}
      </div>
    </>
  );
};

function TimeLineItem({ item, handleVersionClick, isAudit, isEditable }: any) {
  const {
    expectEffectiveDate,
    expectExpiryDate,
    isOverDate,
    status,
    isLastDate,
    width,
    isOneMore,
  } = item || {};
  const effectDate = formatDate(expectEffectiveDate);
  const expiryDate = formatDate(expectExpiryDate);
  const expiryStr = isOverDate || !isOneMore ? '+' : expiryDate;

  return (
    <div
      className={classnames({
        [styles.timeLineItem]: true,
        [styles.isActive]: !isAudit && status === Status.Active,
        [styles.isAudit]: isAudit && status === Status.Active,
        [styles.isLastDate]: isLastDate,
        [styles.isEditable]: isEditable,
      })}
      style={{ width }}
      title={getTitle({ item, effectDate, expiryDate, expiryStr })}
      onClick={() => handleVersionClick(item)}
    >
      {getDateElement({ item, expiryStr, effectDate })}
    </div>
  );
}

export default TimeLineItem;
