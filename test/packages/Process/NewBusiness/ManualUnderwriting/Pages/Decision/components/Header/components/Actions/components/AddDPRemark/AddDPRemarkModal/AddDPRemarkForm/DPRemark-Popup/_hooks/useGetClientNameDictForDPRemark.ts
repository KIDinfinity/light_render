import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList.ts';
import useGetClientNameByConfigCallback from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetClientNameByConfigCallback';
import useGetCoverageInsuredClientIds from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetCoverageInsuredClientIds';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';

export default () => {
  const list = useGetClientDetailList();
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  const insureds = useGetCoverageInsuredClientIds([
    BenefitLevelDecision.Decline,
    BenefitLevelDecision.Postpone,
  ]);

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
