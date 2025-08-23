import { useMemo } from 'react';
import useGetCoverageAllInsureds from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetCoverageAllInsureds.ts';

export default () => {
  const insureds = useGetCoverageAllInsureds();
  return useMemo(() => {
    if (insureds?.length === 1) {
      return true;
    }
    return false;
  }, [insureds]);
};
