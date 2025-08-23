import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetClientNameByConfigCallback from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';
import useGetCoverageInsuredClientIds from 'decision/components/Benefit/_hooks/useGetCoverageInsuredClientIds';

export default () => {
  const list = useGetClientDetailList();
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  const insureds = useGetCoverageInsuredClientIds();

  return useMemo(() => {
    return lodash
      .chain(list)
      .filter((item) => {
        return insureds.includes(item?.id);
      })
      .map((clientInfo: any) => {
        const clientName = (() => {
          return handleGetDefaultClientName({
            clientInfo,
          });
        })();
        return {
          dictCode: clientInfo?.id,
          dictName: clientName,
        };
      })
      .value();
  }, [list, insureds, handleGetDefaultClientName]);
};
