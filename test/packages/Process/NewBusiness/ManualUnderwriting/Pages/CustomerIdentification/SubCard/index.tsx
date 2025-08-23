import React from 'react';
import { useGetAuthorisedSignatoryClientInfo } from '../_hooks';
import SubRequestClientsDetail from './SubRequestClientsDetail';
import SubMatchClients from './SubMatchClients';
import ExistingAuthorisedSignatory from './ExistingAuthorisedSignatory';

export default ({ columnList, policy }: any) => {
  const authorisedSignatoryClientInfo = useGetAuthorisedSignatoryClientInfo({ policy });
  const subRequestClientsDetailDate = authorisedSignatoryClientInfo({
    isRequestClientsDetail: true,
  });
  const subMatchClientsDate = authorisedSignatoryClientInfo({ isRequestClientsDetail: false });

  return (
    <>
      {subRequestClientsDetailDate && (
        <SubRequestClientsDetail
          item={subRequestClientsDetailDate}
          policy={policy}
          columnList={columnList}
        />
      )}
      {subMatchClientsDate && (
        <SubMatchClients item={subMatchClientsDate} columnList={columnList} />
      )}
      <ExistingAuthorisedSignatory
        policy={policy}
        columnList={columnList}
        ASClientDate={subRequestClientsDetailDate || subMatchClientsDate}
      />
    </>
  );
};
