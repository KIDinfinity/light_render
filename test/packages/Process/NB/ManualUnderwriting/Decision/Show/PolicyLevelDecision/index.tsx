import React from 'react';
import lodash from 'lodash';
import Policy from 'process/NB/ManualUnderwriting/Decision/Policy';
import useGetPolicyDecision from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyDecision';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const PolicyLevelDecision = () => {
  const policyDecision = useGetPolicyDecision();
  return (
    <div className={styles.decision}>
      <Policy decisionCode={formUtils.queryValue(lodash.get(policyDecision, 'decisionCode'))} />
    </div>
  );
};

export default PolicyLevelDecision;
