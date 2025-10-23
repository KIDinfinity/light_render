import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as CalendarIcon } from 'opus/Assets/icon-calendar.svg';
import { ReactComponent as ChevronRightIcon } from 'opus/Assets/icon-chevron-right.svg';
import { Button, Icon } from 'opus/Components/Antd';
import React from 'react';
import { history } from 'umi';
import styles from './header.less';

export default () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Icon component={CalendarIcon} style={{ fontSize: '24px' }} />
        <div className={styles.text}>{formatMessageApi({ Label_COM_Opus: 'LeaveOverview' })}</div>
      </div>
      <div className={styles.operations}>
        <Button
          className={styles.manage}
          type="primary"
          onClick={() => history.push('/opus/leaveManagement')}
        >
          {formatMessageApi({ Label_BPM_Button: 'Manage' })}
          <Icon component={ChevronRightIcon} />
        </Button>
      </div>
    </div>
  );
};
