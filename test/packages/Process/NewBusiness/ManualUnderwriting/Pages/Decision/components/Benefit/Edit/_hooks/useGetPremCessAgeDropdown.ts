import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'decision/_hooks/useGetCurrentPlanProductDuration';
import PremiumTermType from 'process/NewBusiness/ManualUnderwriting/_enum/PremiumTermType';
import PremiumTermDisplayType from 'process/NewBusiness/ManualUnderwriting/_enum/PremiumTermDisplayType';

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
