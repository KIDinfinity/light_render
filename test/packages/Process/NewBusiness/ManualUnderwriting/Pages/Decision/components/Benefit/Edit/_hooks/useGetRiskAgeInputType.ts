import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentPlanProductDuration from 'decision/_hooks/useGetCurrentPlanProductDuration';
import FieldType from 'enum/FieldType';
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
        lodash.some(currentPlanProductDuration, (item: any) => {
          return item.policyTermType === PolicyTermType.Age;
        })
      ) {
        return FieldType.Dropdown;
      }
    }
    if (
      lodash.every(
        currentPlanProductDuration,
        (item: any) => item?.policyTermDisplayType === PolicyTermDisplayType.Text
      )
    ) {
      return FieldType.Text;
    }

    return FieldType.Text;
  }, [currentPlanProductDuration]);
};
