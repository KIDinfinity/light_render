import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import actionConfig from './action.config';
import PremiumSettlement from './index';
import NamespaceProvider from 'basic/components/NamespaceProvider';
import useGetOverDueTime from 'navigator/components/CaseTaskDetail/hooks/useGetOverDueTime';
import OverdueTime from 'bpm/pages/OWBEntrance/Header/OverdueTime';
import { NAMESPACE } from './activity.config';

export default ({ taskDetail, businessData }: any) => {
  bpm.setActionConfig(actionConfig);
  bpm.setClaimDataSelector((state: any) => state.premiumSettlement);
  const overdueTime = useGetOverDueTime();

  return (
    <NamespaceProvider namespace={NAMESPACE}>
      <BPM>
        <BPM.Header>
          <BPM.HeaderTitle>
            {formatMessageApi({
              activity: taskDetail.taskDefKey,
            })}
          </BPM.HeaderTitle>
          <OverdueTime overdueTime={overdueTime} />
        </BPM.Header>
        <PremiumSettlement taskDetail={taskDetail} businessData={businessData} />
        <EntryErrorsUpdate />
      </BPM>
    </NamespaceProvider>
  );
};
