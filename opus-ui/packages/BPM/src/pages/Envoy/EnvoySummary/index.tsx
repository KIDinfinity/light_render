import React from 'react';
import HistoryListSummary from 'bpm/pages/Envoy/HistoryList/HistoryListSummary';
import useSetSummaryEnvoy from 'bpm/pages/Envoy/hooks/useSetSummaryEnvoy';
import { FormAntCard } from 'basic/components/Form';
import styles from './index.less';
const EnvoySummary = () => {
  useSetSummaryEnvoy();
  return (
    <div className={styles.Wrap}>
      <FormAntCard style={{ paddingLeft: 4 }}>
        <HistoryListSummary />
      </FormAntCard>
    </div>
  );
};

EnvoySummary.displayName = 'EnvoySummary';

export default EnvoySummary;
