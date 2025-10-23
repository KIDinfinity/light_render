import React from 'react';
import lodash from 'lodash';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import Edit from './Edit';
import Show from './Show';
import ClientProvider from 'process/NB/ManualUnderwriting/Client/ClientProvider';

const IdentitySider = ({ item, mode, isSubCard }: any) => {
  return (
    <>
      {mode === Mode.Edit && <Edit item={item} mode={mode} isSubCard={isSubCard} />}
      {mode === Mode.Show && <Show item={item} mode={mode} isSubCard={isSubCard} />}
    </>
  );
};

export default (props: any) => {
  const clientId = lodash.get(props, 'item.id');
  return (
    <ClientProvider clientId={clientId}>
      <IdentitySider {...props} />
    </ClientProvider>
  );
};
