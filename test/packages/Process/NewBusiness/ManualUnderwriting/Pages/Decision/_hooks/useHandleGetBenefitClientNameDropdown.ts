import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList.ts';
import useGetClientNameByConfigCallback from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetClientNameByConfigCallback.ts';

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
      const clientName = handleGetDefaultClientName({ clientInfo });
      return {
        dictCode: clientInfo?.id,
        dictName: clientName,
      };
    });
  }, [list, handleGetDefaultClientName, idDeletedList]);
};
