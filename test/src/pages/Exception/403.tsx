import React from 'react';
import { Link } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Exception from '@/components/Exception';

const Exception403 = () => (
  <Exception
    type="403"
    desc={formatMessageApi({ Label_COM_WarningMessage: 'app.exception.description.403' })}
    linkElement={Link}
    backText={formatMessageApi({ Label_BIZ_Claim: 'app.exception.back' })}
  />
);

export default Exception403;
