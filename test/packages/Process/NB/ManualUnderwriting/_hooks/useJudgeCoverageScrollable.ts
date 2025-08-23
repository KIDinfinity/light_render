import { useMemo } from 'react';
import useGetCoverageDataSource from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageDataSource';

export default () => {
  const coverageDataSoure = useGetCoverageDataSource();
  return useMemo(() => {
    return coverageDataSoure?.length !== 1;
  }, [coverageDataSoure]);
};
