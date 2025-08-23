import React from 'react';
import lodash from 'lodash';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import Edit from './Edit';
import Show from './Show';
import ClientProvider from 'process/NB/ManualUnderwriting/Client/ClientProvider';

const Client = ({ mode, id, expand, item, isSubCard }: any) => {
  return (
    <>
      {mode === Mode.Show && <Show id={id} expand={expand} item={item} isSubCard={isSubCard} />}
      {mode === Mode.Edit && <Edit id={id} item={item} isSubCard={isSubCard} />}
    </>
  );
};

export default (props: any) => {
  const clientId = lodash.get(props, 'id');
  return (
    <ClientProvider clientId={clientId}>
      <Client {...props} />
    </ClientProvider>
  );
};
