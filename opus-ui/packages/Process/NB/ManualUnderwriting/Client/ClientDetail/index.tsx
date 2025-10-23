import React from 'react';
import ClientDetailList from './ClientDetailList';

const ClientDetail = ({ mode, isDisplayc360, expendStatus, setExpendStatus }: any) => {
  return (
    <ClientDetailList
      mode={mode}
      isDisplayc360={isDisplayc360}
      expendStatus={expendStatus}
      setExpendStatus={setExpendStatus}
    />
  );
};

ClientDetail.displayName = 'ClientDetail';

export default ClientDetail;
