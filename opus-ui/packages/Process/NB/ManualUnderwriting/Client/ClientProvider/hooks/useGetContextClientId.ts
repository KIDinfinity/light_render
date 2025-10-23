import { useContext } from 'react';
import Context from 'process/NB/ManualUnderwriting/Client/ClientProvider/Context';

export default () => {
  const { clientId }: any = useContext(Context);

  return clientId || '';
};
