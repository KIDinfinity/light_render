import { useMemo } from 'react';
import { ProductType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import useGetMainCoverage from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetMainCoverage';

export default ({ type }: any) => {
  const mainCoverage = useGetMainCoverage(type);

  return useMemo(() => {
    return mainCoverage?.productType === ProductType.TL;
  }, [mainCoverage]);
};
