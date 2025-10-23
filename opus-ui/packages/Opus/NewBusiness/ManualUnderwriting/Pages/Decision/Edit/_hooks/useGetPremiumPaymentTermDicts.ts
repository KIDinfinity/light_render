import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetCurrentPlanProductDuration';
import PremiumTermDisplayType from 'opus/NewBusiness/ManualUnderwriting/_enum/PremiumTermDisplayType';
import PremiumTermType from 'opus/NewBusiness/ManualUnderwriting/_enum/PremiumTermType';

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
          (item: any) => item?.premiumTermType === PremiumTermType.Year
        )
      ) {
        return lodash
          .chain(currentPlanProductDuration)
          .map((item: any) => {
            const key = 'premiumTerm';
            return {
              dictCode: lodash.get(item, key),
              dictName: lodash.get(item, key),
            };
          })
          .unionBy('dictCode')
          .orderBy(['dictCode'], ['asc'])
          .filter((item: any) => {
            return !!item?.dictCode && !!item?.dictName;
          })
          .value();
      }
    }
    return [];
  }, [currentPlanProductDuration]);
};
