import React from 'react';
import styles from './index.less';

const Main = ({ title }: any) => {
  return <div className={styles.titleWrap}>{title}</div>;
};

export default Main;
