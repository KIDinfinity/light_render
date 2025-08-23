import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration';
import PremiumTermType from 'process/NB/ManualUnderwriting/Enum/PremiumTermType';
import PremiumTermDisplayType from 'process/NB/ManualUnderwriting/Enum/PremiumTermDisplayType';

export default ({ coverageItem }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({
    coverageItem,
  });
  return useMemo(() => {
    if (
      lodash.some(
        currentPlanProductDuration,
        (item: any) => item.premiumTermDisplayType === PremiumTermDisplayType.Dropdown
      )
    ) {
      if (
        lodash.some(
          currentPlanProductDuration,
          (item: any) => item.premiumTermType === PremiumTermType.Age
        )
      ) {
        return lodash
          .chain(currentPlanProductDuration)
          .map((item: any) => {
            return {
              dictCode: lodash.get(item, 'premiumTerm'),
              dictName: lodash.get(item, 'premiumTerm'),
            };
          })
          .filter((item: any) => !!item.dictCode)
          .value();
      }
    }
    return [];
  }, [currentPlanProductDuration]);
};
