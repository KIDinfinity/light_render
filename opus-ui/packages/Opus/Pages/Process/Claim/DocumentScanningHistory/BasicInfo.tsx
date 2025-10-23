import React from 'react';
import moment from 'moment';
import HeaderInfo from 'claim/components/HeaderInfo';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const BasicInfo = ({
  caseNo,
  caseCategory,
  inquiryBusinessNo,
  submissionDate,
  submissionChannel,
}: any) => {
  const list = [
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
      }),
      value: caseNo,
      popup: true,
    },
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
      }),
      value: formatMessageApi({ Label_BPM_CaseCategory: caseCategory }),
    },
    {
      title: formatMessageApi({
        Label_COM_General: 'BusinessNo',
      }),
      value: inquiryBusinessNo,
    },
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'DocCompletionDate',
      }),
      value: submissionDate ? moment(submissionDate).format('L') : null,
    },
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
      }),
      value: submissionDate ? moment(submissionDate).format('L') : null,
    },
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
      }),
      value: formatMessageApi({
        Dropdown_COM_SubmissionChannel: submissionChannel,
      }),
    },
  ];

  return <HeaderInfo list={list} processInstanceId={caseNo} caseCategory={caseCategory} />;
};

export default BasicInfo;
