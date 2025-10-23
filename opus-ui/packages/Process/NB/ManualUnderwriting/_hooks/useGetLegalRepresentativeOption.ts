import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';

export default () => {
  const clientList = useGetClientInfoList();
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });

  return useMemo(
    () =>
      lodash
        .chain(clientList)
        .filter((client: any) =>
          client?.roleList?.some(
            (role: any) => role.customerRole === CustomerRole.LegalRepresentative
          )
        )
        .map((client: any) => {
          const clientName = (() => {
            return handleGetDefaultClientName({
              clientInfo: client,
            });
          })();
          return { dictName: clientName, dictCode: client.id };
        })
        .value(),
    [clientList, handleGetDefaultClientName]
  );
};
