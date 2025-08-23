import React from 'react';
import Context from './Context';
const Provider = Context.Provider;
import useGetSelectedEwsOriginData from 'process/NewBusiness/EWS/_hooks/useGetSelectedEwsOriginData';

export default ({ children }: any) => {
  const data = useGetSelectedEwsOriginData();

  return (
    <Provider
      value={{
        businessData: data,
        ewsContext: true,
      }}
    >
      {children}
    </Provider>
  );
};
