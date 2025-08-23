import React from 'react';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Date = ({ effectiveDate, expiryDate }: any) => {
  return (
    <>
      <div>
        <span style={{ color: '#d9d9d9' }}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.effective-date',
          })}{' '}
          {formatMessageApi({
            Label_BIZ_Claim: 'form.from',
          })}
        </span>{' '}
        <span>{moment(effectiveDate).format('DD/MM/YYYY')}</span>{' '}
        <span style={{ color: '#d9d9d9' }}>
          {formatMessageApi({
            Label_BIZ_Claim: 'form.to',
          })}
        </span>{' '}
        <span>{moment(expiryDate).format('DD/MM/YYYY')}</span>
      </div>
    </>
  );
};

export default Date;
