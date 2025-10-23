import React from 'react';
import styles from './index.less';
import classnames from 'classnames';

export default ({ children, title, className }: any) => {
  return (
    <div className={classnames(styles.wrap, className)}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};
