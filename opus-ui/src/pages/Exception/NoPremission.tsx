import React from 'react';
import { Link, history } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Exception from '@/components/Exception';

const NoPremission = () => {
  const redirectHander = () => {
    if (history.length === 1) {
      history.push('/');
    } else {
      history.back();
    }
  };
  return (
    <Exception
      type="403"
      desc={formatMessageApi({ Label_COM_WarningMessage: 'MSG_000733' })}
      linkElement={Link}
      backText={formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.back' })}
      redirectHander={redirectHander}
    />
  );
};

export default NoPremission;
