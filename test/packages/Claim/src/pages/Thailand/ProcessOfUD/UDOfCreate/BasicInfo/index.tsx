import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { PureComponent } from 'react';
import HeaderInfo from 'claim/components/HeaderInfo';

interface IProps {
  caseNo?: string;
  parentClaimNo?: string;
  claimNo?: string;
}

class BasicInfo extends PureComponent<IProps> {
  render() {
    const { caseNo } = this.props;

    const list = [
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
        }),
        value: caseNo,
      },
    ];

    return <HeaderInfo list={list} />;
  }
}

export default BasicInfo;
