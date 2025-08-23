import React, { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// import { getFormatMessageApi } from 'process/_hooks';

import styles from './index.less';

const CustomerDecision = ({ policyDecision }: any) => {
  const decisionLaOwCode = useMemo(() => {
    return lodash.get(policyDecision, 'decisionLaOwCode') || '-';
  }, [policyDecision]);
  // const dictName = getFormatMessageApi({
  //   Dropdown_UW_PolicyDecision: decisionLaOwCode,
  // });
  return (
    <div className={styles.container}>
      <div className={styles.con}>
        <div>
          {formatMessageApi({
            Label_BIZ_Policy: 'CustomerDecision',
          })}
        </div>
        <div className={styles.decisionLaOwCode}>
          {formatMessageApi({
            Dropdown_UW_PolicyDecision: decisionLaOwCode,
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerDecision;
