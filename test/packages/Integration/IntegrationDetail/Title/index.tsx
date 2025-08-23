import React from 'react';
import styles from './index.less';
import CallStatusIcon from 'integration/CallStatusIcon';
import type CallStatus from 'integration/Enum/CallStatus';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import timeUtils from '@/utils/time';

interface IProps {
  title: string;
  callStatus: CallStatus;
  nextRetryTime: string;
}

export default ({ title, callStatus, nextRetryTime }: IProps) => {
  return (
    <div className={styles.container}>
      <CallStatusIcon callStatus={callStatus} />
      <h2 className={styles.title}>
        {formatMessageApi({
          Dropdown_COM_IntegrationCode: title,
        })}
      </h2>
      {nextRetryTime ? (
        <div className={styles.headBlock}>
          <span>
            {'('}
            {`${formatMessageApi({ Label_COM_General: 'NextRetry' })}: ${timeUtils.formatDateTime(
              nextRetryTime
            )}`}
            {')'}
          </span>
        </div>
      ) : null}
    </div>
  );
};
