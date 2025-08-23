import { useMemo } from 'react';
import { ProductType } from 'packages/Process/NewBusiness/ManualUnderwriting/_enum';
import useGetMainCoverage from 'packages/Process/NewBusiness/ManualUnderwriting/_hooks/useGetMainCoverage';

export default ({ type }: any) => {
  const mainCoverage = useGetMainCoverage(type);

  return useMemo(() => {
    return mainCoverage?.productType === ProductType.TL;
  }, [mainCoverage]);
};
