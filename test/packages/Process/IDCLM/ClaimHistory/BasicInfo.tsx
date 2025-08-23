import React, { PureComponent } from 'react';
import moment from 'moment';
import HeaderInfo from 'claim/components/HeaderInfo';
import { formatMessageApi } from '@/utils/dictFormatMessage';

class BasicInfo extends PureComponent {
  render() {
    const { caseNo, caseCategory, claimProcessData } = this.props;

    const list = [
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
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
        }),
        value: formatMessageApi({ Label_BPM_CaseCategory: caseCategory }),
      },
      {
        title: formatMessageApi({
          Label_COM_General: 'BusinessNo',
        }),
        value: claimProcessData?.inquiryClaimNo,
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
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
        }),
        value: formatMessageApi({
          SubmissionChannel: claimProcessData?.submissionChannel,
        }),
      },
    ];

    return <HeaderInfo list={list} processInstanceId={caseNo} caseCategory={caseCategory} />;
  }
}

export default BasicInfo;
