import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';

export default () => {
  const list = useGetClientDetailList();
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });

  const idDeletedList = lodash
    .chain(list)
    .filter((item: any) => item?.deleted !== 1)
    .value();

  return useMemo(() => {
    return lodash.map(idDeletedList, (clientInfo) => {
      const clientName = (() => {
        return handleGetDefaultClientName({
          clientInfo,
        });
      })();
      return {
        dictCode: clientInfo?.id,
        dictName: clientName,
      };
    });
  }, [list, handleGetDefaultClientName, idDeletedList]);
};
