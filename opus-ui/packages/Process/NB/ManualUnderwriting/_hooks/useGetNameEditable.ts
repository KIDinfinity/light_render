import { useMemo } from 'react';
import useGetCoverageAllInsureds from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageAllInsureds';

export default () => {
  const insureds = useGetCoverageAllInsureds();
  return useMemo(() => {
    if (insureds?.length === 1) {
      return true;
    }
    return false;
  }, [insureds]);
};
