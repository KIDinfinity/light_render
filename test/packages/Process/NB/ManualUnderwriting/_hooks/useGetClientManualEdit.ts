import { useMemo } from 'react';
import useGetClientDetailById from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailById';

export default ({ clientId }: any) => {
  const clientInfo = useGetClientDetailById({
    clientId,
  });

  return useMemo(() => {
    return clientInfo?.isManuallyAdded;
  }, [clientInfo]);
};
