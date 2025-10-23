import React from 'react';
import lodash from 'lodash';
import { showCard } from '../Utils';
import ClientItem from './ClientItem';

const MatchClients = ({ clientList, columnList, policy }: any) => {
  return (
    <>
      {lodash
        .chain(clientList)
        .filter((item: any) => showCard(item, clientList))
        .map((item: any) => (
          <ClientItem
            key={item?.id}
            item={item}
            clientList={clientList}
            policy={policy}
            columnList={columnList}
          />
        ))
        .value()}
    </>
  );
};

export default MatchClients;
