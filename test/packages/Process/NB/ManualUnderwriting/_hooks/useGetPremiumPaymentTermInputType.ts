import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration';
import PremiumTermDisplayType from 'process/NB/ManualUnderwriting/Enum/PremiumTermDisplayType';
import PremiumTermType from 'process/NB/ManualUnderwriting/Enum/PremiumTermType';
import FieldType from 'enum/FieldType';

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
        return FieldType.Dropdown;
      }
    }
    return FieldType.Text;
  }, [currentPlanProductDuration]);
};
