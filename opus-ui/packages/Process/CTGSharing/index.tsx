import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import actionConfig from './action.config';

const Entry = ({ taskDetail }: any) => {
  console.log('actionConfig', actionConfig);
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
    </BPM>
  );
};

export default Entry;
