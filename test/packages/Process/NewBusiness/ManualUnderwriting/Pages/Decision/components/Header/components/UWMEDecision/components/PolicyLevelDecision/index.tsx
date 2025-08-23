import React, { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const PolicyLevelDecision = ({ policyDecision }: any) => {
  const decisionUwCode = useMemo(() => {
    return lodash.get(policyDecision, 'decisionUwCode') || '-';
  }, [policyDecision]);
  return (
    <div className={styles.container}>
      <div className={styles.con}>
        <div>
          {formatMessageApi({
            Label_BIZ_Policy: 'PolicyLevelDecision',
          })}
        </div>
        <div className={styles.decisionUwCode}>
          {formatMessageApi({
            Dropdown_UW_PolicyDecision: decisionUwCode,
          })}
        </div>
      </div>
    </div>
  );
};

export default PolicyLevelDecision;
