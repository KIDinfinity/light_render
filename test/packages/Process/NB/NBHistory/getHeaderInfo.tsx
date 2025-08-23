import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import CaseNoLink from '@/components/Claim/CaseNoLink';

export default (businessData: any) => [
  {
    key: 'caseNo',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
    }),
    value: businessData?.caseNo,
    render: (value: any) => <CaseNoLink value={businessData?.caseNo} />,
  },
  {
    key: 'caseCategory',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
    }),
    value: formatMessageApi({
      Label_BPM_CaseCategory: businessData?.caseCategory,
    }),
  },
  {
    key: 'businessNo',
    title: formatMessageApi({
      Label_COM_General: 'BusinessNo',
    }),
    value: businessData?.applicationNo,
  },
  {
    key: 'submissionDate',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-date',
    }),
    value: businessData?.submissionDate
      ? moment(businessData?.submissionDate)?.format?.('L')
      : null,
  },
  {
    key: 'submissionTime',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-time',
    }),
    value: businessData?.submissionDate ? moment(businessData?.submissionDate).format('LT') : null,
  },
  {
    key: 'submissionChannel',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
    }),
    value: formatMessageApi({
      Dropdown_COM_SubmissionChannel: businessData?.submissionChannel,
    }),
  },
];
