import { formatMessageApi } from '@/utils/dictFormatMessage';

import { history } from 'umi';
import { ReactComponent as ArrowLeftIcon } from 'packages/Opus/Assets/icon-arrowLeft.svg';
import { Icon } from 'packages/Opus/Components/Antd';
import React, { useCallback, useState } from 'react';
import AddLeave from './Components/AddLeave';
import LeaveCalendar from './Components/LeaveCalendar';
import styles from './index.less';

export default () => {
  

  const [showAddLeave, setShowAddLeave] = useState(false);

  const onAddLeave = useCallback(() => {
    setShowAddLeave(true);
  }, []);

  const onAddLeaveSuccess = useCallback(() => {
    setShowAddLeave(false);
  }, []);

  const onCancelAddLeave = useCallback(() => {
    setShowAddLeave(false);
  }, []);

  return (
    <div className={styles.leaveManagement}>
      <div className={styles.title}>
        <Icon
          className={styles.back}
          component={ArrowLeftIcon}
          onClick={() => history.replace('/opus/home')}
        />
        {formatMessageApi({ Label_COM_Opus: 'ManageLeaves' })}
      </div>
      <div className={styles.content}>
        {showAddLeave && <AddLeave onCancel={onCancelAddLeave} onSuccess={onAddLeaveSuccess} />}
        <LeaveCalendar showAddLeave={showAddLeave} onAddLeave={onAddLeave} />
      </div>
    </div>
  );
};
