import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import useGetOverDueTime from 'navigator/components/CaseTaskDetail/hooks/useGetOverDueTime';
import OverdueTime from 'bpm/pages/OWBEntrance/Header/OverdueTime';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import actionConfig from './action.config';
import CustomerIdentification from './index';

export default ({ taskDetail, businessData }: any) => {
  bpm.setActionConfig(actionConfig);
  const overdueTime = useGetOverDueTime();

  return (
    <BPM>
      <BPM.Header>
        <BPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </BPM.HeaderTitle>
        <OverdueTime overdueTime={overdueTime} />
      </BPM.Header>
      <CustomerIdentification
        taskDetail={taskDetail}
        businessData={businessData}
        businessNo={taskDetail?.businessNo}
      />
      <EntryErrorsUpdate />
    </BPM>
  );
};
