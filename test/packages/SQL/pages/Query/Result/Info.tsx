import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

// eslint-disable-next-line no-shadow
enum Type {
  "ERROR" = "ERROR",
  "SQL" = "SQL",
  "EffectedRows" = "Effected Rows",
  "Time" = "Time"
}

const Message = ({ type, content }: { type: string, content: string | number }) => {
  return (
    <div className={styles.message}>
      <div className={classnames({
        [styles.type]: true,
        [styles.error]: type === Type.ERROR,
      })}>
        【 {type} 】 :
      </div>
      <div className={classnames({
        [styles.content]: true,
        [styles.error]: type === Type.ERROR,
        [styles.sql]: type === Type.SQL,
        [styles.effect]: type === Type.EffectedRows,
        [styles.time]: type === Type.Time,
      })}>
        {content}
      </div>
    </div>
  )
}

const Info = ({ execList }: any) => (
  <div className={styles.infoBox}>
    {execList?.map(({ sql, effectedRows, millis, success, message }: any, idx: number) => (
      <div key={`${String(idx)}`} className={styles.infoItem}>
        {!success && (
          <Message type={Type.ERROR} content={message} />
        )}
        <Message type={Type.SQL} content={sql} />
        <Message type={Type.EffectedRows} content={effectedRows || 0} />
        <Message type={Type.Time} content={`${millis || 0} ms`} />
      </div>
    ))}
  </div>
);


export default Info;
