import React from 'react';
import bpm, { OpusBPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import PremiumSettlement from './index';
import NamespaceProvider from 'basic/components/NamespaceProvider';
import { NAMESPACE } from './activity.config';
import useGetActionButtonConfig from './useGetActionButtonConfig';

export default ({ taskDetail, businessData }: any) => {
  const actionConfig = useGetActionButtonConfig();
  bpm.setActionConfig(actionConfig);
  bpm.setClaimDataSelector((state: any) => state.premiumSettlement);

  return (
    <NamespaceProvider namespace={NAMESPACE}>
      <OpusBPM>
        {/* <OpusBPM.Header />
        <OpusBPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </OpusBPM.HeaderTitle>
        <OverdueTime overdueTime={overdueTime} /> */}
        <PremiumSettlement taskDetail={taskDetail} businessData={businessData} />
        <EntryErrorsUpdate />
      </OpusBPM>
    </NamespaceProvider>
  );
};
