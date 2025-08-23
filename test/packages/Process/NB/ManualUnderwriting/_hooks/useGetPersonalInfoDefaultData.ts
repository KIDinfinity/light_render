import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';

export default ({ data, clientInfo }: any) => {
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: false,
  });
  return useMemo(() => {
    const clientName = (() => {
      return handleGetDefaultClientName({
        clientInfo,
      });
    })();
    const index = lodash.findIndex(
      data,
      (item: any) => item?.key === 'name' || item?.key === 'customerEnName'
    );
    lodash.set(data, `[${index}].value`, clientName);
    return data;
  }, [data, clientInfo]);
};
