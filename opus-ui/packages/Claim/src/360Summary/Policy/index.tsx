import React from 'react';

import Policy from './PolicySection';
import styles from './index.less';

export default ({ policyInfoList, businessCode }: any) => {
  return (
    <div className={styles.policy}>
      <Policy policyInfoList={policyInfoList} businessCode={businessCode} />
    </div>
  );
};
