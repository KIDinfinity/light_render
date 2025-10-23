import { useMemo } from 'react';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';

export default ({ clientInfo }: any) => {
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  return useMemo(() => {
    const clientName = (() => {
      return handleGetDefaultClientName({
        clientInfo,
      });
    })();
    return clientName;
  }, [clientInfo, handleGetDefaultClientName]);
};
