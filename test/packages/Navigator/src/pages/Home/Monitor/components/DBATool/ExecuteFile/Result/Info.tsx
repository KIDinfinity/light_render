import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as completedIcon } from 'bpm/assets/process-completed.svg';
import { ReactComponent as errorIcon } from 'bpm/assets/process-cancelled.svg';
// eslint-disable-next-line no-shadow
enum Type {
  'ERROR' = 'ERROR',
  'SQL' = 'SQL',
  'EffectedRows' = 'Effected Rows',
  'Time' = 'Time',
}

const Message = ({ type, content }: { type: string; content: string | number }) => {
  return (
    <div className={styles.message}>
      <div
        className={classnames({
          [styles.type]: true,
          [styles.error]: type === Type.ERROR,
        })}
      >
        【 {type} 】 :
      </div>
      <div
        className={classnames({
          [styles.content]: true,
          [styles.error]: type === Type.ERROR,
          [styles.sql]: type === Type.SQL,
          [styles.effect]: type === Type.EffectedRows,
          [styles.time]: type === Type.Time,
        })}
      >
        {content}
      </div>
    </div>
  );
};

const Inprogress = ({
  type,
  status,
  fileName,
  failMessage,
}: {
  type: string;
  status: string;
  fileName: string;
  failMessage: string;
}) => {
  return (
    <div>
      <div className={styles.inprogressBox}>
        <div
          className={classnames({
            [styles.circle]: true,
            [styles.inprogress]: status === 'inprogress',
            [styles.success]: status === 'success',
            [styles.fail]: status === 'fail',
          })}
        />
        {status === 'success' && <Icon className={styles.completed} component={completedIcon} />}
        {status === 'fail' && <Icon className={styles.error} component={errorIcon} />}
        {type}
        {status === 'inprogress' && <span className={styles.loading}></span>}
        {status === 'success' && fileName && ` - ${fileName}`}
      </div>
      {status === 'fail' && formatMessageApi({ Label_COM_WarningMessage: failMessage })}
    </div>
  );
};

const Info = ({ execList }: any) => (
  <div className={styles.infoBox}>
    {execList?.map(
      (
        { sql, effectedRows, millis, success, message, type, status, fileName, failMessage }: any,
        idx: number
      ) => (
        <div
          key={`${String(idx)}`}
          className={classnames({ [styles.infoItem]: !type, [styles.mb12]: type })}
        >
          {type && (
            <Inprogress type={type} status={status} fileName={fileName} failMessage={failMessage} />
          )}
          {!type && (
            <>
              {!success && <Message type={Type.ERROR} content={message} />}
              <Message type={Type.SQL} content={sql} />
              <Message type={Type.EffectedRows} content={effectedRows || 0} />
              <Message type={Type.Time} content={`${millis || 0} ms`} />
            </>
          )}
        </div>
      )
    )}
  </div>
);

export default Info;
