import React, { useMemo } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CaseHeader from 'basic/components/CaseHeader';
import HeaderDefault from 'basic/components/CaseHeader/HeaderDefault';
import useGetHeaderInfo from 'process/NewBusiness/EWS/_hooks/useGetHeaderInfo';

const Header = () => {
  const title = formatMessageApi({
    Label_COM_General: 'EWorksheet',
  });
  const info = useGetHeaderInfo();
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
