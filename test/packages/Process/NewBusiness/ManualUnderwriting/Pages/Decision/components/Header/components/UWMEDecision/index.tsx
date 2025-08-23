import React from 'react';
import CustomerDecision from './components/CustomerDecision';
import PolicyLevelDecision from './components/PolicyLevelDecision';
import AggregatedDecision from './components/AggregatedDecision';
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
