import React from 'react';
import styles from './index.less';
import { taskStatus } from 'bpm/enum';

import { Icon } from 'antd';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as completedIcon } from '../assets/integrationCompleted.svg';
import { ReactComponent as cancelledIcon } from 'bpm/assets/process-cancelled.svg';
import { ReactComponent as pendingIcon } from 'bpm/assets/process-pending.svg';
import { ReactComponent as rejectedIcon } from 'bpm/assets/process-rejected.svg';
import { ReactComponent as inProcess } from 'bpm/assets/process-inProgress.svg';
import { ReactComponent as skip } from 'bpm/assets/process-skip.svg';

export default ({ panelItem, needHighlightTodoItem, order }) => {
  let currentIcon;
  switch (panelItem.taskStatus) {
    case taskStatus.completed:
      currentIcon = <Icon component={completedIcon} />;
      break;
    case taskStatus.pending:
      currentIcon = <Icon className={styles.pending} component={pendingIcon} />;
      break;
    case taskStatus.todo:
      currentIcon = <Icon className={styles.inProcess} component={inProcess} />;
      break;
    case taskStatus.cancelled:
      currentIcon = <Icon className={styles.cancelled} component={cancelledIcon} />;
      break;
    case taskStatus.rejected:
      currentIcon = <Icon className={styles.rejected} component={rejectedIcon} />;
      break;
    case taskStatus.skip:
      currentIcon = <Icon className={styles.skip} component={skip} />;
      break;
    default:
      currentIcon = <Icon className={styles.inProcess} component={inProcess} />;
      break;
  }

  return (
    <div
      className={classnames(styles.panelHeader, {
        [styles.todoTextColor]: panelItem.taskStatus === 'todo' && !needHighlightTodoItem,
      })}
    >
      <span className={styles.panelHeaderIcon}>{currentIcon}</span>
      <span>{formatMessageApi({ activity: panelItem?.activityKey })}</span>
    </div>
  );
};
