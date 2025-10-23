import { useContext } from 'react';
import Context from 'process/NB/ManualUnderwriting/Client/ClientProvider/Context';

export default () => {
  const { roles }: any = useContext(Context);

  return roles || [];
};
