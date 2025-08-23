import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import actionConfig from './action.config';
import NBDataCollector from '.';

const Entry = ({ taskDetail, businessData }: any) => {
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
      {businessData && <NBDataCollector businessData={businessData} taskDetail={taskDetail} />}
      <EntryErrorsUpdate />
    </BPM>
  );
};

export default Entry;
