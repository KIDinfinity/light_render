import React from 'react';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import Claim from './index';
import actionConfig from './actionConfig';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';

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
          </BPM.HeaderInfo>
        </BPM.HeaderInfoContainer>
      </BPM.Header>
      <Claim taskDetail={taskDetail} businessData={businessData} />
      <EntryErrorsUpdate />
    </BPM>
  );
};
