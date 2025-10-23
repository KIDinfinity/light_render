import React, { useContext } from 'react';
import styles from './index.less';
import { Icon } from 'antd';
import context from '../../../../Context/context';
import OverdueTime from 'bpm/pages/OWBEntrance/Header/OverdueTime';
import useGetOverDueTime from 'navigator/components/CaseTaskDetail/hooks/useGetOverDueTime';
import { ReactComponent as clockIcon } from 'bpm/assets/clock2.svg';

const DueDate = () => {
  const overdueTime = useGetOverDueTime();
  const { state } = useContext(context);
  const { taskDetail } = state;
  const status = taskDetail?.taskStatus;
  return (
    (status && overdueTime && (
      <div className={styles.container}>
        <div className={styles.content}>
          {overdueTime ? <Icon component={clockIcon} /> : null}
          <span className={styles.status}>{status}</span>
          <i className={styles.line} />
          <div className={styles.sla}>
            <OverdueTime overdueTime={overdueTime} />
          </div>
        </div>
      </div>
    )) ||
    null
  );
};

DueDate.displayName = 'dueDate';

export default DueDate;
