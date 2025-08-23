import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'decision/_hooks/useGetCurrentPlanProductDuration';
import PolicyTermType from 'process/NewBusiness/ManualUnderwriting/_enum/PolicyTermType';
import FieldType from 'enum/FieldType';
import PolicyTermDisplayType from 'process/NewBusiness/ManualUnderwriting/_enum/PolicyTermDisplayType';

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
        return FieldType.Dropdown;
      }
    }
    return FieldType.Text;
  }, [currentPlanProductDuration]);
};
