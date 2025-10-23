import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

enum EStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  TODO = 'todo',
  COMPLETED = 'completed',
  PENDING = 'pending',
}

export default ({ status, children }: any) => {
  return (
    <div
      className={classnames(styles.status, {
        [styles.success]: status === EStatus.SUCCESS,
        [styles.error]: status === EStatus.ERROR,
        [styles.todo]: status === EStatus.TODO,
        [styles.completed]: status === EStatus.COMPLETED,
        [styles.pending]: status === EStatus.PENDING,
      })}
    >
      {children}
    </div>
  );
};
