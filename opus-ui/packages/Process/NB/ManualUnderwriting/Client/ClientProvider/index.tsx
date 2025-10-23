import React from 'react';
import Context from './Context';
const { Provider } = Context;
import useGetRolesById from 'process/NB/ManualUnderwriting/_hooks/useGetRolesById';

export default ({ clientId, children }: any) => {
  const roles = useGetRolesById({ id: clientId });
  return <Provider value={{ roles, clientId }}>{children}</Provider>;
};
