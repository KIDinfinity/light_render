import React, { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const AggregatedDecision = ({ policyDecision }: any) => {
  const decisionAggregatedCode = useMemo(() => {
    return lodash.get(policyDecision, 'decisionAggregatedCode') || '-';
  }, [policyDecision]);
  return (
    <div className={styles.container}>
      <div>
        {formatMessageApi({
          Label_BIZ_Policy: 'AggregatedDecision',
        })}
      </div>
      <div className={styles.decisionAggregatedCode}>
        {formatMessageApi({
          Dropdown_UW_PolicyDecision: decisionAggregatedCode,
        })}
      </div>
    </div>
  );
};

export default AggregatedDecision;
