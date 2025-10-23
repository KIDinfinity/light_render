import React from 'react';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CaseNoLink from 'opus/Pages/Process/Claim/Components/CaseNoLink';
import Claim from '../ManualAssessment';
import actionConfig from './action.config';
import SubmissionDate from '../ManualAssessment/Modules/Header/SubmissionDate';
import InformationPerfectionDate from '../ManualAssessment/Modules/Header/InformationPerfectionDate';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';

function Entry({ taskDetail, businessData }: any) {
  bpm.setActionConfig(actionConfig);
  return (
    <BPM>
      <BPM.Header>
        <BPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </BPM.HeaderTitle>
        <BPM.HeaderInfoContainer>
          <BPM.HeaderInfo>
            <BPM.HeaderInfoItem
              key="caseCategory"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
              })}
              value={taskDetail.caseCategory}
              renderValue={(value: any) => formatMessageApi({ Label_BPM_CaseCategory: value })}
            />
            <BPM.HeaderInfoItem
              key="processInstanceId"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
              })}
              value={taskDetail.processInstanceId}
              render={(value: any) => <CaseNoLink value={value} />}
            />
            <BPM.HeaderInfoItem
              key="submissionDate"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
              })}
              render={() => <SubmissionDate />}
            />
            <BPM.HeaderInfoItem
              key="submissionChannel"
              title={formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-data-capture.label.submission-channel',
              })}
              value={taskDetail.submissionChannel}
              renderValue={(value: any) =>
                formatMessageApi({
                  Dropdown_OPUS_SubmissionChannel: value,
                })
              }
            />
            <BPM.HeaderInfoItem
              key="informationPerfectionDate"
              title={formatMessageApi({
                Label_BIZ_Claim: 'DocCompletionDate',
              })}
              render={() => <InformationPerfectionDate />}
            />
          </BPM.HeaderInfo>
        </BPM.HeaderInfoContainer>
      </BPM.Header>
      <Claim taskDetail={taskDetail} businessData={businessData} />
      <EntryErrorsUpdate />
    </BPM>
  );
}

export default Entry;
