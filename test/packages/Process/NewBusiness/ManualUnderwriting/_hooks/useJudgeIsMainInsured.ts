import useGetMainCoverage from 'packages/Process/NewBusiness/ManualUnderwriting/_hooks/useGetMainCoverage';
import { useMemo } from 'react';

export default ({ type, clientId }: any) => {
  const mainCoverage = useGetMainCoverage(type);

  return useMemo(() => {
    const { coverageInsuredList = [] } = mainCoverage;

    return coverageInsuredList.some((item: any) => item.clientId === clientId);
  }, [clientId, mainCoverage]);
};
