import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { BPM } from 'bpm/pages/OWBEntrance';
import CaseNoLink from '@/components/Claim/CaseNoLink';
import moment from 'moment';

import { hardCode_PHNB6149 } from 'basic/utils/hardCode';

export default ({
  processInstanceId,
  caseCategory,
  inquiryBusinessNo,
  submissionDate,
  submissionChannel,
  originalSubmissionDate,
}: any) => {
  const displaySubmissionDate = hardCode_PHNB6149({
    caseCategory,
    submissionDate,
    originalSubmissionDate,
  });

  return (
    <BPM.HeaderInfoContainer>
      <BPM.HeaderInfo>
        <BPM.HeaderInfoItem
          key="processInstanceId"
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
          })}
          value={processInstanceId}
          render={(value: any) => <CaseNoLink value={value} />}
        />
        <BPM.HeaderInfoItem
          key="caseCategory"
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
          })}
          value={caseCategory}
          renderValue={(value: any) => formatMessageApi({ Label_BPM_CaseCategory: value })}
        />
        <BPM.HeaderInfoItem
          key="inquiryBusinessNo"
          title={formatMessageApi({
            Label_COM_General: 'BusinessNo',
          })}
          value={inquiryBusinessNo}
        />
        <BPM.HeaderInfoItem
          key="submissionDate"
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-date',
          })}
          value={displaySubmissionDate}
          renderValue={(value: any) => value && moment(value).format('L')}
        />
        <BPM.HeaderInfoItem
          key="submissionTime"
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-time',
          })}
          value={displaySubmissionDate}
          renderValue={(value: any) => value && moment(value).format('LT')}
        />
        <BPM.HeaderInfoItem
          key="submissionChannel"
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
          })}
          value={submissionChannel}
          renderValue={(value: any) =>
            formatMessageApi({
              Dropdown_COM_SubmissionChannel: value,
            })
          }
        />
      </BPM.HeaderInfo>
    </BPM.HeaderInfoContainer>
  );
};
