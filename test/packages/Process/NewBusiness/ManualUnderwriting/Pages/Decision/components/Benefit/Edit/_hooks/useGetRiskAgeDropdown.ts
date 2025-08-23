import lodash from 'lodash';

import { useMemo } from 'react';
import useGetCurrentPlanProductDuration from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetCurrentPlanProductDuration';
import PolicyTermDisplayType from 'process/NewBusiness/ManualUnderwriting/_enum/PolicyTermDisplayType';
import PolicyTermType from 'process/NewBusiness/ManualUnderwriting/_enum/PolicyTermType';

export default ({ coverageItem }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({
    coverageItem,
  });
  return useMemo(() => {
    if (
      lodash.some(
        currentPlanProductDuration,
        (item: any) => item?.policyTermDisplayType === PolicyTermDisplayType.Dropdown
      )
    ) {
      if (
        lodash.some(currentPlanProductDuration, (item: any) => {
          return item?.policyTermType === PolicyTermType.Age;
        })
      ) {
        const key = 'policyTerm';
        return lodash
          .chain(currentPlanProductDuration)
          .map((item: any) => {
            return {
              dictCode: lodash.get(item, key),
              dictName: lodash.get(item, key),
            };
          })
          .unionBy('dictCode')
          .orderBy(['dictCode'], ['asc'])
          .filter((item: any) => !!item.dictCode)
          .value();
      }
    }
    return [];
  }, [currentPlanProductDuration]);
};
