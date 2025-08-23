import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration';
import PolicyTermType from 'process/NB/ManualUnderwriting/Enum/PolicyTermType';

export default ({ coverageItem }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({ coverageItem });

  return useMemo(() => {
    if (
      lodash.some(
        currentPlanProductDuration,
        (item: any) => item.policyTermType === PolicyTermType.Age
      )
    ) {
      return true;
    }
    return false;
  }, [currentPlanProductDuration]);
};
