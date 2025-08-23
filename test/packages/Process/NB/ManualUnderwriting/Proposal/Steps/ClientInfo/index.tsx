import React from 'react';
import Client from 'process/NB/ManualUnderwriting/Client';

const ClientInfo: React.FC = () => {
  return (
    <>
      <Client mode="edit" />
    </>
  );
};

ClientInfo.displayName = 'ClientInfo';

export default ClientInfo;
