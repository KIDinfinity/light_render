import React from 'react';
import styles from './index.less';

const ExpanderContainer = ({ children, scrollable }: any) => {
  return (
    <div className={scrollable ? styles.scrollableWrap : styles.wrap}>
      <div className={styles.contentWrap}>{children}</div>
    </div>
  );
};

export default ExpanderContainer;
