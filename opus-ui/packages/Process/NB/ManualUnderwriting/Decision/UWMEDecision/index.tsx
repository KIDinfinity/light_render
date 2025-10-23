import React from 'react';
import CustomerDecision from './CustomerDecision';
import PolicyLevelDecision from './PolicyLevelDecision';
import AggregatedDecision from './AggregatedDecision';
import styles from './index.less';

const UWMEDecision = ({ policyDecision }: any) => {
  return (
    <div className={styles.decisionContainer}>
      <CustomerDecision policyDecision={policyDecision} />
      <PolicyLevelDecision policyDecision={policyDecision} />
      <AggregatedDecision policyDecision={policyDecision} />
    </div>
  );
};

export default UWMEDecision;
