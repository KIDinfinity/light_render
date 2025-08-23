import React from 'react';
import { useSelector } from 'dva';
import MatchClients from '../MatchClients/index';
import SuspectClients from 'process/NB/CustomerIdentification/SuspectClients/index';
import useGetSuspectClient from 'process/NB/CustomerIdentification/_hooks/useGetSuspectClient';
import useGetMismatchClient from 'process/NB/CustomerIdentification/_hooks/useGetMismatchClient';
import useGetFullyClient from 'process/NB/CustomerIdentification/_hooks/useGetFullyClient';
import { NAMESPACE } from '../activity.config';

const Policy = ({ policy }: any) => {
  const columnList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.columnList
  );
  // rolList中如果display都为false 不显示该client
  // const newClaimProcessData=lodash.filter(policy.clientInfoList,(item:any)=>lodash.some(item?.roleList,(subItem:any)=>subItem.display));
  const suspectClients = useGetSuspectClient({
    policy,
  });
  const misMatchClients = useGetMismatchClient({ policy });
  const FullyMatchClients = useGetFullyClient({ policy });
  const matchClients = [...misMatchClients, ...FullyMatchClients];
  return (
    <>
      <SuspectClients policy={policy} clientList={suspectClients} columnList={columnList} />
      <MatchClients clientList={matchClients} columnList={columnList} policy={policy} />
    </>
  );
};

export default Policy;
