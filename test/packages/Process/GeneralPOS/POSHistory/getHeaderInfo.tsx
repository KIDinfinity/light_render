import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import CaseNoLink from '@/components/Claim/CaseNoLink';

export default (claimProcessData: any) => [
  {
    key: 'caseNo',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
    }),
    value: claimProcessData?.caseNo,
    render: (value: any) => <CaseNoLink value={claimProcessData?.caseNo} />,
  },
  {
    key: 'caseCategory',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
    }),
    value: formatMessageApi({
      Label_BPM_CaseCategory: claimProcessData?.caseCategory,
    }),
  },
  {
    key: 'businessNo',
    title: formatMessageApi({
      Label_COM_General: 'BusinessNo',
    }),
    value: claimProcessData?.inquirySrvNo,
  },
  {
    key: 'submissionDate',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-date',
    }),
    value: claimProcessData?.submissionDate
      ? moment(claimProcessData?.submissionDate)?.format?.('L')
      : null,
  },
  {
    key: 'submissionTime',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-time',
    }),
    value: claimProcessData?.submissionDate
      ? moment(claimProcessData?.submissionDate).format('LT')
      : null,
  },
  {
    key: 'submissionChannel',
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
    }),
    value: formatMessageApi({
      Dropdown_COM_SubmissionChannel: claimProcessData?.submissionChannel,
    }),
  },
];
