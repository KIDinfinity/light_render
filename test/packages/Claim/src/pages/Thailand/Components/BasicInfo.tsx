import React, { PureComponent } from 'react';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import HeaderInfo from 'claim/components/HeaderInfo';

class BasicInfo extends PureComponent {
  render() {
    const { caseNo, claimProcessData } = this.props;

    const list = [
      {
        title: 'Case Source',
        value: formatMessageApi({ CaseSource: claimProcessData?.caseSource }),
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
        }),
        value: formatMessageApi({ Label_BPM_CaseCategory: claimProcessData?.caseCategory }),
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
        }),
        value: caseNo,
        jumpable: true,
        style: { cursor: 'pointer' },
      },
      {
        title: formatMessageApi({
          Label_COM_General: 'BusinessNo',
        }),
        value: claimProcessData?.inquiryClaimNo || '',
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-date',
        }),
        value: claimProcessData?.submissionDate
          ? moment(claimProcessData?.submissionDate).format('L')
          : null,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-time',
        }),
        value: claimProcessData?.submissionDate
          ? moment(claimProcessData?.submissionDate).format('LT')
          : null,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
        }),
        value: formatMessageApi({
          Dropdown_COM_SubmissionChannel: claimProcessData?.submissionChannel,
        }),
      },
    ];

    return <HeaderInfo list={list} />;
  }
}

export default BasicInfo;
