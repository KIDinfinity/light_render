import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'decision/_hooks/useGetCurrentPlanProductDuration';
import PolicyTermType from 'process/NewBusiness/ManualUnderwriting/_enum/PolicyTermType.ts';

export default ({ coverageItem }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({ coverageItem });
  return useMemo(() => {
    if (
      lodash.some(currentPlanProductDuration, (item: any) => {
        return item.policyTermType === PolicyTermType.Year;
      })
    ) {
      return true;
    }

    return false;
  }, [currentPlanProductDuration]);
};
