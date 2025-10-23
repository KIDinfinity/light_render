import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration';
import PremiumTermType from 'process/NB/ManualUnderwriting/Enum/PremiumTermType';
import FieldType from 'enum/FieldType';
import PremiumTermDisplayType from 'process/NB/ManualUnderwriting/Enum/PremiumTermDisplayType';

export default ({ coverageItem, defaultFieldType }: any) => {
  const currentPlanProductDuration = useGetCurrentPlanProductDuration({ coverageItem });
  return useMemo(() => {
    if (
      lodash.some(
        currentPlanProductDuration,
        (item: any) => item.premiumTermDisplayType === PremiumTermDisplayType.Dropdown
      )
    ) {
      if (
        lodash.some(currentPlanProductDuration, (item: any) => {
          return item.premiumTermType === PremiumTermType.Age;
        })
      ) {
        return FieldType.Dropdown;
      }
    }
    if (
      lodash.every(
        currentPlanProductDuration,
        (item: any) => item?.premiumTermDisplayType === PremiumTermDisplayType.Text
      )
    ) {
      return FieldType.Text;
    }

    return defaultFieldType;
  }, [currentPlanProductDuration, defaultFieldType]);
};
