import React, { PureComponent } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import HeaderInfo from 'claim/components/HeaderInfo';

class BasicInfo extends PureComponent {
  render() {
    const { caseNo, caseNoLoading, inquiryBusinessNo } = this.props;
    const list = [
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
        }),
        value: caseNo,
        loading: caseNoLoading,
      },
      {
        title: formatMessageApi({
          Label_COM_General: 'BusinessNo',
        }),
        value: inquiryBusinessNo,
        loading: caseNoLoading,
      },

    ];

    return <HeaderInfo list={list} />;
  }
}

export default BasicInfo;
