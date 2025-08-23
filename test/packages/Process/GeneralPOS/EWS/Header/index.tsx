import React, { useMemo } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CaseHeader from 'basic/components/CaseHeader';
import HeaderDefault from 'basic/components/CaseHeader/HeaderDefault';
import { NAMESPACE } from '../../Decision/activity.config';
import { useSelector } from 'dva';

import lodash from 'lodash';
const Header = () => {
  const caseDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.caseDetail
  );

  const title = formatMessageApi({
    Label_COM_General: 'EWorksheet',
  });

  const info = lodash
    .chain(caseDetail)
    .pick([
      'processInstanceId',
      'caseCategory',
      'inquiryBusinessNo',
      'submissionDate',
      'submissionChannel',
    ])
    .value();

  const defaultHeader = useMemo(() => {
    return <HeaderDefault {...info} />;
  }, [info]);

  return (
    <>
      <CaseHeader title={title} defaultHeader={defaultHeader} />
    </>
  );
};

Header.displayName = 'header';

export default Header;
