import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'decision/_hooks/useGetCurrentPlanProductDuration';
import PremiumTermType from 'process/NewBusiness/ManualUnderwriting/_enum/PremiumTermType';

export default ({ coverageItem }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({
    coverageItem,
  });
  return useMemo(() => {
    if (
      lodash.some(
        currentPlanProductDuration,
        (item: any) => item.premiumTermType === PremiumTermType.Year
      )
    ) {
      return true;
    }
    return false;
  }, [currentPlanProductDuration]);
};
