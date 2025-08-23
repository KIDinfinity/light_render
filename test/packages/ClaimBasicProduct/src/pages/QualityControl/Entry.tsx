import React from 'react';
import moment from 'moment';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import { getIsMenuCreateCase } from '@/utils/bpm/template';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import MenuCreateClaimNoEdit from '@/components/Claim/MenuCreateClaimNoEdit';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import actionConfig from './actionConfig';
import Claim from './index';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';

function Entry({ taskDetail, businessData }: any) {
  bpm.setActionConfig(actionConfig);
  const submissionDate = businessData?.submissionDate;
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
              renderValue={(value: any) => formatMessageApi({ CaseCategory: value })}
            />
            {getIsMenuCreateCase(taskDetail) ? (
              <MenuCreateClaimNoEdit taskDetail={taskDetail} />
            ) : (
              <BPM.HeaderInfoItem
                key="inquiryBusinessNo"
                title={formatMessageApi({
                  Label_COM_General: 'BusinessNo',
                })}
                value={taskDetail.inquiryBusinessNo}
              />
            )}

            <BPM.HeaderInfoItem
              key="submissionDate"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
              })}
              value={submissionDate}
              renderValue={(value: any) => value && moment(value).format('L')}
            />
            <BPM.HeaderInfoItem
              key="submissionTime"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-time',
              })}
              value={submissionDate}
              renderValue={(value: any) => value && moment(value).format('LT')}
            />
            <BPM.HeaderInfoItem
              key="submissionChannel"
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
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
      <Claim taskDetail={taskDetail} businessData={businessData} />
      <EntryErrorsUpdate />
    </BPM>
  );
}

export default Entry;
