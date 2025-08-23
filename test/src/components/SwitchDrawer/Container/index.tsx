import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

const Container = ({ children, className, mask }: any) => {
  return (
    <div className={classnames(styles.container, className, { [styles.mask]: mask })}>
      {children}
    </div>
  );
};

export default Container;
