import React from 'react';
import styles from './Link.less';

const Link = ({ children }: any) => {
  return <div className={styles.link}>{children}</div>;
};

export default Link;
