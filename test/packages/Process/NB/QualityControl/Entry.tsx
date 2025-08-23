import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import actionConfig from './action.config';
import CustomerIdentification from '../CustomerIdentification';

export default ({ taskDetail, businessData }: any) => {
  bpm.setActionConfig(actionConfig);

  return (
    <BPM>
      <BPM.Header>
        <BPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </BPM.HeaderTitle>
      </BPM.Header>
      <CustomerIdentification taskDetail={taskDetail} businessData={businessData} businessNo={taskDetail?.businessNo} />
      <EntryErrorsUpdate />
    </BPM>
  );
};
