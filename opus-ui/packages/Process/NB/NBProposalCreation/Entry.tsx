import React from 'react';
import lodash from 'lodash';
import PaperSubmission from 'process/NB/ManualUnderwriting/Proposal/PaperSubmission';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import actionConfig from './action.config';

const NBProposalCreation = ({ taskDetail, businessData }: any) => {
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
      {businessData && (
        <PaperSubmission
          taskDetail={taskDetail}
          businessData={lodash.get(businessData, 'submissionBatchDatas[0].businessData')}
        />
      )}
    </BPM>
  );
};

export default NBProposalCreation;
