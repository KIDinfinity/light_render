import React from 'react';
import Coverage from './Coverage';
import Policy from './Policy';
import ClaimHistory from './ClaimHistory';
import PosHistory from './PosHistory';
import useGetSummaryC360 from 'summary/hooks/useGetSummaryC360';
import styles from './index.less';
import ReferenceModelProvider from 'claim/components/ReferenceModelProvider';
import { ReferenceModel } from 'claim/pages/360/enum';

const C360 = ({ clientId }: any) => {
  const {
    policyInfoList,
    coverageList,
    businessCode,
    claimHistoryList,
    posHistoryList,
  } = useGetSummaryC360({ clientId });

  return (
    <div className={styles.wrap}>
      <ReferenceModelProvider referenceModel={ReferenceModel.SummaryPage}>
        <Coverage policyInfoList={policyInfoList} coverageList={coverageList} clientId={clientId} />
        <Policy policyInfoList={policyInfoList} businessCode={businessCode} />
        <ClaimHistory claimHistoryList={claimHistoryList} />
        <PosHistory posHistoryList={posHistoryList} />
      </ReferenceModelProvider>
    </div>
  );
};

C360.displayName = 'c360';

export default C360;
