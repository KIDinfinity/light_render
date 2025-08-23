import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

export default ({ title, className, children, containerNoPadding = false,isBgc=true }: any) => {
  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.title}>
        <div className={styles.content}>{title}</div>
      </div>
      <div className={classnames({
        [styles.container]: true,
        [styles.bgc]: isBgc,
        [styles.container_noPadding]:containerNoPadding
      })}>{children}</div>
    </div>
  );
};
