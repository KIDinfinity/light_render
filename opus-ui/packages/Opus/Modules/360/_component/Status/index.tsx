import React from 'react';
import classnames from 'classnames';
import styles from './index.less'
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
interface IProps {
  status: string;
  type?: string;
  typeCode?: string;
}

export default ({ status, type = '', typeCode = '' }: IProps) => {
  const statusClass = 'S' + status;
  const typeStatus = styles[statusClass] || styles[type]
  if(!status)
    return null
  return (
    <div className={classnames(styles.status, typeStatus)}>
      {typeCode? formatMessageApi({ [typeCode]: status }) : status}
    </div>
  )
}
