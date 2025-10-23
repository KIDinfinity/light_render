import React, { PureComponent } from 'react';
import moment from 'moment';
import CaseNoLink from 'opus/Pages/Process/Claim/Components/CaseNoLink';
import HeaderInfo from 'claim/components/HeaderInfo';
import { formatMessageApi } from '@/utils/dictFormatMessage';

class BasicInfo extends PureComponent {
  render() {
    const {
      caseNo = '',
      caseCategory = '',
      businessNo = '',
      submissionDate = '',
      submissionChannel = '',
      informationPerfectionDate = '',
    }: any = this.props || {};

    const list = [
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
        }),
        value: <CaseNoLink value={caseNo} hideTitle />,
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
        value: businessNo,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
        }),
        value: submissionDate ? moment(submissionDate).format('L') : null,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'DocCompletionDate',
        }),
        value: informationPerfectionDate ? moment(informationPerfectionDate).format('L') : null,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
        }),
        value: formatMessageApi({
          Dropdown_OPUS_SubmissionChannel: submissionChannel,
        }),
      },
    ];

    return <HeaderInfo list={list} processInstanceId={caseNo} caseCategory={caseCategory} />;
  }
}

export default BasicInfo;
