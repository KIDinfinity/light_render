import React from 'react';
import styles from './EnvoyInput.less';
import classnames from 'classnames';

export default ({ children, title, className }: any) => {
  return (
    <div className={classnames(styles.wrap, className)}>
      {title && <div className={classnames(styles.title, 'EnvoyInput-title')}>{title}</div>}
      {children}
    </div>
  );
};
