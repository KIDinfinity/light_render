import { useCallback } from 'react';
import { useHandleGetDefaultClientFullName } from './';

export default () => {
  const handleGetDefaultClientName = useHandleGetDefaultClientFullName({
    isDefault: true,
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
