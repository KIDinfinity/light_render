import React from 'react';
import moment from 'moment';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import Claim from '../BaseProduct/index';
import actionConfig from './action.config';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import OverdueTime from 'bpm/pages/OWBEntrance/Header/OverdueTime';
import useGetOverDueTime from 'navigator/components/CaseTaskDetail/hooks/useGetOverDueTime';

function Entry({ taskDetail, businessData, buttonList }: any) {
  const overdueTime = useGetOverDueTime();
  bpm.setActionConfig(actionConfig);
  return (
    <BPM>
      <BPM.Header>
        <BPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </BPM.HeaderTitle>
        <OverdueTime overdueTime={overdueTime} />
        <BPM.HeaderInfoContainer>
          <BPM.HeaderInfo>
            <BPM.HeaderInfoItem
              key="processInstanceId"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
              })}
              value={taskDetail.processInstanceId}
              render={(value: any) => <CaseNoLink value={value} />}
            />
            <BPM.HeaderInfoItem
              key="caseCategory"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
              })}
              value={taskDetail.caseCategory}
              renderValue={(value: any) => formatMessageApi({ Label_BPM_CaseCategory: value })}
            />

            <BPM.HeaderInfoItem
              key="inquiryBusinessNo"
              title={formatMessageApi({
                Label_COM_General: 'BusinessNo',
              })}
              value={taskDetail.inquiryBusinessNo}
            />

            <BPM.HeaderInfoItem
              key="submissionDate"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
              })}
              value={taskDetail.submissionDate}
              renderValue={(value: any) => value && moment(value).format('L')}
            />
            <BPM.HeaderInfoItem
              key="submissionTime"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-time',
              })}
              value={taskDetail.submissionDate}
              renderValue={(value: any) => value && moment(value).format('LT')}
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
                  Dropdown_COM_SubmissionChannel: value,
                })
              }
            />
          </BPM.HeaderInfo>
        </BPM.HeaderInfoContainer>
      </BPM.Header>
      <Claim taskDetail={taskDetail} businessData={businessData} buttonList={buttonList} />
      <EntryErrorsUpdate />
    </BPM>
  );
}

export default Entry;
