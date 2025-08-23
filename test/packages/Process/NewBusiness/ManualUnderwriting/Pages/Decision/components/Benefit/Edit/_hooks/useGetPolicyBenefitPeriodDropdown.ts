import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'decision/_hooks/useGetCurrentPlanProductDuration';
import PolicyTermDisplayType from 'process/NewBusiness/ManualUnderwriting/_enum/PolicyTermDisplayType.ts';
import PolicyTermType from 'process/NewBusiness/ManualUnderwriting/_enum/PolicyTermType.ts';

export default ({ coverageItem }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({ coverageItem });
  return useMemo(() => {
    if (
      lodash.some(
        currentPlanProductDuration,
        (item: any) => item.policyTermDisplayType === PolicyTermDisplayType.Dropdown
      )
    ) {
      if (
        lodash.some(
          currentPlanProductDuration,
          (item: any) => item?.policyTermType === PolicyTermType.Year
        )
      ) {
        return lodash
          .chain(currentPlanProductDuration)
          .map((item: any) => {
            return {
              dictCode: item?.policyTerm,
              dictName: item?.policyTerm,
            };
          })
          .filter((item: any) => {
            return !!item?.dictCode && !!item?.dictName;
          })
          .value();
      }
    }
    return [];
  }, [currentPlanProductDuration]);
};
