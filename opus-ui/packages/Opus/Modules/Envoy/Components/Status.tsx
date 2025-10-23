import React from 'react';
import classnames from 'classnames';
import { EReasonStatus, EMemoStatus } from 'bpm/pages/Envoy/enum';
import styles from './Status.less'
import { formatMessageApi } from '@/utils/dictFormatMessage';
/*
  DRAFT = 'Draft',
  ACTIVE = 'Active',
  WAIVED = 'Waived',
  RESOLVE = 'Resolve',
  RESOLVED = 'Resolved',
  OVERDUE = 'Overdue',
*/
/*
enum EMemoStatus {
  NOTRECEIVED = 'Not Received',
  RECEIVED = 'Received',
  WAIVED = 'Waived',
}
*/
export default ({ status }) => {
  return (
    <div className={classnames(styles.status, {
      [styles.activeStatus]: status === EReasonStatus.ACTIVE,
      [styles.waivedStatus]: [EReasonStatus.WAIVED, EReasonStatus.DRAFT, 'Inactive'].includes(status),
      [styles.receivedStatus]: [EReasonStatus.RESOLVE, EReasonStatus.RESOLVED, EMemoStatus.RECEIVED].includes(status),
      [styles.overdueStatus]: status === EReasonStatus.OVERDUE || status === 'NTU',
    })}>
      {formatMessageApi({DropDown_ENV_MemoStatus:status})}
    </div>
  )
}
