import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Button, Icon } from 'opus/Components/Antd';
import { Avatar } from 'opus/Components';
import { ReactComponent as SwapIcon } from 'opus/Assets/icon-swap.svg';

import styles from './index.less';

const LeaveReasonTag = ({ reason }: any) => {
  const LEAVE_REASON = {
    AnnualLeave: formatMessageApi({ Label_COM_LeaveType: 'AnnualLeave' }),
    EmergencyLeave: formatMessageApi({ Label_COM_LeaveType: 'EmergencyLeave' }),
    SickLeave: formatMessageApi({ Label_COM_LeaveType: 'SickLeave' }),
  };
  return (
    <div className={classNames(styles.reason, { [styles[reason]]: true })}>
      {LEAVE_REASON[reason]}
    </div>
  );
};

export { LeaveReasonTag };

export default ({ listData, selectedDate }: any) => {
  return (
    <div className={styles.list}>
      <div className={styles.title}>{moment(selectedDate).format('DD MMMM YYYY')}</div>
      <div className={styles.wrap}>
        {listData.map((item: any) => {
          const { id, name, leaveDayStart, leaveDayEnd, totalLeaveDays, reason } = item;

          return (
            <div className={styles.item} key={id}>
              <div className={styles.staff}>
                <div className={styles.avatar}>
                  <Avatar name={name} />
                </div>
                <div>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.id}>{id}</div>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.range}>{`${leaveDayStart} - ${leaveDayEnd}`}</div>
                <div className={styles.total}>{`${totalLeaveDays} ${formatMessageApi({
                  Label_COM_Opus: `${totalLeaveDays > 1 ? 'day.plural' : 'day.singular'}`,
                })}`}</div>
                <LeaveReasonTag reason={reason} />
              </div>
              <Button className={styles.reassign} type="ghost">
                <Icon className={styles.next} component={SwapIcon} />
                {formatMessageApi({ Label_BPM_Button: 'Reassign' })}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
