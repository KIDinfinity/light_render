import { useCallback } from 'react';
import useHandleGetDefaultClientFullName from 'process/NB/CustomerIdentification/_hooks/useHandleGetDefaultClientFullName';

export default (isDefault = true) => {
  const handleGetDefaultClientName = useHandleGetDefaultClientFullName({
    isDefault,
  });
  return useCallback(
    ({ clientInfo }: any) => {
      const clientName = (() => {
        return handleGetDefaultClientName({
          clientInfo,
        });
      })();
      return clientName;
    },
    [handleGetDefaultClientName]
  );
};
