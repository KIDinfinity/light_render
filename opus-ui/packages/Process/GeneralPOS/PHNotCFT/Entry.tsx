import React from 'react';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import SubmissionChannel from './SubmissionChannel';
import actionConfig from './actionConfig';
import Claim from './index';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';

export default ({ taskDetail, businessData }: any) => {
  bpm.setActionConfig(actionConfig);
  return (
    <BPM>
      {/**
      // @ts-ignore */}
      <BPM.Header>
        {/**
        // @ts-ignore */}
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
              key="posNo"
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
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
              })}
              render={() => {
                // @ts-ignore
                return <SubmissionChannel />;
              }}
            />
          </BPM.HeaderInfo>
        </BPM.HeaderInfoContainer>
      </BPM.Header>
      {/**
      // @ts-ignore */}
      <Claim taskDetail={taskDetail} businessData={businessData} />
      <EntryErrorsUpdate taskDetail={taskDetail} />
    </BPM>
  );
};
