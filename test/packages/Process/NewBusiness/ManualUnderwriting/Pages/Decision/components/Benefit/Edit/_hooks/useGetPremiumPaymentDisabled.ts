import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'decision/_hooks/useGetCurrentPlanProductDuration.ts';
import PremiumTermDisplayType from 'process/NewBusiness/ManualUnderwriting/_enum/PremiumTermDisplayType';
import PremiumTermType from 'process/NewBusiness/ManualUnderwriting/_enum/PremiumTermType';

export default ({ coverageItem }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({
    coverageItem,
  });
  return useMemo(() => {
    if (
      lodash.some(
        currentPlanProductDuration,
        (item: any) => item?.premiumTermDisplayType === PremiumTermDisplayType.Dropdown
      )
    ) {
      if (
        lodash.some(
          currentPlanProductDuration,
          (item: any) => item?.premiumTermType === PremiumTermType.Age
        )
      ) {
        return true;
      }
    }
    return false;
  }, [currentPlanProductDuration]);
};
