import React from 'react';
import styles from './index.less';
import PolicyLevelDecision from './components/PolicyLevelDecision';

export default () => {
  return (
    <div className={styles.head}>
      <PolicyLevelDecision />
    </div>
  );
};
